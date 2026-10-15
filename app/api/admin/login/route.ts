import {env} from 'cloudflare:workers';
import {checkPassword,COOKIE,digest,hex} from '../../../../lib/admin-auth';
export async function POST(req:Request){
 const reply=(error:string,status:number)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply('Invalid request.',403);
 try{
 const b=await req.json() as {email?:string;password?:string};
 if(typeof b.email!=='string'||typeof b.password!=='string'||b.email.length>200||b.password.length>256)return reply('Enter your email and password.',400);
 const db=env.DB!,now=Date.now(),bucket=Math.floor(now/900000),ip=req.headers.get('cf-connecting-ip')||'unknown';
 const id=await digest(ip+':'+bucket);
 const counter=await db.prepare('INSERT INTO login_attempts(id,count,expires) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1 RETURNING count').bind(id,now+900000).first<{count:number}>();
 if(!counter||counter.count>10)return reply('Too many login attempts. Try again in 15 minutes.',429);
 const passwordValid=await checkPassword(b.password);
 if(!passwordValid||!env.ADMIN_EMAIL||b.email.trim().toLowerCase()!==env.ADMIN_EMAIL.toLowerCase())return reply('Incorrect email or password.',401);
 const token=hex(crypto.getRandomValues(new Uint8Array(32)).buffer);
 await db.batch([db.prepare('INSERT INTO admin_sessions(token_hash,email,expires) VALUES(?,?,?)').bind(await digest(token),env.ADMIN_EMAIL.toLowerCase(),now+28800000),db.prepare('DELETE FROM admin_sessions WHERE expires<?').bind(now),db.prepare('DELETE FROM login_attempts WHERE expires<?').bind(now)]);
 return Response.json({ok:true},{headers:{'Cache-Control':'no-store','Set-Cookie':`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`}});
 }catch{return reply('Unable to sign in. Please try again.',500)}
}

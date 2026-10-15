import { env } from 'cloudflare:workers';
import { cookies } from 'next/headers';
export const COOKIE='alex_admin_session';
export async function digest(value:string){return hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))}
export function hex(a:ArrayBuffer){return Array.from(new Uint8Array(a)).map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function checkPassword(password:string){
 if(!env.ADMIN_PASSWORD_HASH||!env.ADMIN_PASSWORD_SALT)return false;
 const salt=Uint8Array.from(env.ADMIN_PASSWORD_SALT.match(/.{2}/g)!,x=>parseInt(x,16));
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
 const result=hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},key,256));
 let diff=result.length^env.ADMIN_PASSWORD_HASH.length;for(let i=0;i<result.length;i++)diff|=result.charCodeAt(i)^env.ADMIN_PASSWORD_HASH.charCodeAt(i);return diff===0;
}
export async function isAdmin(){
 const token=(await cookies()).get(COOKIE)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token)||!env.DB)return false;
 const session=await env.DB.prepare('SELECT email,expires FROM admin_sessions WHERE token_hash=?').bind(await digest(token)).first<{email:string;expires:number}>();
 return !!session&&session.expires>Date.now()&&session.email===env.ADMIN_EMAIL?.toLowerCase();
}

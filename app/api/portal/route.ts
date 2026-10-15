import { env } from 'cloudflare:workers';
import { isAdmin } from '../../../lib/admin-auth';
import { initial,validateConfig,Config } from '../../../lib/model';
const reply=(v:unknown,status=200)=>Response.json(v,{status,headers:{'Cache-Control':'no-store'}});
async function context(){const admin=await isAdmin();const db=env.DB!;
// Legacy history and gift configuration remain available; all new distributions use allocations.
await db.prepare("INSERT OR IGNORE INTO settings (id,value,version) VALUES ('config',?,1)").bind(JSON.stringify(initial)).run();
const row=await db.prepare("SELECT value,version FROM settings WHERE id='config'").first<{value:string;version:number}>();return {db,isAdmin:admin,config:JSON.parse(row!.value) as Config,version:row!.version};}
export async function GET(){try{const c=await context();let records=[];if(c.isAdmin){const rows=await c.db.prepare('SELECT payload FROM deliveries ORDER BY created DESC').all<{payload:string}>();records=rows.results.map(r=>JSON.parse(r.payload));}return reply({config:c.config,version:c.version,isAdmin:c.isAdmin,records});}catch{return reply({error:'Could not load the portal. Please retry.'},500);}}
export async function POST(req:Request){try{const c=await context();if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'Invalid origin.'},403);const b=await req.json() as {action:string;config:Config;version:number;id:string;categoryId:string;salesperson:string;recipient:string;business:string;city:string;address:string;phone:string};if(!b||typeof b!=='object')return reply({error:'Invalid request.'},400);if(b.action==='config'){if(!c.isAdmin)return reply({error:'Admin access required.'},403);if(!validateConfig(b.config))return reply({error:'Check gift names and assignments. Use up to 5 unique gift categories.'},400);const r=await c.db.prepare("UPDATE settings SET value=?,version=version+1 WHERE id='config' AND version=?").bind(JSON.stringify(b.config),b.version).run();if(!r.meta.changes)return reply({error:'Settings changed in another session. Refresh and try again.'},409);return reply({ok:true,version:c.version+1});}
return reply({error:'Please sign in to your user account and distribute gifts against an allocation.'},410);
}catch{return reply({error:'Could not save. Please retry; duplicate deliveries are prevented.'},500);}}

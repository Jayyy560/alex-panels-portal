import {env} from 'cloudflare:workers';
const bytes=(s:string)=>Uint8Array.from(s.match(/.{2}/g)||[],x=>parseInt(x,16));
const hex=(a:Uint8Array)=>Array.from(a).map(x=>x.toString(16).padStart(2,'0')).join('');
async function key(){if(!env.CREDENTIAL_EXPORT_KEY||!/^[a-f0-9]{64}$/i.test(env.CREDENTIAL_EXPORT_KEY))throw Error('Credential export key is not configured');return crypto.subtle.importKey('raw',bytes(env.CREDENTIAL_EXPORT_KEY),'AES-GCM',false,['encrypt','decrypt'])}
export async function encryptCredential(password:string,userId:string){const iv=crypto.getRandomValues(new Uint8Array(12));const data=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:new TextEncoder().encode(userId)},await key(),new TextEncoder().encode(password));return hex(iv)+':'+hex(new Uint8Array(data))}
export async function decryptCredential(value:string,userId:string){const [iv,data]=value.split(':');return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(iv),additionalData:new TextEncoder().encode(userId)},await key(),bytes(data)))}

import Portal from '../../portal';import AdminLogin from '../login';import {isAdmin} from '../../../lib/admin-auth';
export const dynamic='force-dynamic';export default async function Page(){return await isAdmin()?<><div style={{padding:12,textAlign:'right',background:'#e9eddc'}}><a href="/admin">← Back to allocation dashboard</a></div><Portal admin/></>:<AdminLogin/>}

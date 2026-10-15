import Workspace from '../workspace';import AdminLogin from './login';import {isAdmin} from '../../lib/admin-auth';
export const dynamic='force-dynamic';export default async function Page(){return await isAdmin()?<Workspace admin/>:<AdminLogin/>}

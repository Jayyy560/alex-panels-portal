import Workspace from './workspace';import UserLogin from './user-login';import {getUser} from '../lib/user-auth';
export const dynamic='force-dynamic';export default async function Page(){return await getUser()?<Workspace/>:<UserLogin/>}

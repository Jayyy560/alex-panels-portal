import Workspace from './workspace';
import {getUser} from '../lib/user-auth';
import {isAdmin} from '../lib/admin-auth';
import {redirect} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  if (await isAdmin()) {
    redirect('/admin');
  }
  const user = await getUser();
  if (user) {
    return <Workspace />;
  }
  redirect('/login');
}

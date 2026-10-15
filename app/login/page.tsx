import UserLogin from '../user-login';
import {getUser} from '../../lib/user-auth';
import {isAdmin} from '../../lib/admin-auth';
import {redirect} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await isAdmin()) {
    redirect('/admin');
  }
  const user = await getUser();
  if (user) {
    redirect('/');
  }
  return <UserLogin />;
}

import UserLogin from '../user-login';
import {getUser} from '../../lib/user-auth';
import {redirect} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect('/');
  }
  return <UserLogin />;
}

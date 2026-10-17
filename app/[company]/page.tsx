import Workspace from '../workspace';import UserLogin from '../user-login';import {getUser} from '../../lib/user-auth';import {normalizeCompany} from '../../lib/company';import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function CompanyPortal({params}:{params:Promise<{company:string}>}){const {company:raw}=await params,company=normalizeCompany(raw);if(!company)notFound();return await getUser(company)?<Workspace company={company}/>:<UserLogin company={company}/>}

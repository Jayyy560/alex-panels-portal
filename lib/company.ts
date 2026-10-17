export const companies=['alex','yipl','bcl'] as const;
export type Company=typeof companies[number];
export const companyLabels:Record<Company,string>={alex:'Alex',yipl:'YIPL',bcl:'BCL'};
export function normalizeCompany(value:unknown):Company|null{return typeof value==='string'&&companies.includes(value.toLowerCase() as Company)?value.toLowerCase() as Company:null}
export function companyHome(company:Company){return `/${company}`}
export function companyCookie(company:Company){return `${company}_user_session`}
export function configKey(company:Company,id:'config'|'customer_categories'){return `${company}:${id}`}

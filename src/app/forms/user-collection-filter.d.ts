//interface to retrieve info from input when filtering datas on users list
export interface UserCollectionFilter {
    id:number|null,
    email: string;
    lastName: string;
    phone: string;
    siret: string;
    
}
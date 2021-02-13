// Interface to for filters on garages list.
export interface GarageCollectionFilter {
    id: number|null;
    name:string;
    postalCode: string;
    owner: string;

}
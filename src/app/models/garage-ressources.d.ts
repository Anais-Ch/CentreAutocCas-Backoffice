//object for GEt from garage ressource ( get garages individually)

export interface GarageResourceJsonld {
    '@context': string;
    '@id': string;
    '@type': string
    id:	number;
    name?: string; //  can be null or do not exist
    street?: string;//  can be null or do not exist
    streetComplement?: string;//  can be null or do not exist
    postalCode?: string;//  can be null or do not exist
    city?: string;//  can be null or do not exist
    owner: string;
    }
//Interface to GET garage lsit from API

import { GarageResourceJsonld } from "./garage-ressources";

export interface GarageCollectionJsonld{
    'hydra:member': Array<GarageResourceJsonld>;
    'hydra:totalItems': number;
    'hydra:view':{
        '@id': string;
        '@type': string;
        'hydra:first': string;
        'hydra:last': string;
        'hydra:next': string;
        'hydra:previous'?: string;
    };
}
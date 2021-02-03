//interface for ads collection

import { ListingRessourceJsonLd } from "./listing-ressource";



export interface ListingCollectionJsonld{
    'hydra:member': Array<ListingRessourceJsonLd>;
    'hydra:totalItems': number;
    'hydra:view': {
        '@id': string;
        '@type': string;
        'hydra:first': string
        'hydra:last': string;
        'hydra:next': string;
        'hydra:previous': string;
    };

}
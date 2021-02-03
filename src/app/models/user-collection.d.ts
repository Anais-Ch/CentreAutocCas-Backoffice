import { UserJsonld } from "./user-jsonld";

/*export interface Hydraview { // onpeut définir l'objet à part
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next': string;
}*/

export interface UserCollection {
    "hydra:member": Array<UserJsonld>; // tableau de l'objet UserJsonld
    "hydra:totalItems": number;
    "hydra:view": { // on définit directement l'interface mais cette interface n'est accessible que ici dans le cadre de cette interface uniquement
        '@id': string;
        '@type': string;
        'hydra:first': string;
        'hydra:last'?: string;
        'hydra:next'?: string;
        'hydra:previous'?: string;

    };
}
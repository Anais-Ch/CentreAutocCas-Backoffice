//interface poru API User
export interface UserJsonld {
    '@context':  string; // on utilise les '' pour pourvoir utiliser @ dans le nom
    '@id': string;
    '@type': string;
    id:  number;
    lastName: string;
    firstName: string;
    email: string;
    phone?: string; //le ? permet de dire que l'élement peut petre null voir inexistant dans l'objet
    siret?: string; //string/null/don't exist
    garages: Array<string>; //string/null/don't exist

}

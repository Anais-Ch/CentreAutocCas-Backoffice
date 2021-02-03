//interface ads ressource
export interface ListingRessourceJsonLd{
    '@context': string
    '@id': string;
    '@type': string;
    id: number;
    title: string;
    description: string;
    releaseYear: string;
    km: number;
    price: string;
    brand: string;
    model: string;
    fuel?: string;
    garage: string;
}
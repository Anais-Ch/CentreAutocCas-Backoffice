//interface for POST mlethode to ad ads

export interface Listing {
    title: string,
    description: string,
    releaseYear: string,
    km: number;
    price: string;
    brand: string;
    model: string;
    fuel?: string;
    garage: string;
}
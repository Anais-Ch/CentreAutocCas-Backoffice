//interface for POST methode to add gagrages

export interface Garage {
    
    name: string;
    street?: string;
    streetComplement?: string;
    postalCode?: string;
    city?: string;
    owner: string;
}
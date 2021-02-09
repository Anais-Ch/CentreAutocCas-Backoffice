//interface users for forms

export interface User {
    lastName: string;
    firstName: string;
    email: string;
    phone?: string;
    siret?: string;
    garages?: Array<string>;
  }
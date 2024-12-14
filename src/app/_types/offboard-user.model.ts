interface Address {
  streetLine: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface OffboardUser {
  address: Address;
  notes: string;
  phone: string;
  email: string;
  receiver: string;
}

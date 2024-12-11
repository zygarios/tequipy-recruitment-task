interface Address {
  streetLine1: string;
  country: string;
  postalCode: string;
  receiver: string;
}

export interface OffboardUser {
  address: Address;
  notes: string;
  phone: string;
  email: string;
}

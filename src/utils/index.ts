export type TUser = {
  name?: string,
  email?: string,
  phone?: string,
  address?: string,
  password?: string,
  cpassword?: string,
}

export interface TBike {
  _id?: string ;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
}

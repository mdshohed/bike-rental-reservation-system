export type TUser = {
  _id?: string,
  name?: string,
  email?: string,
  phone?: string,
  role?: string,
  address?: string,
  password?: string,
  cpassword?: string,
  isActive?: boolean
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

export interface TBike {
  _id?: string | undefined ;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
}

export interface TUpdateBike {
  _id?: string ;
  name?: string;
  description?: string;
  pricePerHour?: number;
  isAvailable?: boolean;
  cc?: number;
  year?: number;
  model?: string;
  brand?: string;
}

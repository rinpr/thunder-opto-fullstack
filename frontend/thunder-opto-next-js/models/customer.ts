// export type Customer = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     age: number;
//     sex: boolean;
// }

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  sex: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewCustomer {
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  sex: boolean;
}
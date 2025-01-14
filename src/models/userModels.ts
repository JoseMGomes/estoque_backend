export interface SignupInput {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  }


  export interface ProductData {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: string; 
  }
  
  
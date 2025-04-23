export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'prescription' | 'otc' | 'personal-care' | 'vitamins';
  inStock: boolean;
  requiresPrescription: boolean;
  dosage?: string;
  manufacturer?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'branch' | 'company';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  companyName?: string;
  companyId?: string;
}

export interface HealthInformation {
  allergies: string[];
  currentMedications: string[];
  conditions: string[];
  bloodType?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: 'active' | 'inactive';
  employeeCount: number;
  registrationDate: string;
  licenseNumber: string;
  type: 'manufacturer' | 'distributor' | 'pharmacy';
}
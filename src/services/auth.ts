import { User } from '../types';

// Predefined accounts
const ADMIN_ACCOUNT = {
  id: 'admin-1',
  email: 'admin@admin.com',
  password: 'admin',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin' as const,
  phone: '(555) 000-0000',
  address: {
    street: '123 Admin St',
    city: 'Admin City',
    state: 'AS',
    zipCode: '12345'
  }
};

const BRANCH_ACCOUNT = {
  id: 'branch-1',
  email: 'branch@branch.com',
  password: 'branch',
  firstName: 'Branch',
  lastName: 'Manager',
  role: 'branch' as const,
  phone: '(555) 111-1111',
  address: {
    street: '456 Branch St',
    city: 'Branch City',
    state: 'BS',
    zipCode: '67890'
  }
};

const COMPANY_ACCOUNT = {
  id: 'company-1',
  email: 'company@company.com',
  password: 'company',
  firstName: 'Company',
  lastName: 'Manager',
  role: 'company' as const,
  phone: '(555) 222-2222',
  companyName: 'MedTech Pharmaceuticals',
  companyId: 'med-tech-1',
  address: {
    street: '789 Company St',
    city: 'Company City',
    state: 'CS',
    zipCode: '13579'
  }
};

const CLIENT_ACCOUNT = {
  id: 'client-1',
  email: 'client@client.com',
  password: 'client',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user' as const,
  phone: '(555) 333-3333',
  address: {
    street: '321 Client St',
    city: 'Client City',
    state: 'CL',
    zipCode: '24680'
  }
};

export const authenticate = (email: string, password: string): User | null => {
  // Check admin account
  if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
    const { password: _, ...adminUser } = ADMIN_ACCOUNT;
    return adminUser;
  }

  // Check branch account
  if (email === BRANCH_ACCOUNT.email && password === BRANCH_ACCOUNT.password) {
    const { password: _, ...branchUser } = BRANCH_ACCOUNT;
    return branchUser;
  }

  // Check company account
  if (email === COMPANY_ACCOUNT.email && password === COMPANY_ACCOUNT.password) {
    const { password: _, ...companyUser } = COMPANY_ACCOUNT;
    return companyUser;
  }

  // Check client account
  if (email === CLIENT_ACCOUNT.email && password === CLIENT_ACCOUNT.password) {
    const { password: _, ...clientUser } = CLIENT_ACCOUNT;
    return clientUser;
  }

  return null;
};
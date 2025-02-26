export interface User {
  id: number;
  full_name: string;
  user_name: string;
  password: string;
  role: string;
}

export interface Ticket {
  id?: number;
  subject: string;
  description: string;
  status?: string;
  customer: number;
  executive: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "owner" | "manager" | "staff";
  phone?: string;
  company?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

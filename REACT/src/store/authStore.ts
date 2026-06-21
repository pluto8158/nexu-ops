import { create } from "zustand";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: { email: string; password: string; name: string; role: string }[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, role: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  users: [
    { email: "admin@nexus.com", password: "admin123", name: "张经理", role: "admin" },
    { email: "test@nexus.com", password: "test123", name: "测试用户", role: "analyst" },
  ],
  login: (email: string, password: string) => {
    const found = get().users.find((u) => u.email === email && u.password === password);
    if (found) {
      set({ isAuthenticated: true, user: { email: found.email, name: found.name, role: found.role } });
      return true;
    }
    return false;
  },
  register: (name: string, email: string, role: string, password: string) => {
    if (get().users.find((u) => u.email === email)) {
      return false;
    }
    set((state) => ({
      users: [...state.users, { email, password, name, role }],
      isAuthenticated: true,
      user: { email, name, role },
    }));
    return true;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));

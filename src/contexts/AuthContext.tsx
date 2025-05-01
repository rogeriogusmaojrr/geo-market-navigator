
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('geomarket_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('geomarket_user');
      }
    }
    setIsLoading(false);
  }, []);

  // In a real app, this would make API calls to your backend
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we're mocking successful authentication
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        };
        setUser(user);
        localStorage.setItem('geomarket_user', JSON.stringify(user));
        toast.success('Successfully logged in');
        navigate('/dashboard');
      } else if (email === 'client@example.com' && password === 'password') {
        const user: User = {
          id: '2',
          email: 'client@example.com',
          name: 'Client User',
          role: 'client',
        };
        setUser(user);
        localStorage.setItem('geomarket_user', JSON.stringify(user));
        toast.success('Successfully logged in');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we're mocking successful registration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        role: 'client',
      };
      
      setUser(user);
      localStorage.setItem('geomarket_user', JSON.stringify(user));
      toast.success('Successfully registered');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('geomarket_user');
    toast.success('Successfully logged out');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

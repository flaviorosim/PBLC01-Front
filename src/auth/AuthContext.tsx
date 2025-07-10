import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  name: string;
  iat: number;
  exp: number;
}

interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({ id: decodedToken.id, name: decodedToken.name });
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
          setTokenState(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setTokenState(null);
        setUser(null);
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

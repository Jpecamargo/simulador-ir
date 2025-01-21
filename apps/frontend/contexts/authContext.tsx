import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: VoidFunction;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { "simuladorIR.token": token } = parseCookies();
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });

      const { access_token } = response.data; 

      setCookie(undefined, "simuladorIR.token", access_token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha na autenticação");
    }
  };

  const logout = () => {
    destroyCookie(undefined, "simuladorIR.token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

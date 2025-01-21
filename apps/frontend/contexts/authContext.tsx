import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";
import { useRouter } from "next/router";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: VoidFunction;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { "simuladorIR.token": token } = parseCookies();
    setIsAuthenticated(!!token);
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      await api.post("/auth/sign-up", { name, email, password });
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
      throw new Error("Falha no registro");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/sign-in", { email, password });

      const { access_token } = response.data; 

      setCookie(undefined, "simuladorIR.token", access_token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setIsAuthenticated(true);
      router.push("/historico");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha na autenticação");
    }
  };

  const logout = () => {
    destroyCookie(undefined, "simuladorIR.token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
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

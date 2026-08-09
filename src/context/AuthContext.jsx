import { createContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingUser() {
      try {
        const response = await api.get("/users/me");

        setRole(response.data.role);
        setId(response.data.id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    loadingUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, setRole, id, setId, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

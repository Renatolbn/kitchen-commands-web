import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo_kc.png";
import "../styles/Login.css";
import api from "../services/api";

function Login() {
  // 1. Hooks  — sempre no topo do componente
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const { setRole, setId } = useContext(AuthContext);

  // 2. Funções do componente — usam os states acima
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", { email, password });

      setRole(response.data.role);
      setId(response.data.id);

      console.log(response.data.role);

      switch (response.data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "waiter":
          navigate("/waiter");
          break;
        case "kitchen":
          navigate("/kitchen");
          break;
        default:
          console.log("Role desconhecido");
      }
    } catch (err) {
      console.error(err);
      setErro("Email ou senha inválidos");
    }
  }

  // 3. O que a função retorna (JSX) — sempre por último
  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="row w-100 align-items-center">
        {/* Lado esquerdo */}
        <div className="col-12 col-lg-7 pe-lg-5 d-flex flex-column justify-content-center align-items-center mb-5 mb-lg-0">
          <img src={logo} alt="Logo" className=" logo img-fluid" />
        </div>

        {/* Lado direito */}
        <div className="col-12 col-lg-5 ps-lg-5 d-flex  justify-content-center align-items-center align-items-lg-start">
          <div className="form-login d-flex flex-column align-items-center container-fluid border rounded-4 border-opacity-10 w-100 w-lg-75 mx-auto mx-lg-0 p-4 p-lg-5">
            <h2 className="text-dark text-center fs-1 fw-semibold mt-5 mb-5">
              Login
            </h2>

            <form
              className="w-75 justify-content-center"
              onSubmit={handleSubmit}
            >
              <label className="form-label fw-semibold" htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email:
              </label>

              <input
                id="email"
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="form-label fw-semibold" htmlFor="password">
                <i className="bi bi-lock me-2"></i>Senha:
              </label>

              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {erro && (
                <div
                  className="alert alert-danger text-center mt-5"
                  role="alert"
                >
                  ⚠️ {erro}
                </div>
              )}
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary w-50">
                  Entrar
                </button>
              </div>

              <div className="d-flex justify-content-center  gap-3 mt-5">
                <Link className="text-light fs-6 mb-5" to="/ForgotPassword">
                  Esqueceu sua senha?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

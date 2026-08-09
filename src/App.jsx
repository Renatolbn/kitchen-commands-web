import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import TesteContext from "./components/TesteContext";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<TesteContext />} />
          <Route path="/waiter" element={<TesteContext />} />
          <Route path="/kitchen" element={<TesteContext />} />
          <Route path="/forgot-password" element={<div>ForgotPassword</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function TesteContext() {
  const { role, id, loading } = useContext(AuthContext);

  console.log("Context atual:", { role, id, loading });

  return (
    <div>
      <h2>Teste do Context</h2>
      <p>Role: {role}</p>
      <p>Id: {id}</p>
      <p>Loading: {String(loading)}</p>
    </div>
  );
}

export default TesteContext;
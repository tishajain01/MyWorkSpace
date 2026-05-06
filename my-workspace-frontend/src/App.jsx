import { useState } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/authService";

function App() {
  const [user, setUser] = useState(getCurrentUser());

  // Handle successful login from Auth page
  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  return (
    <>
      {user ? (
        <Home />
      ) : (
        <Auth onLoginSuccess={handleLogin} />
      )}
    </>
  );
}

export default App;
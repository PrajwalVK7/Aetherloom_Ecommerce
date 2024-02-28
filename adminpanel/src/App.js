import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

function App() {
  // const [token, setToken] = useState()
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth/>}  />
        {/* <Route path="/home" element={<Dashboard/>}/> */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<Users />}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </>
  );
}

export default App;

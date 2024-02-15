import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth/>}  />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<Users />}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </>
  );
}

export default App;

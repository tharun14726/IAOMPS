import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import AdminLogin from '../adminlogin';

function App() {
  return (
    <>
    <Link to="/">User Login</Link>
    <Link to="/Admin">Admin Login</Link>
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Login/>} />
       <Route path ="/admin" element={<AdminLogin />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

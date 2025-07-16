import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
function AdminLogin(){
    const[user,setUser]=useState();
    const[password,setPassword]=useState();

     async function handleLog(e){
        e.preventDefault();
        try{
           await axios.post("http://localhost:4000/login", {
              username: user,
              password: password,
        });
        }catch{
           console.log("Error occured")
        }

    }
return(
    <div className="container mt-5">
      <form className="border p-4 shadow-sm rounded bg-light" onSubmit={handleLog}>
        <h2 className="mb-4">Admin Login</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Admins User</label>
          <input
            onChange={(e) => setUser(e.target.value)}
            value={user}
            id="username"
            type="text"
            className="form-control"
            placeholder="Enter your username"
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-danger" onClick={handleLog}>Login</button>
        </div>
      </form>
    </div>
);   
}
export default AdminLogin;
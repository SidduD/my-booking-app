import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (error) {
      alert("Registration failed, please try again with valid inputs");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-semibold text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 p-2 w-full text-white rounded-2xl hover:bg-blue-700 focus:ring focus:ring-offset-1 focus:ring-blue-500">
            Register
          </button>

          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link to={"/login"} className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

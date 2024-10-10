import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({setJwtToken}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password
    const [error, setError] = useState(""); // State for error messages

    //const { setJwtToken }= useOutletContext() || {};
    //const { setAlertClassname } = useOutletContext();
    //const { setAlertMessage } = useOutletContext();
    //const { toggleRefresh } = useOutletContext()

  //payload
  const handleSubmit =(event) => {
    event.preventDefault();
    console.log("Submitting login", { email, password })

    let payload = {
      email: email,
      password: password,
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(payload)
    };

    fetch(`${process.env.REACT_APP_BACKEND}/authenticate`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.message); // or handle error message accordingly
        } else {
          setJwtToken(data.access_token);
          console.log("JWT TOkej", data.access_token)
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error('Error during fetch:', error); // Log the error
      });
  }
  


  // Handle login logic
  //const handleLogin = (e) => {
  //  e.preventDefault(); // Prevent default form submission

    // Check if credentials match mock user
  //  if (username === mockUser.username && password === mockUser.password) {
      // Navigate to home page if successful
   //   onLogin();
   //   navigate("/home");
   // } else {
      // Show error message if credentials are incorrect
   //   ;
    //  setError("Invalid username or password");
   // }
  //};

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg_login.png)` // Make sure the image is in your public folder
      }}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Login form container */}
      <div className="relative z-10 bg-gradient-to-br from-purple-800 to-purple-500 rounded-lg p-8 w-full max-w-md">
        {/* Logo at the top center */}
        <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
          <img 
            src={`${process.env.PUBLIC_URL}/odisseia_novo.png`} // Update with the actual logo filename
            alt="Logo"
            className="h-16 w-max" // Adjust the size of the logo as needed
          />
        </div>
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>

        {/* Input fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              title="Login"
              type="text"
              name="email"
              autoComplete="email-new"
              onChange={(e) => setEmail(e.target.value)} // Update username state
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent text-white"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-transparent text-white"
              placeholder="Enter your password"
            />
          </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
            <button
              type="submit" // Set button type to submit
              className="w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

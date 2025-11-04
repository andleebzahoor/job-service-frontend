// import React, { useState, useEffect } from "react";

// const SignUp = ({ shows, onClose, onSignUp }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (shows) {
//       setTimeout(() => setIsOpen(true), 10);
//     } else {
//       setIsOpen(false);
//       setTimeout(() => {
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         setPasswordError("");
//       }, 300);
//     }
//   }, [shows]);

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match!");
//       return;
//     }

//     setPasswordError("");

//     const response = await fetch("http://127.0.0.1:5000/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     const data = await response.json();
//     alert(data.message);

//    if (response.ok) {
//   const newUser = { id: data.user_id, username, email };
//   alert("✅ Signup successful! Please login now.");

//   onClose();       // close SignUp popup
//   onSignUp();      // trigger Login popup (we handle it in Navbar)
// }

//   };

//   const isFormValid = username && email && password && confirmPassword;

//   if (!shows) return null;

//   return (
//     <div className="w-full sm:rounded-2xl p-6 fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className={`bg-white shadow-2xl p-6 sm:rounded-2xl sm:w-96 w-full transform transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>

//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
//         <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">Create a New Account</h2>

//         <form onSubmit={handleSignUp} className="space-y-5">
//           <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>
//           <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>
//           <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>

//           <div>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e)=>setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//             {passwordError && (
//               <p className="text-red-500 text-sm mt-1">{passwordError}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={!isFormValid}
//             className={`w-full py-2 rounded-lg text-white font-semibold ${isFormValid ? "bg-green-600" : "bg-green-400 cursor-not-allowed"}`}
//           >
//             Sign Up
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default SignUp;
// import React, { useState, useEffect } from "react";

// const SignUp = ({ shows, onClose, onSignUp }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (shows) {
//       setTimeout(() => setIsOpen(true), 10);
//     } else {
//       setIsOpen(false);
//       setTimeout(() => {
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         setPasswordError("");
//       }, 300);
//     }
//   }, [shows]);

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (username.length < 4) {
//       setPasswordError("Username must be at least 4 characters long!");
//       return;
//     }

//     if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters long!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match!");
//       return;
//     }

//     setPasswordError("");

//     const response = await fetch("http://127.0.0.1:5000/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     const data = await response.json();
//     alert(data.message);

//     if (response.ok) {
//       const newUser = { id: data.user_id, username, email };
//       alert("✅ Signup successful! Please login now.");
//       onClose();
//       onSignUp();
//     }
//   };

//   const isFormValid =
//     username.length >= 4 &&
//     email &&
//     password.length >= 6 &&
//     confirmPassword.length >= 6;

//   if (!shows) return null;

//   return (
//     <div className="w-full sm:rounded-2xl p-6 fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className={`bg-white shadow-2xl p-6 sm:rounded-2xl sm:w-96 w-full transform transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>

//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
//         <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">Create a New Account</h2>

//         <form onSubmit={handleSignUp} className="space-y-5">
//           <input type="text" placeholder="Username (min 4 letters)" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>

//           <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>

//           <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>

//           <div>
//             <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>
//             {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={!isFormValid}
//             className={`w-full py-2 rounded-lg text-white font-semibold ${isFormValid ? "bg-green-600" : "bg-green-400 cursor-not-allowed"}`}
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState, useEffect } from "react";

const SignUp = ({ shows, onClose, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (shows) {
      setTimeout(() => setIsOpen(true), 10);
    } else {
      setIsOpen(false);
      setTimeout(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
      }, 300);
    }
  }, [shows]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (username.length < 4) {
      setError("⚠️ Username must be more than 3 letters");
      return;
    }

    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    setError("");

    const response = await fetch("https://job-service-backend.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      alert("✅ Signup successful! Please login now.");
      onClose();
      onSignUp();
    }
  };

  const isFormValid =
    username.length >= 4 &&
    email &&
    password.length >= 6 &&
    confirmPassword.length >= 6;

  if (!shows) return null;

  return (
    <div className="w-full sm:rounded-2xl p-6 fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white shadow-2xl p-6 sm:rounded-2xl sm:w-96 w-full transform transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
          Create a New Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username (min 4 letters)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {username && username.length < 4 && (
              <p className="text-red-500 text-sm mt-1">
                ⚠️ Username must be more than 3 letters
              </p>
            )}
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {password && password.length < 6 && (
              <p className="text-red-500 text-sm mt-1">
                ⚠️ Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-500 text-sm mt-1">
                ⚠️ Passwords do not match
              </p>
            )}
          </div>

          {/* All Errors */}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              isFormValid ? "bg-green-600" : "bg-green-400 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;





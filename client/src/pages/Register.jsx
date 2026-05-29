import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendar,
  FaPhone,
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await axios.post(
            "https://narpay.onrender.com/api/auth/register",
            formData
          );

        alert(
          response.data.message
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

<div
style={{
minHeight:"100vh",
background:
"linear-gradient(to bottom right,#020617,#0f172a,#111827)",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"20px",
fontFamily:"Arial",
}}
>

<div
style={{
width:"100%",
maxWidth:"450px",
background:
"rgba(255,255,255,0.06)",
backdropFilter:"blur(20px)",
border:
"1px solid rgba(255,255,255,0.1)",
borderRadius:"30px",
padding:"40px",
boxShadow:
"0 10px 40px rgba(0,0,0,0.4)",
}}
>

<div
style={{
textAlign:"center",
marginBottom:"35px",
}}
>

<h1
style={{
fontSize:"42px",
marginBottom:"10px",
background:
"linear-gradient(to right,#60a5fa,#a855f7)",
WebkitBackgroundClip:
"text",
WebkitTextFillColor:
"transparent",
}}
>

NARpay ⚡

</h1>

<p
style={{
color:"#94a3b8",
}}
>

Create Your Smart Wallet

</p>

</div>


<form onSubmit={handleSubmit}>


{/* NAME */}

<div style={{marginBottom:"20px"}}>

<label style={{
color:"#cbd5e1",
display:"block",
marginBottom:"10px"
}}>

Full Name

</label>

<div style={{
display:"flex",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"16px 18px",
borderRadius:"18px"
}}>

<FaUser color="#60a5fa"/>

<input
type="text"
name="name"
placeholder="Enter name"
value={formData.name}
onChange={handleChange}
required
style={{
width:"100%",
marginLeft:"12px",
background:"transparent",
border:"none",
outline:"none",
color:"white"
}}
/>

</div>

</div>



{/* EMAIL */}

<div style={{marginBottom:"20px"}}>

<label style={{
color:"#cbd5e1",
display:"block",
marginBottom:"10px"
}}>

Email Address

</label>

<div style={{
display:"flex",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"16px 18px",
borderRadius:"18px"
}}>

<FaEnvelope color="#60a5fa"/>

<input
type="email"
name="email"
placeholder="Enter Email"
value={formData.email}
onChange={handleChange}
required
style={{
width:"100%",
marginLeft:"12px",
background:"transparent",
border:"none",
outline:"none",
color:"white"
}}
/>

</div>

</div>



{/* PHONE */}

<div style={{marginBottom:"20px"}}>

<label style={{
color:"#cbd5e1",
display:"block",
marginBottom:"10px"
}}>

Phone Number

</label>

<div style={{
display:"flex",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"16px 18px",
borderRadius:"18px"
}}>

<FaPhone color="#60a5fa"/>

<input
type="text"
name="phone"
placeholder="Enter phone number"
value={formData.phone}
onChange={handleChange}
required
style={{
width:"100%",
marginLeft:"12px",
background:"transparent",
border:"none",
outline:"none",
color:"white"
}}
/>

</div>

</div>



{/* DOB */}

<div style={{marginBottom:"20px"}}>

<label style={{
color:"#cbd5e1",
display:"block",
marginBottom:"10px"
}}>

Date Of Birth

</label>

<div style={{
display:"flex",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"16px 18px",
borderRadius:"18px"
}}>

<FaCalendar color="#60a5fa"/>

<input
type="date"
name="dob"
value={formData.dob}
onChange={handleChange}
required
style={{
width:"100%",
marginLeft:"12px",
background:"transparent",
border:"none",
outline:"none",
color:"white"
}}
/>

</div>

</div>



{/* PASSWORD */}

<div style={{marginBottom:"28px"}}>

<label style={{
color:"#cbd5e1",
display:"block",
marginBottom:"10px"
}}>

Password

</label>

<div style={{
display:"flex",
alignItems:"center",
background:"rgba(255,255,255,0.05)",
padding:"16px 18px",
borderRadius:"18px"
}}>

<FaLock color="#60a5fa"/>

<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
style={{
width:"100%",
marginLeft:"12px",
background:"transparent",
border:"none",
outline:"none",
color:"white"
}}
/>

</div>

</div>



<button
type="submit"
disabled={loading}
style={{
width:"100%",
padding:"16px",
border:"none",
borderRadius:"18px",
background:
"linear-gradient(to right,#2563eb,#7c3aed)",
color:"white",
fontWeight:"bold",
fontSize:"17px",
cursor:"pointer"
}}
>

{loading
? "Creating Account..."
: "Create Account"}

</button>


</form>


<div
style={{
marginTop:"25px",
textAlign:"center"
}}
>

<p style={{color:"#94a3b8"}}>

Already have account?

<Link
to="/login"
style={{
marginLeft:"6px",
color:"#60a5fa",
textDecoration:"none",
fontWeight:"bold"
}}
>

Login

</Link>

</p>

</div>

</div>

</div>

  );

}

export default Register;
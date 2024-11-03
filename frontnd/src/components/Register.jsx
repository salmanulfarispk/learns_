import React, { useState } from 'react';
import {backendUrl} from "../App"

export const Register = ({ setOpen }) => {

  
const [user,setUser]=useState({
  name:"",
  email:"",
  password:""
})


const handleChange = (e) => {
  const { name, value } = e.target;
  setUser((prevUser) => ({
    ...prevUser,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(backendUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();


    if (data.success) {
      setUser({
       name:'',
       email:'',
       password:''
      })

      setTimeout(()=>{
      setOpen(false)
      },2000)
      return data;

    } else {
      console.error("Registration failed:", data.message);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <button
          className="absolute top-0 right-2 text-gray-600 text-3xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="sr-only">
              Username
            </label>
            <input
              type="text"
              name='name'
              value={user.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name='email'
              value={user.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name='password'
              value={user.password}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

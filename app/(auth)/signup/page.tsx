'use client'
import axios from 'axios';
import { useState } from 'react';

const SignupPage = () => {
    const [name , setname] = useState<string>('');
    const [email , setEmail] = useState<string>('');
    const [password,setpassword] = useState<string>('');
    const [success , setsuccess] = useState<boolean>(false);

    const onsubmitHandler = async () => {
      try{
        const res = await axios.post('http://localhost:3000/api/signup', { name: name, email: email, password: password });
        console.log(res);
        setname('');
        setEmail('');
        setpassword('');
        setsuccess(true);
      } catch(err){
        alert('Error ',err);
      }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <div>
        {success&&<h1>You are successfuly Signup</h1>}
       </div>
       <h1 className="text-4xl font-bold mb-8">Signup Page</h1>
       <input 
         type="text" 
         placeholder="Name" 
         value={name} 
         onChange={(e) => setname(e.target.value)} 
         className="mb-4 p-2 border border-gray-300 rounded"
       />
       <input 
         type="email" 
         placeholder="Email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         className="mb-4 p-2 border border-gray-300 rounded"
       />
       <input 
         type="password" 
         placeholder="Password" 
         value={password} 
         onChange={(e) => setpassword(e.target.value)} 
         className="mb-4 p-2 border border-gray-300 rounded"
       />
       <button 
         onClick={onsubmitHandler} 
         className="bg-blue-500 text-white p-2 rounded"
       >
         Signup
       </button>
      </div>
    );
}

export default SignupPage;
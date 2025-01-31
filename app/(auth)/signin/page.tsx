'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const SignupPage = () => {
    const [email , setEmail] = useState<string>('');
    const [password,setpassword] = useState<string>('');
    const [success , setsuccess] = useState<boolean>(false);
    const router = useRouter();

    const onsubmitHandler = async () => {
      try{
        const res = await axios.post('http://localhost:3000/api/signin', { email: email, password: password });
        console.log(res);
        setEmail('');
        setpassword('');
        setsuccess(true);
        router.push('/');
      } catch(err){
        setsuccess(false);
        alert('Error ',err);
      }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
       <div>
        {success&&<h1>You are successfuly Logged in</h1>}
       </div>
       <h1 className="text-4xl font-bold mb-8">Signin Page</h1>
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
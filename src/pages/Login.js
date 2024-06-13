import React, { useState,useEffect } from 'react';
import logo from '../../src/assets/images/loginn.jpg';
import { loginApi } from '../Data/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


function Login() {
  const notifyError = (result) => toast.error(result);
  const notifySuccess = (result) => toast.success(result);
 const navigate=useNavigate()
  const [input, setInput] = useState({
    userName: '',
    password: '',
    service: 'Zgames', 
  });

  console.log(input,"input")

  useEffect(() => {
    localStorage.setItem('service', input.service);
  }, [input.service]);


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  // const handleChange = (e) => {
  //   console.log("Selected service:",e.target.value); 
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });

  //   console.log(input)
  
  //   // console.log("localStorage:", input.service);
  //   // localStorage.setItem('service', input.service);
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${loginApi}`, input);
      console.log(res, "login");
      if (res.status === 200) {
        Cookies.set('login', res.data.result.login); 
         setInput(res)
         notifySuccess(res.data.message);
        navigate('/')
      } else {
        console.log('Errorrrrr:', res.data);
      
        
      }
  
        // setInput(res);
        // notifySuccess(res.data.message);
        // setTimeout(() => {
        //   navigate("/")
        // }, 2000);
      
    } catch (error) {
      console.log(error, "error fetching data");
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='bg-[#E4E2DD]'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center h-screen'>
          <div className='relative '>
            <img src={logo} alt='Zamani Telcom' className='block mx-auto rounded-lg w-[300px] h-[500px] md:w-[500px] md:h-[700px] lg:w-[360px] lg:h-[500px]' />
            <div className='absolute mt-8 lg:mt-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <h1 className="text-xl font-semibold text-black text-center lg:mb-2 mb-0">LOGIN</h1>
              <label className=' text-black text-[14px] '>Username</label>
              <input
                type="text"
                name='userName'
                value={input.userName}
                onChange={handleChange}
                className='border border-emerald-400 mb-2 lg:mb-1 rounded-lg lg:px-3 lg:py-1 px-4 py-1 w-[200px] lg:w-[240px]'
                placeholder='Enter username'
              />
              <label className='text-black text-[14px]'>Password</label>
              <input
                type="password"
                name='password'
                value={input.password}
                onChange={handleChange}
                className='border border-emerald-400 mb-2 lg:mb-1 rounded-lg lg:px-3 lg:py-1 px-4 py-1 w-[200px] lg:w-[240px]'
                placeholder='Enter password'
              />
              <label className='text-black text-[14px]'>Select Service</label>
              <select
                name='service'
                onChange={handleChange}
                value={input.service}
                className='border border-emerald-400 mb-2 lg:mb-1 rounded-lg lg:px-3 lg:py-1.5 px-4 py-1 w-[200px] lg:w-[240px]'
              >
              

                <option value="Zgames">Zgames</option>
                <option value="Zcomedy">Zcomedy</option>
              </select>
              <div className='flex justify-center items-center'>
                <button type="submit" className='bg-black hover:scale-105 text-white px-6 py-1 lg:px-4 lg:py-2 lg:mt-2 mt-2 rounded-lg'>Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;





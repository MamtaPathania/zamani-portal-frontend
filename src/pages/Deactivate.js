import React, { useState,useEffect } from 'react';
import Layout from '../components/Layout';
import { FaMobileAlt } from 'react-icons/fa';
import { deactivateApi } from '../Data/api';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import Lottie from 'react-lottie';
import * as animationData from '../assets/images/success.json';
import CheckLogin from './Auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Deactivate() {
  const notifyError = (result) => toast.error(result);

  const [message, setMessage] = useState([]);
  // const [showTable, setShowTable] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [input, setInput] = useState({
    number: '',
  });
const navigate=useNavigate()
  useEffect(() => {
    if (!CheckLogin('true')) {
      navigate('/Login');
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const service = localStorage.getItem('service');

  const data = {
    ani: input.number,
    serviceName: service,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${deactivateApi}`, data);
      setMessage(res?.data?.result);
      // setShowTable(true);
      setDialogVisible(true); // Show dialog after getting response
    } catch (error) {
      console.log(error, 'error');
      notifyError(error.response.data.message);

    }
  };

  const onHide = () => {
    setDialogVisible(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Layout>
      
      <ToastContainer/>
      <div className="dark:text-white flex flex-col px-2 w-full">
      <div className='lg:hidden md:hidden'>
        <h1 className="flex justify-center items-center text-gray-600 underline font-bold text-lg">{service}</h1>

        </div>
        <h1 className="flex justify-center items-center text-emerald-600 font-bold text-lg">Deactivate Number</h1>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="flex flex-col lg:mt-4 mt-6 justify-center items-center bg-green-50 shadow-2xl lg:w-[400px] lg:h-[200px] w-[250px] h-[160px] rounded-lg">
            <div className="flex flex-col">
              <label className="lg:mt-2 mt-3 items-start">Enter Number To Deactivate</label>
              <div className="flex flex-row relative">
                <FaMobileAlt className="absolute top-1/2 right-5 transform -translate-y-1/2 text-black" />
                <input
                  placeholder="Enter Number"
                  name="number"
                  value={input.number}
                  onChange={handleChange}
                  className="border-1 border-gray-100 bg-white rounded-lg lg:px-3 lg:py-2 px-4 py-2 lg:w-[200px] w-[180px]"
                />
              </div>
            </div>
            <div className="lg:mt-6 mt-8 bg-emerald-600 text-white rounded-lg lg:px-3 lg:py-2 px-3 py-1">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
        <Dialog header="Message" visible={dialogVisible} style={{ width: '50vw' ,height:'30vw',marginLeft:'20px'}} onHide={onHide}>
          <div className="flex flex-col items-center mt-1 rounded-lg">
          <Lottie options={defaultOptions} height={200} width={300} className="px-5" />
            {/* <div className=" mt-50 flex justify-center items-center lg:w-[300px] lg:h-[100px] shadow-2xl rounded-lg"> */}
              <h1 className="text-lg font-semibold px-6">{message}</h1>
            {/* </div> */}
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}

export default Deactivate;

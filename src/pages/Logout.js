import React,{useEffect, useRef, useState} from 'react'
import Layout from '../components/Layout'
import CheckLogin from './Auth'
import { useNavigate } from 'react-router-dom'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie'
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

const Logout = () => {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const buttonEl = useRef(null);
    const navigate=useNavigate()
  useEffect(() => {
    if (!CheckLogin('true')) {
      navigate('/Login');
    }
  }, [navigate]);

  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
};

const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
};

const service=localStorage.getItem('service')
const handleLogout=()=>{
    Cookies.remove('login')
    navigate('/login')
}

  return (
    <Layout>
    <div  className='flex flex-col justify-center items-center'>
       
    <div className='lg:hidden md:hidden'>
        <h1 className="flex justify-center items-center text-gray-600 underline font-bold text-lg">{service}</h1>

        </div>      

        <div className="card">
            <div className="flex flex-wrap gap-5">
               

                <div className="flex-auto">
                    
                    {/* <Avatar label="u" className="mr-2" size="xlarge" shape="circle" /> */}
                    <Avatar image="https://cdn-icons-png.flaticon.com/128/13983/13983903.png" className="mr-2" size="xlarge" shape="circle" />

                </div>

              
            </div>
        </div>
 
    <Toast ref={toast} />


    <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)} 
    message="Are you sure you want to Logout?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
    <h1 className='mt-4 lg:mt-6'>Are You Sure You Want to LogOut?</h1>
<div onClick={handleLogout}>
<Button 
ref={buttonEl} onClick={() => setVisible(true)} icon="pi pi-check" label="LOGOUT" className='bg-emerald-300 text-white px-6 py-6 mt-2 lg:mt-2 lg:px-4 lg:py-3'/>
         </div>
    </div>

    </Layout>
   
  )
}

export default Logout
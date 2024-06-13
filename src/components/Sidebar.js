import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'
import HamburgerButton from './HamburgerMenuButton/HamburgerButton'
import { IoTimerSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa"
import { IoMdLogOut } from "react-icons/io"
import { FaToggleOff } from "react-icons/fa"
const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const Menus = [
    // { title: 'Home', path: '/', src:<MdHome size={30} className="text-green-500"/>},
    { title: 'User Details', path: '/', src:<FaRegUserCircle size={30} className="text-blue-500 " />},

    { title: 'Charging ', path: '/Charging', src:<IoTimerSharp size={30} className="text-yellow-500" /> },
  
    { title: 'Deactivate', path: '/deactivation', src: <FaToggleOff   size={30}  className="text-pink-500" />,  },
    { title: 'Logout' , path: '/Logout', src: <IoMdLogOut  size={30}  className="text-stone-500" />,  },
  ]
const service=localStorage.getItem('service')
  return (
    <>
      <div
      className={`${
        open ? 'w-60' : 'w-fit'
      } h-screen hidden sm:block relative duration-300 bg-green-100 border-r border-gray-200 p-5 shadow-y-xl`}
    >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4  `}
          onClick={() => setOpen(!open)}
        />
        
        {/* <Link to='/'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
              < GiSoccerBall size={50} className="IoFootball animate-spin text-black/80 dark:text-white" style={{ animationDuration: '10s' }}/>
            {open && (
              <span className='text-xl font-bold whitespace-nowrap dark:text-white'>
                Football
              </span>
            )}
          </div>
        </Link> */}
         <div className={`flex ${open && 'gap-x-4'} justify-center items-center`}>
            {open && (
              <span className='text-xl font-bold text-emerald-600 whitespace-nowrap'>
                {service}
              </span>
            )}
          </div>
       
        <ul className='pt-3'>
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
                <hr/>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-medium rounded-lg cursor-pointer hover:bg-green-200 
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-black/10 dark:bg-gray-500'
                }`}
              >
              
                <span className='text-2xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar

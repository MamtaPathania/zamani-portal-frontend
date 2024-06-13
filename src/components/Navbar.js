import React from 'react'
import logo from '../../src/assets/images/zamanire.png'
// import Toggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className='bg-slate shadow-lg bg-emerald-100 shadow-blue-200 border-gray-200 mx-2 px-2 rounded-lg dark:bg-gray-700'>
      <div className='container flex justify-between items-center mx-auto'>
        <div className='flex items-center mx-auto'>
          <img src={logo} alt='Zamani Telcom' className='w-[160px] h-[70px]'/>
          {/* <span className='text-xl font-bold  whitespace-nowrap dark:text-white '>
            ADMIN PANEL
          </span> */}
        </div>

        {/* <div className='flex justify-end pr-4'>
          <Toggle />
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar

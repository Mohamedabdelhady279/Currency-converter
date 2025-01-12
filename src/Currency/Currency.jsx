import React from 'react'
import Currencyform from './Currencyform'


const Currency = () => {
  return (
    <section  className={` flex justify-center items-center min-h-[100vh] bg-[#030728] bg-[url('/bg.png')] bg-no-repeat bg-center`} > 
      <div className='pt-10 pr-8 pb-12 pl-7 bg-[rgba(2,7,40,0.5)] border 	border-slate-400	backdrop-blur-[30px]  shadow-lg	 rounded-md min-w-[410px]'>
      <h1 className=' text-center text-white text-[24px] font-semibold'>Currency Converter</h1>
    <Currencyform/>


</div>

   

  







    </section>
  )
}

export default Currency

import React, { useState } from 'react'
import { AiOutlineSwap } from 'react-icons/ai'
import Currencyselect from './Currencyselect'
import { useEffect } from 'react'

    
    
     
    
    
    
    
    
    const Currencyform = () => {

      const[fromcurrency,setfromcurrency]=useState("USD")
      const[tocurrency,settocurrency]=useState("INR")
      const[amount,setamount]=useState(100)
      const[result,setresult]=useState(100)
      const[isloading,setisloading]=useState(false)

      // تغيير القيمة هنعمل دالة 
      const handleswap=()=>{
        setfromcurrency(tocurrency)
        settocurrency(fromcurrency)
      }
  
  
      // دالة علشان نجيب api قيم العملة 
      const getexchange = async () => {
        setisloading(true);
        setTimeout(async () => {
          // Exchange Rate API موقع 
          const API_URL = `https://v6.exchangerate-api.com/v6/74f1d55305d0183b1944c149/pair/${fromcurrency}/${tocurrency}`;
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Something went wrong');
            const data = await response.json();
            const exchangeRate = (data.conversion_rate * amount).toFixed(2);
            setresult(`${amount} ${fromcurrency} = ${exchangeRate} ${tocurrency}`);
            console.log(exchangeRate);
          } catch (error) {
            console.log(error);
          } finally {
            setisloading(false);
          }
        }, 1000); 
      };
  
      useEffect(()=>{
        getexchange()
      },[])


      const handlefromsubmit=(e)=>{
        e.preventDefault();
        getexchange();
      }

    return (
       
    <form className=' mt-[45px]' onSubmit={handlefromsubmit}>
      
    <div className='flex  flex-col mb-8 ' >
    <label className='text-white font-medium mb-2 text-base' >Enter Amount</label>
    <input type="number" value={amount} onChange={e=>setamount(e.target.value)} name="from" id="from" required className='outline-none text-lg px-4 text-white font-medium h-12 rounded-md bg-white/10 border border-white/50'/>
    </div>



 
    <div className="flex items-center justify-between mb-6">
   
          <div className="flex flex-col">
            <label className="text-white font-medium mb-2 text-base">
              From
            </label>
           <Currencyselect 
           Selectedcurrency={fromcurrency}
           handledurrency={e=>setfromcurrency(e.target.value)}
           />
          
          </div>

          {/* Swap Icon */}
          <div onClick={handleswap}  className="h-10 w-10 mt-6 cursor-pointer flex items-center justify-center rounded-full bg-white/10 border border-white/50 transition duration-200 ease-in-out hover:bg-white/30">
            <AiOutlineSwap />
          </div>

          {/* To Currency */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-2 text-base">
              To
            </label>
            <Currencyselect
             Selectedcurrency={tocurrency}
             handledurrency={e=>settocurrency(e.target.value)}
             />
          
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-13 rounded-md outline-none text-base font-semibold mt-1 transition duration-200 ease-in-out hover:bg-white/70"
        >
          Get Exchange Rate
        </button>

        {/* Exchange Rate Result */}
        <p className="text-white text-lg font-semibold text-center mt-6 py-6 rounded-md tracking-wide bg-white/10">
          {isloading?"Getting Exchange Rate...":result}
        </p>
   </form>
  )
}

export default Currencyform

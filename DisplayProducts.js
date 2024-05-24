import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayUSDCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import SummaryApi from '../common'

const DisplayProducts = () => {
  const [allProduct,setAllProduct] = useState([])

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
 }

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
    console.log(allProduct)
  },[])

  return (
    <div className='flex lg:row grid-cols-1 items-center space-x-4 mx-4'>
        {(
    allProduct.map((product,index)=>{
        return(

          <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow '>
          <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
              <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
          </div>
          <div className='p-4 grid gap-3'>
              <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
              <p className='capitalize text-slate-500'>{product?.category}</p>
              <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>{ displayUSDCurrency(product?.sellingPrice) }</p>
                  <p className='text-slate-500 line-through'>{ displayUSDCurrency(product?.price)  }</p>
              </div>
              <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
          </div>
      </Link>
        )
    })
)

}
    </div>
  )
}

export default DisplayProducts
import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayUSDCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import newMainImg from "../assets/new_main.jpeg"
import TshirtImg from "../assets/t-shirts.jpeg"
import TrousersImg from "../assets/trousers.jpeg"

const MainContent = ({ category }) => {
  const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)

      console.log("horizontal data",categoryProduct.data)
      setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
        console.log(data)
    },[])

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col text-center py-2 text-white bg-teal_gradient w-5/6'>
        <h3 className='mb-0 text-gray-50'>The hottest new arrivals</h3>
        <p className='my-0'>Shop summertime styles</p>

        <div className="my-2 flex-row space-x-3">
          <button className='bg-gray-50 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer'>
            Jacket
            </button>   
          <button className='bg-gray-50 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer'>
            Trousers
            </button>
          <button className='bg-gray-50 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer'>
            Shoes
            </button>
        </div>
      </div>

      <div className=' flex flex-col place-items-center m-2 w-5/6'>
        <img className='w-5/6 md:w-3/6 h-96 border-none cursor-pointer' src={newMainImg} alt="New Collection 1" />
        <div className='flex flex-col place-items-center -m-36 bg-slate-950 w-5/6 h-36 opacity-90 text-gray-50'>
        <h3 className='mb-0'>New arrivals</h3>
        <h2 className='mt-0'>Summer prints</h2>
        <button className='bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'><Link to="/admin-panel/all-products">Shop now</Link></button>
        </div>
        </div>

        {

loading ? (
    loadingList.map((product,index)=>{
        return(
          <div className='flex flex-row mt-48 w-full'>
          <div className='m-2 w-3/6 flex flex-col items-center'>
          <img alt="T-shirts" />
          <button className='mt-3 bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'></button>
          </div>
    
          <div className='m-2 w-3/6 flex flex-col items-center'>
          <img alt="Trousers" />
          <button className='mt-3 bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'></button>
          </div>
    
        </div>
        )
    })
) : (
    data.map((product,index)=>{
        return(



            <Link to={"product/"+product?._id} className=''>
                <div className='flex flex-row mt-48 mx-36 md:mx-16 sm:mx-12'>
      <div className='m-2 w-3/6 flex flex-col items-center'>
      <img src={TshirtImg} alt="T-shirts" />
      <button className='mt-3 bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'>T-Shirts</button>
      </div>

      <div className='m-2 w-3/6 flex flex-col items-center'>
      <img src={TrousersImg} alt="Trousers" />
      <button className='mt-3 bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'>Trousers</button>
      </div>

    </div>
            </Link>
        )
    })
)

}
    </div>
  )
}

export default MainContent



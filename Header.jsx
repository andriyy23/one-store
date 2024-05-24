// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useContext, useState } from 'react'
import Logo from "../assets/one-shop-high-resolution-logo-black-transparent.png"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Context from '../context';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';

const Header = () => {
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <nav className="w-full shadow">
       {/* md:flex */}
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:px-8">
        <div>
          <div className="flex items-center justify-between py-3">
            <a href="/">
              <img src={Logo} className="h-6 md:h-3 sm:2" alt="" />
            </a>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow'>
                <input type='text' placeholder='search product here...' className='w-full h-full outline-none bg-slate-50 p-[6px] pl-4 rounded-full' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                  <SearchIcon />
                </div>
            </div>

            <div className="flex flex-end">
              <ul>
            <li className="text-white">
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><ShoppingCartRoundedIcon color="primary" sx={{ fontSize: 30 }} /></span>
      
                          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
              </li>
              </ul>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header
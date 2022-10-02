import React, {ChangeEvent, SyntheticEvent, useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeBasket } from '../redux/slice/basketSlice';
import { signOut } from '../redux/slice/userSlice';
import { useAppSelector } from '../redux/store/ConfigureStore';
import MobileNavigation from './MobileNavigation';
import Searchbar from './Navigation/Searchbar';
import UserMenu from './UserMenu';

const Navigation = () => {
    const { basket } = useAppSelector((state) => state.basket);
    const basketCount = basket?.items.length;
    const dispatch = useDispatch();
    const {user} = useAppSelector((state) => state.user);
    
    // <FaIcons.FaBars onClick={showSidebar} />
    // <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
    //   <ul className="nav-menu-items" onClick={showSidebar}>
    //     <li className="cancel">
    //       <FaIcons.FaChevronLeft />
    //     </li>

    //     <li className="nav-menu-items__header">Navigation</li>
    //     <Link to="/">
    //       <li>Home</li>
    //     </Link>
    //     {user ? (<>
    //       <Link to="/profile">
    //       <li>Profile</li>
    //       </Link>
    //       <div onClick={signout}>
    //         <li>Logout</li>
    //       </div></>
    //     ) : (<>
    //       <Link to="/login">
    //         <li>Login</li>
    //       </Link></>)
    //     }
        
    //   </ul>
    // </nav>
    return (
      <div className="nav-container">
        
        <div className="nav">
        <MobileNavigation/>
          <div className="nav__left">
            <img className='nav__left__logo' src="https://learnify-assets.s3.amazonaws.com/Images/logo.png" alt="logo" />
  
            <ul className="nav__left__list">
              <Link to="/">
                <li className="nav__left__list__item">Home</li>
              </Link>
              {user ? 
                <li className="nav__left__list__item"><UserMenu/></li> 
                :
                <Link to="/login">
                <li className="nav__left__list__item">Login</li>
                </Link>
              }
              
            </ul>
          </div>
          <div className="nav__right">
            <Searchbar FormClass = {"nav__right__search"} InputClass={"nav__right__search__input"} ButtonClass={"nav__right__search__button"} />
            <Link to="/basket">
              <div className="nav__right__cart">
                <FaIcons.FaShoppingCart />
                {basketCount! > 0 && (
                  <span className="nav__right__cart__count">{basketCount}</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  export default Navigation;
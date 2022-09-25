import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/store/ConfigureStore';

const Navigation = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const { basket } = useAppSelector(state => state.basket);
    const basketCount = basket?.items.length;
    return (
        <div className='nav-container'>
            <div className='nav'>
                <div className='nav__left'>
                    <div className="nav__left__hamburger">
                        <FaIcons.FaBars onClick={showSidebar}/>
                        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                            <ul className="nav-menu-items" onClick={showSidebar}>
                                <li className="cancel">
                                    <FaIcons.FaChevronLeft/>
                                </li>
                                <li className="nav-menu-items__header">Navigation</li>
                                <li>Courses</li>
                            </ul>
                        </nav>
                    </div>
                    <img className='nav__left__logo' src="https://learnify-assets.s3.amazonaws.com/Images/logo.png" alt="logo" />
                    <ul className="nav__left__list">
                        <Link to="/">
                        <div className="nav__left__list__item">Home</div>
                        </Link>
                    </ul>
                </div>
            <div className='nav__right'>
                <form className='nav__right__search'>
                    <input 
                    type="text"
                    className='nav__right__search'
                    placeholder='Search Course...' 
                    />
                    <button className='nav__right__search__button'>
                        <FaIcons.FaSearch/>
                    </button>
                </form>
                <Link to="/basket">
                    <div className="nav__right__cart">
                        <FaIcons.FaShoppingCart/>
                        {basketCount! > 0 && (<span className="nav__right__cart__count">{ basketCount }</span>)}
                    </div>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Navigation
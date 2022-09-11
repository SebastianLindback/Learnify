import React from 'react'
import * as FaIcons from 'react-icons/fa'

const Navigation = () => {
  return (
    <div className='nav-container'>
        <div className='nav'>
            <div className='nav__left'>
                <img className='nav__left__logo' src="https://learnify-assets.s3.amazonaws.com/Images/logo.png" alt="logo" />
                <ul className="nav__left__list">
                    <div className="nav__left__list__item">Categories</div>
                    <div className="nav__left__list__item">Courses</div>
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
        </div>
        </div>
    </div>
  )
}

export default Navigation
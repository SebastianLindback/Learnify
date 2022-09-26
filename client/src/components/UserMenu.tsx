import { Dropdown, Menu } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../redux/slice/userSlice';

function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const signout = () => {
        dispatch(signOut());
        navigate("/");
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <div onClick={signout}>Logout</div>
            </Menu.Item>
        </Menu>
    )
  return (
    <Dropdown placement='bottom' overlay={menu}>
        <div className="dropdown">Menu</div>
    </Dropdown>
  )
}

export default UserMenu
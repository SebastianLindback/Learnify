import { Dropdown, Menu } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeBasket } from '../redux/slice/basketSlice';
import { signOut } from '../redux/slice/userSlice';
import { useAppSelector } from '../redux/store/ConfigureStore';

function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user } = useAppSelector((state) => state.user);

    const signout = () => {
        dispatch(signOut());
        dispatch(removeBasket());
        navigate("/");
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            {user?.roles?.includes('Instructor') && (
                <Menu.Item>
                <Link to="/instructor">Instructor</Link>
                </Menu.Item>
            )}
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
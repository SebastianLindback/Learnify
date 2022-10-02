import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Button, Menu } from 'antd';
  import React, { useState } from 'react';
  import * as FaIcons from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeBasket } from '../redux/slice/basketSlice';
import { signOut } from '../redux/slice/userSlice';
import { useAppSelector } from '../redux/store/ConfigureStore';
import Searchbar from './Navigation/Searchbar';
  
  type MenuItem = Required<MenuProps>['items'][number];
  
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  
    
  
  
  const MobileNavigation: React.FC = () => {
    const {user} = useAppSelector((state) => state.user);
    const [menu, setMenu] = useState(false);
    const { basket } = useAppSelector((state) => state.basket);
    const basketCount = basket?.items.length!;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(signOut());
        dispatch(removeBasket());
        toggleMenu();
        navigate("/");
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };

    let menuItems: MenuItem[] = [
        getItem(<Link onClick={toggleMenu} to="/">Home</Link>, '1', <PieChartOutlined />),
        getItem(<><Link onClick={toggleMenu} to="/basket">Basket {basketCount ?`[${basketCount}]` : "" }</Link></>, '2', <FaIcons.FaShoppingCart />),
    ];
    const instructorItems = getItem('Roles', 'sub1', <AppstoreOutlined  />, [
        getItem(<Link onClick={toggleMenu} to="/profile">Profile</Link>, '3'),
        getItem(<Link onClick={toggleMenu} to="/instructor">Instructor</Link>, '4'),
    ]);
    const userItems = getItem(<Link onClick={toggleMenu} to="/profile">Profile</Link>, '5', <AppstoreOutlined  />);
    const logoutItem = getItem(<div onClick={signout}>Logout</div>, '6', <DesktopOutlined   />)
    const signInItem = getItem(<Link onClick={toggleMenu} to="/login">Sign in</Link>, '7', <AppstoreOutlined  />);
    

    if (user){
        if (user?.roles?.includes("instructor")) menuItems.push(instructorItems);
        else if (user) menuItems.push(userItems);
        menuItems.push(logoutItem);
    }
    else menuItems.push(signInItem);
    
    
    
    
    
  
    return (
      <div className="Mobile--nav--menu">
        
        <Button type="primary" onClick={toggleMenu} style={{ marginBottom: 16 }}> <MenuUnfoldOutlined />
          
        </Button>
        {menu ?<>
        <Searchbar FormClass = {"nav__right__search"} InputClass={"nav__right__search__input"} ButtonClass={"nav__right__search__button"} />
        <Menu className='Mobile--nav--menu'
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="light"
          items={menuItems}
        /> </>: <></>}
      </div>
    );
  };
  
  export default MobileNavigation;
  
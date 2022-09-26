import React, { useEffect } from 'react'
import { Category } from '../models/category';
import {Link} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/store/ConfigureStore';
import { categoriesSelector, getCategoriesAsync } from '../redux/slice/categorySlice';

function Categories() {
  const categories = useAppSelector(categoriesSelector.selectAll);
  const { categoriesLoaded } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categoriesLoaded) dispatch(getCategoriesAsync())
  
  }, [categoriesLoaded, dispatch]);
  
    
  return (
    <div className="categories">
        {categories && categories.map((category: Category, index:number) => {
            return (
              <Link key={index} to={`/category/${category.id}`}>
            <div className="categories__name" >{category.name}</div>
            </Link>
            )
        })}
    </div>
  )
}

export default Categories
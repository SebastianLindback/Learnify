import React, { useEffect, useState } from 'react'
import agent from '../actions/agent';
import { Category } from '../models/category';

function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
      agent.Categories.list().then((response) => {
        setCategories(response);
    })
    }, []);
    
  return (
    <div className="categories">
        {categories && categories.map((category: Category, index:number) => {
            return <div className="categories__name" key={index}>{category.name}</div>
        })}
    </div>
  )
}

export default Categories
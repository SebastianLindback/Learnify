import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCourseParams } from '../../redux/slice/courseSlice';

export type props = {
    FormClass: string;
    InputClass: string;
    ButtonClass : string;
  };
function Searchbar({FormClass, InputClass, ButtonClass}: props) {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const onSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(setCourseParams({ search: searchText }));
      };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };


  return (
    <form onSubmit={onSearch} className={FormClass}>
              <input
                type="text"
                className={InputClass}
                placeholder="Search Courses..."
                value={searchText}
                onChange={handleChange}
              />
              <button className={ButtonClass}>
                <i className="fas fa-search"></i>
              </button>
            </form>
  )
}

export default Searchbar
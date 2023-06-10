import { useState } from 'react';
import { FcSearch } from "react-icons/fc";
import style from './Searchbar.module.css';

export const Searchbar = ({ getName }) => {
  const [searchName, setSearchName] = useState('');

  const handleName=(event)=>{
    const { value } = event.target;
    setSearchName(value);
  };

  const handleSubmitEvent=(event)=> {
    event.preventDefault();
    getName(searchName);
  };

	return (
  <header className={style.searchbar}>
    <form className={style.searchForm} onSubmit={handleSubmitEvent}>
      <button type="submit" className={style['searchForm-button']} disabled={searchName.length === 0}>
				<FcSearch className={style["button-icon"]}/>
      </button>

      <input
        className={style['searchForm-input']}
        type="text"
        autoComplete="off"
        autoFocus
        value={searchName}
        onChange={handleName}
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
};



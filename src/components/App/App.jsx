import { useState } from "react";
import style from './App.module.css';
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";


export const App = () => {
  const [searchName, setSearchName] = useState('');

  const getName = name => {
    setSearchName(name)
  };

    return (
    <div className={style.App}>
      <Searchbar getName={getName}/>
      <ImageGallery name={searchName}/>
    </div>
  )
};

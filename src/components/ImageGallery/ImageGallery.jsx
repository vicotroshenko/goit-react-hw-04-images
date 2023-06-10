import { useState, useEffect } from "react";
import style from './ImageGallery.module.css'
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from 'components/Button/Button'
import { getPicFromPixabay } from "../servise/api";
import { Modal } from "components/Modal/Modal";
import { TfiClose } from "react-icons/tfi";
import { Loader } from "components/Loader/Loader";
import PropTypes from 'prop-types';



export const ImageGallery = ({ name }) => {
	const [searchPictures, setSearchPictures] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [imgUrl, setImgUrl] = useState('')
	const [page, setPage] = useState(1)
	const [loader, setLoader] = useState(false)

	const getFullImage=(img) =>{
		setImgUrl(img);
	};

	const toggleModal=()=> {
		setShowModal(showModal => !showModal)
  };

	useEffect(() => {
		if(name.length === 0){
			return;
		}
    (async () => {
			const firstPage = 1;
				setSearchPictures([]);
				try {
					setLoader(name.length > 0 ? true : false);
					const pictures = await getPicFromPixabay(name, firstPage);
					setSearchPictures(pictures.hits);
					setPage(1);
					setLoader(false);
				} catch (error) {
					console.log(error);
				}
		})()
	
  }, [name]);

	const getNewPictures= async ()=>{
		setPage(page => page+1);
		const newPage= page+1;
		try {
			setLoader(true);
			const pictures = await getPicFromPixabay(name, newPage);
			setSearchPictures(searchPictures => [...searchPictures, ...pictures.hits]);
			setLoader(false);
		} catch (error) {
			console.log(error);
		};
	};

	if(loader && searchPictures.length === 0){
		return (<Loader />)
	}
	if(showModal){
		return (<Modal fullImage={imgUrl} onClose={toggleModal}>
					<button type="button" className={style["button-close"]} onClick={toggleModal}>
							<TfiClose className={style.pic}/>
					</button>
				</Modal>)
	}
	if(searchPictures.length > 0){
		return (<>
				<ul className={style.imageGallery}>
						<ImageGalleryItem pictures={searchPictures} onOpen={toggleModal} getImage={getFullImage}/>
				</ul>
				{loader ? <Loader /> : <Button onClick={getNewPictures}/>}
		</>)
	}
};

ImageGallery.propTypes = {
	name: PropTypes.string.isRequired,
};
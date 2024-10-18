import './MainPage.css'
import { getBooks } from '../../redux/books';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IoMdStar } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const MainPage = () => {
    const products = useSelector(state => state.productsReducer.allProducts)
    const allProducts = products ? Object.values(products) : [];


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks())
        .then(()=> setIsLoaded(true));
    }, []);

    return isLoaded && (
        <div>
            Main Page
        </div>
    )
}

export default MainPage;

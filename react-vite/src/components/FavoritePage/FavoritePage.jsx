import './FavoritePage.css'
import { useParams } from 'react-router-dom';
import { getAllFavoritesThunk } from '../../redux/books';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../Card';

const FavoritePage = () => {
    const books = useSelector(state => state.bookState.favBooks)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFavoritesThunk())
        .then(()=> setIsLoaded(true));
    }, []);

    return isLoaded && (
            <div id='books-container'>
                {books.map(book =>
                {
                    return (
                        <div key={`${book.id}-${book.title}`} className='card-holder'>
                                <Card
                                id={book.id}
                                author={book.author}
                                cover={book.cover}
                                favBooks={book.fav_book_users}
                                posts={book.posts}
                                title={book.title}
                                ></Card>
                        </div>
                    )
                }
                )
                }

            </div>
    )
}

export default FavoritePage;

import './FavoritePage.css'
import { getAllFavoritesThunk } from '../../redux/books';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../Card';

const FavoritePage = () => {
    const books = useSelector(state => state.bookState.favBooks)
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllFavoritesThunk())
        .then(()=> setIsLoaded(true));
    }, [dispatch]);

    return isLoaded ? (
            <div id='books-container'>
                {books.map(book =>
                {
                    return (
                        book.fav_book_users.find(favUser => favUser.user_id === user.id) ?
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
                        :
                        null
                    )
                }
                )
                }

            </div>
    ) : <h1 className="loading">loading...</h1>
}

export default FavoritePage;

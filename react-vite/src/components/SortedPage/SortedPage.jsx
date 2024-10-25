import './SortedPage.css'
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../../redux/books';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../Card';

const SortedPage = () => {
    const { sorted_by } = useParams();
    const books = useSelector(state => state.bookState.books)
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBooksThunk())
        .then(()=> setIsLoaded(true));
    }, []);

    return isLoaded && (
            <div id='books-container'>
                {books.filter(book => {return book.genre_id === parseInt(sorted_by)}).map(book =>
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

export default SortedPage;

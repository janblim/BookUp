import "./BookPage.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBookByIdThunk } from "../../redux/books";

const BookPage = () => {
    const { book_id } = useParams();
    const book = useSelector(state => state.bookState.book)
    const user = useSelector(state => state.session.user)
    const favBooks = book.fav_book_users || []
    const posts = book.posts


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getBookByIdThunk(book_id))
            .then(() => setIsLoaded(true));
    }, [book_id, dispatch]);


    return isLoaded ? (
        <>
            <div id='book-info-container'>
                <div id='left-container'>
                    <img id='book-cover-img' src={book.cover} alt={book.title} />
                </div>
                <div id='right-container'>

                    { user ? <button> + Add Post</button> : null }

                    { user ?
                        favBooks.find( item => item.user_id === user.id) ?
                            <button> Remove Favorite <FaHeart/></button>
                        :
                            <button> Add to Favorite <FaRegHeart/></button>
                    : null
                    }


                    <span>{favBooks.length} <BsPersonHeart /></span>
                    <span>{Object.keys(posts).length} <BiConversation /></span>

                    <div id='book-texts'>
                        <h1 id='book-title'>{book.title}</h1>
                        <h4 id='book-author'>{book.author}</h4>
                        <p id='book-desc'>{book.description}</p>
                    </div>
                </div>
            </div>

            <div>

            </div>

        </>
    ) :
    (
            <h1 className="loading">loading...</h1>
    );
}


export default BookPage;

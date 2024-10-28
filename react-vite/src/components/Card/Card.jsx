import './Card.css'
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { addBookFavoriteThunk } from '../../redux/books';
import { getAllBooksThunk } from '../../redux/books';
import { deleteFavoriteThunk } from '../../redux/books';
import { getAllFavoritesThunk } from '../../redux/books';

const Card = ({cover, title, author, favBooks, posts, id}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const numFav = favBooks.length;
    const numPosts = posts.length;
    const user = useSelector(state => state.session.user);

    const goToBook = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0);
        navigate(`/books/${id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteFavoriteThunk(id))
        .then(dispatch(getAllBooksThunk()))
        .then(dispatch(getAllFavoritesThunk()))
    }

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addBookFavoriteThunk(id))
        .then(dispatch(getAllBooksThunk()))
    }

return (
    <div className='card' >

        <div className='cover-box' >
            <div id='info-box'>
                <div id='title'>{title}</div>
                <br></br>
                <div id='author'>{author}</div>
            </div>
        </div>

        <img className='cover-img' src={cover} alt={title} onClick={(e)=> goToBook(e,id)}/>

        <div id='forum-info'>

            <span className='data-box'>
                {numFav} <BsPersonHeart />
            </span>
            <span className='data-box'>
                {numPosts} <BiConversation />
            </span>

            {user && user.id ?

            favBooks.find( item => item.user_id === user.id) ?
                <span className='heart' onClick={(e) => handleDelete(e)}><FaHeart/></span>
                :
                <span className='heart' onClick={(e) => handleAdd(e)}><FaRegHeart/></span>

            : null }
        </div>
    </div>
)
}

export default Card;

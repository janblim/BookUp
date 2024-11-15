import "./BookPage.css"
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBookByIdThunk } from "../../redux/books";
import { deleteFavoriteThunk } from '../../redux/books';
import { addBookFavoriteThunk } from '../../redux/books';
import { deletePostUpThunk, getAllPostsThunk } from "../../redux/posts";
import { postUpThunk } from "../../redux/posts";
import DeleteBookModal from "../DeleteBookModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditBookModal from "../EditBookModal";
import AddPostModal from "../AddPostModal";

const BookPage = () => {
    const { book_id } = useParams();
    const book = useSelector(state => state.bookState.book)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postState.posts)
    const navigate = useNavigate()
    const favBooks = book.fav_book_users || []

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [favTrigger, setFavTrigger] = useState(false)

    const handleVote = (e, post_id, value) => {
        e.preventDefault();

        const post = posts.find(post => post.id === post_id)
        const currentValue = post.ups.find(up => up.user_id === user.id)?.value

        if(currentValue){ //if up entry found
            //already voted up
            if(value === 1 && currentValue === 1){ //if vote up again, delete
                dispatch(deletePostUpThunk(post_id, user.id))
            }
            if (value === 0 && currentValue === -1) {
                dispatch(deletePostUpThunk(post_id, user.id))
            }
            if (value === 0 && currentValue === 1){
                dispatch(postUpThunk(post_id, value))
            }
            if (value === 1 && currentValue === -1){

                dispatch(postUpThunk(post_id, value))
            }
        }
        else {
                dispatch(postUpThunk(post_id, value, user.id))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteFavoriteThunk(book_id))
        .then(() => setFavTrigger(favTrigger ? false : true));
    }

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addBookFavoriteThunk(book_id))
        .then(() => setFavTrigger(favTrigger ? false : true));
    }

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    const handlePostClick = (e, post_id) => {
        e.preventDefault();
        window.scrollTo(0, 0)
        navigate(`/post/${post_id}`)
    }

    useEffect(() => {
        dispatch(getBookByIdThunk(book_id))
            .then(() => dispatch(getAllPostsThunk(book_id)))
            .then(() => setIsLoaded(true));
    }, [book_id, dispatch, favTrigger]);

    return isLoaded && book ? (
        <div id='page-container'>
            <div id='book-info-container'>
                <div id='left-container'>
                    <img id='book-cover-img' src={book.cover} alt={book.title} />
                </div>
                <div id='right-container'>
                <div id='header'>
                    <div id='button-container'>

                        { user ? <OpenModalButton modalComponent={<AddPostModal/>} buttonText='+ Post'/> : null }

                        { user ?
                            favBooks.find( item => item.user_id === user.id) ?
                            <button onClick={(e) => handleDelete(e)}> Remove Favorite <FaHeart/></button>
                            :
                            <button onClick={(e) => handleAdd(e)}> Add to Favorite <FaRegHeart/></button>
                            : null
                        }

                        { user && user.id === book.user_id ?
                        <>
                        <OpenModalButton
                        modalComponent={<EditBookModal/>}
                        buttonText='Edit Book'
                        />
                        <OpenModalButton
                        modalComponent={<DeleteBookModal/>}
                        buttonText='Delete Book'
                        />
                        </>
                        : null}
                    </div>

                    <div id='stats'>
                        <span>{favBooks.length} <BsPersonHeart /></span>
                        <span>{Object.keys(posts).length} <BiConversation /></span>
                    </div>
                </div>


                    <div id='book-texts'>
                        <h1 id='book-title'>{book.title}</h1>
                        <h4 id='book-author'>{book.author}</h4>
                        <p id='book-desc'>{book.description}</p>
                    </div>
                </div>
            </div>




            <div className='posts-container'>

                { posts.length ?

                    posts.toReversed().map((post) => (

                        <div className='post-container' key={`${post.id}-${post.op_user.id}`}>
                            <div id='post-header'>
                            <img src={post.op_user.picture} alt={post.op_user.username} className='user-pic' onClick={(e)=> goToProfile(e, post.op_user.id)}/>

                            <div id='name-date-box'>
                                <span id='op-name'>{post.op_user.username}</span><span className='post-date'>{post.created_at}</span>
                            </div>
                            </div>
                            <div onClick={(e) => handlePostClick(e, post.id)}>
                                <div className='post-title-small'>{post.title}</div>
                                    <br></br>
                                <div className='post-text'>{post.text}</div>
                            </div>

                            <div className='post-button-box'>

                                {
                                user && user.id ?
                                    post.ups.find(up => up.user_id === user.id) ?

                                    <div className='post-button' id={post.ups.find(up => up.user_id === user.id)?.value > 0 ? 'voted-up-btn' : 'voted-down-btn'}>

                                        <span className='ar-filled' onClick={(e) => handleVote(e, post.id, 1)}><PiArrowFatUpFill />
                                        </span>
                                        &nbsp;
                                        <span>
                                            {post.ups.reduce((sum, up) => sum + up.value, 0)}
                                        </span>
                                        &nbsp;
                                        <span className='ar-filled' onClick={(e) => handleVote(e, post.id, 0)}><PiArrowFatDownFill /></span>

                                    </div>

                                    :

                                    <div className='post-button' id='vote-button'>

                                            <span className='up' onClick={(e) => handleVote(e, post.id, 1)}><PiArrowFatUp /></span>
                                        &nbsp;
                                            <span>
                                                {post.ups.reduce((sum, up) => sum + up.value, 0)}
                                            </span>
                                        &nbsp;
                                            <span className='down'><PiArrowFatDown onClick={(e) => handleVote(e, post.id, 0)}/></span>

                                    </div>

                                :

                                <span className='post-button'>{post.ups?.reduce((sum, up) => sum + up.value, 0)}</span>

                                }


                                <div className='post-button'>
                                    <span><IoChatboxOutline /></span>
                                    &nbsp;
                                    <span>{post.comments?.length}</span>
                                </div>

                            </div>
                        </div>

                    ))

                        :
                    <div className='no-post'>
                        No Posts Yet. Be the first to Post!
                    </div>
                }
            </div>
        </div>
    ) :
    (
            <h1 className="loading">loading...</h1>
    );
}


export default BookPage;

import "./BookPage.css"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";



import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBookByIdThunk } from "../../redux/books";
import { deletePostUpThunk, getAllPostsThunk } from "../../redux/posts";
import { postUpThunk } from "../../redux/posts";

const BookPage = () => {
    const { book_id } = useParams();
    const book = useSelector(state => state.bookState.book)
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.postState.posts)
    const favBooks = book.fav_book_users || []

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getBookByIdThunk(book_id))
            .then(() => dispatch(getAllPostsThunk(book_id)))
            .then(() => setIsLoaded(true));
    }, [book_id, dispatch]);

    const handleVote = (e, post_id, value) => {
        e.preventDefault();

        const post = posts.find(post => post.id === post_id)
        const currentValue = post.ups.find(up => up.user_id === user.id)?.value

        if(currentValue){ //if up entry found
            //already voted up
            if(value === 1 && currentValue === 1){ //if vote up again, delete
                console.log('Here at one')
                dispatch(deletePostUpThunk(post_id))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
            if (value === 0 && currentValue === -1) {
                console.log('Here at two')
                dispatch(deletePostUpThunk(post_id))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
            if (value === 0 && currentValue === 1){
                console.log('Here at three')
                dispatch(postUpThunk(post_id, value))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
            if (value === 1 && currentValue === -1){
                console.log('Here at four')
                dispatch(postUpThunk(post_id, value))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
        }
        else {
                console.log('Here at five')
                dispatch(postUpThunk(post_id, value))
                .then(() => dispatch(getAllPostsThunk(book_id)))
            }
    }


    return isLoaded ? (
        <div id='page-container'>
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




            <div className='posts-container'>

                { posts.length ?

                    posts.reverse().map(post => (

                        <div className='post-container'>
                            <div id='post-header'>
                            <img src={post.op_user.picture} alt={post.op_user.username} className='user-pic'/>

                            <div id='name-date-box'>
                                <span id='op-name'>{post.op_user.username}</span><span id='post-date'>{post.created_at}</span>
                            </div>
                            </div>

                            <div className='post-title'>{post.title}</div>
                                <br></br>
                            <div className='post-text'>{post.text}</div>

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

                                <span className='post-button'>{post.ups.reduce((sum, up) => sum + up.value, 0)}</span>

                                }


                                <div className='post-button'>
                                    <span><IoChatboxOutline /></span>
                                    &nbsp;
                                    <span>{post.comments.length}</span>
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

import './PostPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostThunk } from '../../redux/posts';
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";

const PostPage = () => {
    const { post_id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const post = useSelector(state => state.postState.post)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        dispatch(getPostThunk(post_id))
        .then(() => setIsLoaded(true));
    }, [dispatch, post_id]);

    return isLoaded ? (
        <div id='post-background'>
            <div id='post-container'>
                <div id='post-header-box'>
                    <div id='post-header'>
                        <div id='book-button'>
                            <img src={post.book.cover} alt={post.book.title}></img>
                        </div>
                        <div id='post-info-box'>
                            <div id='post-book-title-box'>
                                <div>{post.book.title}</div><div className='post-date'>&nbsp;•&nbsp;{post.created_at}</div>
                            </div>
                            <div id='op-box'>
                                <img className='user-pic' src={post.op_user.picture} alt={post.op_user.username}></img>
                                <span>
                                    {post.op_user.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button id='edit-post-button'>Edit Post</button>
                </div>
                <div id='post-title'>{post.title}</div>
                <div id='post-text'>{post.text}</div>
                <div className='post-button-box'>
                        {
                        user && user.id ?
                            post.ups.find(up => up.user_id === user.id) ?
                            <div className='post-button' id={post.ups.find(up => up.user_id === user.id)?.value > 0 ? 'voted-up-btn' : 'voted-down-btn'}>
                                <span className='ar-filled'><PiArrowFatUpFill />
                                </span>
                                &nbsp;
                                <span>
                                    {post.ups.reduce((sum, up) => sum + up.value, 0)}
                                </span>
                                &nbsp;
                                <span className='ar-filled'><PiArrowFatDownFill /></span>
                            </div>
                            :
                            <div className='post-button' id='vote-button'>
                                    <span className='up' ><PiArrowFatUp /></span>
                                &nbsp;
                                    <span>
                                        {post.ups.reduce((sum, up) => sum + up.value, 0)}
                                    </span>
                                &nbsp;
                                    <span className='down'><PiArrowFatDown /></span>
                            </div>

                        :
                        <span className='post-button'>{post.ups.reduce((sum, up) => sum + up.value, 0)}</span>
                        }
                        {user && user.id ? <div className='post-button' id='add-comment-button'>Comment</div> : null}
                </div>

            </div>

        <div id='comments-container'>

        { post.comments.length ?

            post.comments.map(comment => (

                <div id='comment-container' key={`${comment.id}`}>
                    <div id='comment-header'>
                    <img src={comment.user.picture} alt={comment.user.username} className='user-pic' onClick={(e)=> goToProfile(e, comment.user_id)}/>

                    <div id='name-date-box'>
                        <span id='op-name'>{comment.user.username}</span><span className='post-date'>{comment.created_at}</span>
                    </div>
                    </div>

                    <div className='comment-text'>{comment.text}</div>

                    <div className='comment-button-box'>
                        {
                        user && user.id ?
                            comment.ups.find(up => up.user_id === user.id) ?
                            <div className='comment-button' id={comment.ups.find(up => up.user_id === user.id)?.value > 0 ? 'voted-up-btn' : 'voted-down-btn'}>
                                <span className='ar-filled'><PiArrowFatUpFill />
                                </span>
                                &nbsp;
                                <span>
                                    {comment.ups.reduce((sum, up) => sum + up.value, 0)}
                                </span>
                                &nbsp;
                                <span className='ar-filled'><PiArrowFatDownFill /></span>
                            </div>
                            :
                            <div className='comment-button' id='vote-button'>
                                    <span className='up' ><PiArrowFatUp /></span>
                                &nbsp;
                                    <span>
                                        {comment.ups.reduce((sum, up) => sum + up.value, 0)}
                                    </span>
                                &nbsp;
                                    <span className='down'><PiArrowFatDown /></span>
                            </div>
                        :
                        <span className='comment-button'>{comment.ups.reduce((sum, up) => sum + up.value, 0)}</span>
                        }
                    </div>
                </div>

            ))

                :
            <div className='no-post'>
                No Comments Yet. Be the first to Comment!
            </div>
        }
        </div>
        </div>
    ) : <h1 className="loading">loading...</h1>
}

export default PostPage;

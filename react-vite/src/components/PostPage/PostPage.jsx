import './PostPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostThunk } from '../../redux/posts';
import { getCommentsThunk } from '../../redux/comments';

import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeletePostModal from '../DeletePostModal';
import CommentCard from '../CommentCard';


const PostPage = () => {
    const { post_id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const post = useSelector(state => state.postState.post)
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.commentState.comments)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        dispatch(getPostThunk(post_id))
        .then(() => dispatch(getCommentsThunk(post_id)))
        .then(() => setIsLoaded(true));
    }, [dispatch, post_id]);

    return isLoaded && post.book && user ? (
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
                                <img className='user-pic' src={post.op_user.picture} alt={post.op_user.username} onClick={(e)=> goToProfile(e, post.op_user.id)}></img>
                                <span>
                                    {post.op_user.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id='post-buttons'>
                        { user ? <button>+ Comment</button> : null}
                            &nbsp;
                        { user && user.id == post.user_id ?
                            <OpenModalButton
                            modalComponent={<DeletePostModal/>}
                            buttonText={'Delete'}
                            /> : null }
                            &nbsp;
                        { user && user.id == post.user_id ? <button>Edit</button> : null}
                    </div>
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
                        {user && user.id ?
                        <div className='post-button'>
                            <span><IoChatboxOutline /></span>
                            &nbsp;
                            <span>{post.comments?.length}</span>
                        </div> : null}

                </div>

                <div id='comments-container'>
                { comments.length ?
                        comments.map(comment => (
                            <div key={`${comment.id}-${comment.user.id}`}>
                                <CommentCard
                                    comment={comment}
                                ></CommentCard>
                            </div>
                        ))
                        :
                     <div className='no-comment'>
                             No Comments Yet. Be the first to Comment!
                    </div>
                }
                </div>

            </div>
        </div>
    ) : <h1 className="loading">loading...</h1>
}

export default PostPage;

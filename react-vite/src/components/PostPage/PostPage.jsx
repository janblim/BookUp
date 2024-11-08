import './PostPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostThunk } from '../../redux/posts';

const PostPage = () => {
    const { post_id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const post = useSelector(state => state.postState.post)
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
            </div>
        </div>
    ) : <h1 className="loading">loading...</h1>
}

export default PostPage;

import './PostPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFriendsThunk } from '../../redux/friends';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        dispatch(getFriendsThunk(user.id))
        .then(() => setIsLoaded(true));
    }, [dispatch, user.id]);

    return isLoaded ? (
            <div id='post-container'>

            </div>
    ) : <h1 className="loading">loading...</h1>
}

export default PostPage;

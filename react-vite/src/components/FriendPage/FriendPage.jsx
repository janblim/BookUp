import './FriendPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFriendsThunk } from '../../redux/friends';
import { useNavigate } from 'react-router-dom';

const FriendPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const friends = useSelector(state => state.friendState.friends)
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
    });

    return isLoaded ? (
            <div id='friends-container'>
                {friends.map((friend) =>
                {
                    return (
                        <div key={`${friend.id}-${friend.username}`} className='friend-holder'>
                            <div >
                                <img src={friend.picture} alt={friend.username}
                                className='friend-picture' onClick={(e)=> goToProfile(e, friend.id)}/>
                            </div>
                            <div className='username'>
                                {friend.username}
                            </div>
                        </div>
                    )
                }
                )
                }

            </div>
    ) : <h1 className="loading">loading...</h1>
}

export default FriendPage;

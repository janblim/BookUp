import './FriendPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFriendsThunk } from '../../redux/friends';

const FriendPage = () => {
    const books = useSelector(state => state.bookState.books)
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state => state.session.user)
    const friends = useSelector(state => state.friendState.friends)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsThunk())
        .then(() => setIsLoaded(true));
    }, []);

    return isLoaded && (
            <div id='friends-container'>
                {friends.map((friend) =>
                {
                    return (
                        <div key={`${friend.id}-${friend.username}`} className='friend-holder'>
                            <div >
                                <img src={friend.picture} alt={friend.username} className='friend-picture'/>
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
    )
}

export default FriendPage;

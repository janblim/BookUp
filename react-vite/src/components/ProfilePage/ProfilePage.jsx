import './ProfilePage.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFriendsThunk, getUserThunk, getFriendsThunk, addFriendThunk } from '../../redux/friends';
import { FaRegSmile } from "react-icons/fa";

const ProfilePage = () => {
    const {user_id} = useParams();
    const currentUser = useSelector(state => state.session.user)
    const currentFriends = useSelector(state => state.friendState.friends)
    const user = useSelector(state => state.friendState.user)
    const friends = useSelector(state => state.friendState.userFriends)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }
    const addFriend = (e, friend_id) => {
        e.preventDefault()
        dispatch(addFriendThunk(friend_id))
    }

    useEffect(() => {
        dispatch(getUserThunk(user_id))
        .then(() => {dispatch(getUserFriendsThunk(user_id))})
        .then(() => {dispatch(getFriendsThunk(currentUser.id))})
        .then(() => {setIsLoaded(true)})
    }, [dispatch, currentUser.id, user_id])

return isLoaded && Array.isArray(friends) && Array.isArray(currentFriends) && user ? (
    <div id='profile-page' >
        <div id='profile-head'>
            <img src={user.picture} alt={user.username} id='profile-pic'/>
            <div>
                <div id='friend-name'>
                <h1>{user.username}</h1>
                {currentFriends?.find((friend) => friend.id === user.id) ?
                <span><FaRegSmile/></span>
                :
                currentUser.id === user.id ? null : <button onClick={(e) => addFriend(e, user.id)}>Add Friend</button>
                }
                </div>
                <br></br>
                <h3>{user.first_name} {user.last_name}</h3>
                <br></br>
                <br></br>

                <div id='friends-box'>
                    <span>{friends.length} friend{friends.length !== 1 ? 's' : null}</span>
                    <div id='friend-pic-container'>
                        {friends.map((friend) => {
                            return(
                                <div key={`${friend.id}-${friend.username}`}>
                                    <img src={friend.picture} alt={friend.username} onClick={(e)=> goToProfile(e, friend.id)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

        </div>


    </div>
)
:
<h1 className="loading">loading...</h1>
}

export default ProfilePage;

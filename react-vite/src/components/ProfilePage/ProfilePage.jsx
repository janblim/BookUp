import './ProfilePage.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getUserFriendsThunk, getUserThunk } from '../../redux/friends';



const ProfilePage = () => {
    const {user_id} = useParams();
    const user = useSelector(state => state.friendState.user)
    const current_user = useSelector(state => state.session.user)
    const friends = useSelector(state => state.friendState.userFriends)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        dispatch(getUserThunk(user_id))
        .then(() => {dispatch(getUserFriendsThunk(user_id))})
        .then(() => {setIsLoaded(true)})
    }, [dispatch, user_id])

return isLoaded && Array.isArray(friends) && user ? (
    <div id='profile-page' >
        <div id='profile-head'>
            <img src={user.picture} alt={user.username} id='profile-pic'/>
            <div>
                <h1>{user.username}</h1>
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

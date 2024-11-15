import './ProfilePage.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFriendsThunk, getUserThunk, getFriendsThunk, addFriendThunk} from '../../redux/friends';
import { postUpThunk, deletePostUpThunk } from '../../redux/posts';
import { FaRegSmile } from "react-icons/fa";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import DeleteFriendModal from '../DeleteFriendModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { getPostsByUserThunk } from '../../redux/posts';

const ProfilePage = () => {
    const {user_id} = useParams();
    const currentUser = useSelector(state => state.session.user)
    const currentFriends = useSelector(state => state.friendState.friends)
    const user = useSelector(state => state.friendState.user)
    const friends = useSelector(state => state.friendState.userFriends)
    const posts = useSelector(state => state.postState.posts)
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

    const handlePostClick = (e, post_id) => {
        e.preventDefault();
        window.scrollTo(0, 0)
        navigate(`/post/${post_id}`)
    }

    const handleVote = (e, post_id, value) => {
        e.preventDefault();

        const post = posts.find(post => post.id === post_id)
        const currentValue = post.ups.find(up => up.user_id === currentUser.id)?.value

        if(currentValue){ //if up entry found
            //already voted up
            if(value === 1 && currentValue === 1){ //if vote up again, delete
                dispatch(deletePostUpThunk(post_id, currentUser.id))
            }
            if (value === 0 && currentValue === -1) {
                dispatch(deletePostUpThunk(post_id, currentUser.id))
            }
            if (value === 0 && currentValue === 1){
                dispatch(postUpThunk(post_id, value))
            }
            if (value === 1 && currentValue === -1){

                dispatch(postUpThunk(post_id, value))
            }
        }
        else {
                dispatch(postUpThunk(post_id, value, currentUser.id))
                .then(() => dispatch(getPostsByUserThunk(user_id)))
            }
    }

    useEffect(() => {
        dispatch(getUserThunk(user_id))
        .then(() => {dispatch(getUserFriendsThunk(user_id))})
        .then(() => {dispatch(getPostsByUserThunk(user_id))})
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
                {currentFriends?.find((friend) => friend?.id === user.id) ?
                <span>
                    <OpenModalButton
                        modalComponent={<DeleteFriendModal friend={user}/>}
                        buttonText={<FaRegSmile/>}
                    />
                </span>
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
        <div id='user-posts-container'>
            <h2>{user.username}&apos;s Posts</h2>

            { posts.length ?
                posts.toReversed().map((post) => (
                    <div className='post-container' key={`${post.id}-${user.id}`}>
                        <div id='post-header'>
                        <img src={user.picture} alt={user.username} className='user-pic'/>

                        <div id='name-date-box'>
                            <span id='op-name'>{user.username}</span><span className='post-date'>{post.created_at}</span>
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
                                post.ups.find(up => up.user_id === currentUser.id) ?

                                <div className='post-button' id={post.ups.find(up => up.user_id === currentUser.id)?.value > 0 ? 'voted-up-btn' : 'voted-down-btn'}>

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
                        {user.username} Has No Posts Yet.
                    </div>
                }

        </div>

    </div>
)
:
<h1 className="loading">loading...</h1>
}

export default ProfilePage;

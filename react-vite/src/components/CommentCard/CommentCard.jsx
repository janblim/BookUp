import './CommentCard.css'
import { useNavigate } from 'react-router-dom';
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';


const CommentCard = ({comment}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    return (
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
        )
}

export default CommentCard;
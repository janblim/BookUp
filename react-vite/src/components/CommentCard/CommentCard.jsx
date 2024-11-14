import './CommentCard.css'
import { useNavigate } from 'react-router-dom';
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { commentUpThunk, deleteCommentUpThunk } from '../../redux/comments';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';


const CommentCard = ({comment}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const goToProfile = (e, id) => {
        e.stopPropagation();
        window.scrollTo(0, 0)
        navigate(`/profile/${id}`)
    }

    const handleVote = (e, comment_id, value) => {
        e.preventDefault();

        const currentValue = comment.ups.find(up => up.user_id === user.id)?.value

        if(currentValue){ //if up entry found
            //already voted up
            if(value === 1 && currentValue === 1){ //if vote up again, delete
                dispatch(deleteCommentUpThunk(comment_id, user.id))
            }
            if (value === 0 && currentValue === -1) {
                dispatch(deleteCommentUpThunk(comment_id, user.id))
            }
            if (value === 0 && currentValue === 1){
                dispatch(commentUpThunk(comment_id, value))
            }
            if (value === 1 && currentValue === -1){

                dispatch(commentUpThunk(comment_id, value))
            }
        }
        else {
                dispatch(commentUpThunk(comment_id, value, user.id))
            }
    }

    return (
        <div id='comment-container' key={`${comment.id}`}>
            <div id='comment-header'>
            <img src={comment.user.picture} alt={comment.user.username} className='user-pic' onClick={(e)=> goToProfile(e, comment.user_id)}/>

            <div id='name-date-box'>
                <span id='op-name'>{comment.user.username}</span>
                <span>
                    <span className='post-date'>{comment.created_at}</span>
                    <span id='comment-button-box'>
                        { user && comment.user.id === user.id ?
                        <OpenModalButton
                            modalComponent={<DeleteCommentModal comment={comment}/>}
                            buttonText={'Delete'}
                        /> : null }
                        { user && comment.user.id === user.id ? <button>Edit</button> : null }
                    </span>
                </span>
            </div>
            </div>

            <div className='comment-text'>{comment.text}</div>

            <div className='comment-button-box'>
                {
                user && user.id ?
                    comment.ups.find(up => up.user_id === user.id) ?
                    <div className='comment-button' id={comment.ups.find(up => up.user_id === user.id)?.value > 0 ? 'voted-up-btn' : 'voted-down-btn'}>
                        <span className='ar-filled' onClick={(e) => handleVote(e, comment.id, 1)}><PiArrowFatUpFill />
                        </span>
                        &nbsp;
                        <span>
                            {comment.ups.reduce((sum, up) => sum + up.value, 0)}
                        </span>
                        &nbsp;
                        <span className='ar-filled' onClick={(e) => handleVote(e, comment.id, 0)}><PiArrowFatDownFill /></span>
                    </div>
                    :
                    <div className='comment-button' id='vote-button'>
                            <span className='up' onClick={(e) => handleVote(e, comment.id, 1)}><PiArrowFatUp /></span>
                        &nbsp;
                            <span>
                                {comment.ups.reduce((sum, up) => sum + up.value, 0)}
                            </span>
                        &nbsp;
                            <span className='down' onClick={(e) => handleVote(e, comment.id, 0)}><PiArrowFatDown /></span>
                    </div>
                :
                <span className='comment-button'>{comment.ups.reduce((sum, up) => sum + up.value, 0)}</span>
                }
            </div>
        </div>
        )
}

export default CommentCard;

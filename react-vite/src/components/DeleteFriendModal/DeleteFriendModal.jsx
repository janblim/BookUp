import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteFriendModal.css";
import { deleteFriendThunk } from "../../redux/friends";

function DeleteFriendModal({friend}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteFriendThunk(friend.id))
    .then(() => closeModal())
  };
  const handleKeepFriend = async (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='delete-modal'>
      <h2>Are you sure you want to remove {friend.username} from friends?</h2>
    <div id="butt-box">
      <button id="keep-book" onClick={(e) => {handleKeepFriend(e)}}>Keep Friend</button>
      <button onClick={(e) => handleDelete(e)}>Remove Friend</button>
    </div>
    </div>
  );
}

export default DeleteFriendModal;

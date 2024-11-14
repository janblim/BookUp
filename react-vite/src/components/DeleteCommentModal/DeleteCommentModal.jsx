import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteCommentModal.css";
import { deleteCommentThunk } from "../../redux/comments";

function DeleteCommentModal({comment}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteCommentThunk(comment.id))
    .then(() => closeModal())
  };
  const handleKeepPost = async (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='delete-modal'>
      <h2>Are you sure you want to perminently delete this comment?</h2>
    <div id="butt-box">
      <button id="keep-book" onClick={(e) => {handleKeepPost(e)}}>Keep Comment</button>
      <button onClick={(e) => handleDelete(e)}>Delete Comment</button>
    </div>
    </div>
  );
}

export default DeleteCommentModal;

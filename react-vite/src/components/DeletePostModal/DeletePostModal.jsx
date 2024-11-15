import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeletePostModal.css";
import { useNavigate } from "react-router-dom";
import { deletePostThunk } from "../../redux/posts";

function DeletePostModal() {
  const book = useSelector(state => state.bookState.book)
  const post = useSelector(state => state.postState.post)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deletePostThunk(post.id))
    .then(() => navigate(`/books/${book.id}`))
    .then(() => closeModal())
  };
  const handleKeepPost = async (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='delete-modal'>
      <h2>Are you sure you want to perminently delete this post and all associated comments?</h2>
    <div id="butt-box">
      <button id="keep-book" onClick={(e) => {handleKeepPost(e)}}>Keep Post</button>
      <button onClick={(e) => handleDelete(e)}>Delete Post</button>
    </div>
    </div>
  );
}

export default DeletePostModal;

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteBookModal.css";
import { deleteBookThunk } from "../../redux/books";
import { useNavigate } from "react-router-dom";

function DeleteBookModal() {
  const book = useSelector(state => state.bookState.book)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteBookThunk(book.id))
    .then(() => closeModal())
    .then(() => navigate('/'))
  };
  const handleKeepBook = async (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <div id='delete-modal'>
      <h2>Are you sure you want to perminently delete this book and all associated posts and comments?</h2>
    <div id="butt-box">
      <button id="keep-book" onClick={(e) => {handleKeepBook(e)}}>Keep Book</button>
      <button onClick={(e) => handleDelete(e)}>Delete Book</button>
    </div>
    </div>
  );
}

export default DeleteBookModal;

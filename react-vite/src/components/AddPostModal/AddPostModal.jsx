import "./AddPostModal.css"
import { useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useModal } from "../../context/Modal";
import { addPostThunk } from "../../redux/posts";

function AddPostModal() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState('');
    const book = useSelector(state => state.bookState.book)

    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const validateData = () => {
        const err ={}
        if(title.length > 100) err['title'] = 'Title must be shorter than 100 characters'
        if(title.length < 2) err['title'] = 'Title must be longer than 2 characters'
        if(text.length > 1000) err['text'] = 'Post must be shorter than 1000 characters'
        if (text.length < 2) err['text'] = 'Post must be longer than 2 characters'
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {

          dispatch(
            addPostThunk({
                title: title,
                text: text,
            }, book.id)
          )
          .then(() => {closeModal()})
          // .then(() => {window.scroll(0, 0)})
          }

        }

    return (
        <div className="new-book-modal">
        <h1>Create New Post</h1>
        {errors.server && <p className='error'>{errors.server}</p>}
        <form onSubmit={handleSubmit} className="new-book-form">

          <h2>Title</h2>
          {errors.title && <p className='error'>{errors.title}</p>}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              />

          {errors.text && <p className='error'>{errors.text}</p>}
            <textarea
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              ></textarea>

          <div>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    )
}

export default AddPostModal

import "./AddCommentModal.css"
import { useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useModal } from "../../context/Modal";
import { addCommentThunk } from "../../redux/comments";

function AddCommentModal() {
    const [text, setText] = useState('');
    const post = useSelector(state => state.postState.post)
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const validateData = () => {
        const err ={}
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
            addCommentThunk({
                text: text,
            }, post.id)
          )
          .then(() => {closeModal()})
          }
        }

    return (
        <div className="new-book-modal">
        <h1>New Comment</h1>
        {errors.server && <p className='error'>{errors.server}</p>}
        <form onSubmit={handleSubmit} className="new-book-form">
          {errors.text && <p className='error'>{errors.text}</p>}
            <textarea
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              ></textarea>
          <div>
            <button type="submit">Add Comment</button>
          </div>
        </form>
      </div>
    )
}

export default AddCommentModal

import "./EditCommentModal.css"
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../redux/comments";

function EditCommentModal({comment}) {
    const [text, setText] = useState("");

    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const validateData = () => {
        const err ={}
        if(text.length < 4) err["text"] = "Text must be longer than 2 characters"
        if(text.length > 500) err['text'] = "Text must be shorter than 500 characters"
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {
          dispatch(
            editCommentThunk({
                text: text,
            }, comment.id)
          ).then(() => {closeModal()})
          }
      }

    useEffect(() => { //sets fields
      if (comment){
        setText(comment.text || '');
      }
    }, [comment])

    return (
        <div className="new-book-modal">
        <h1>Edit Comment</h1>
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
            <button type="submit">Save Comment</button>
          </div>
        </form>
      </div>
    )
}

export default EditCommentModal

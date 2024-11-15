import "./EditPostModal.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editPostThunk } from "../../redux/posts";

function EditPostModal() {
    const post = useSelector(state => state.postState.post)
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const validateData = () => {
        const err ={}
        if(text.length < 4) err["text"] = "Text must be longer than 2 characters"
        if(text.length > 500) err['text'] = "Text must be shorter than 500 characters"
        if(title.length > 100) err['title'] = 'Title must be shorter than 100 characters'
        if(title.length < 2) err['author'] = 'Title must be longer than 2 characters'
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {
          dispatch(
            editPostThunk({
                title: title,
                text: text,
            }, post.id)
          ).then(() => {closeModal()})
          }
      }

    useEffect(() => { //sets fields
      if (post){
        setTitle(post.title || '');
        setText(post.text || '');
      }
    }, [post])

    return (
        <div className="new-book-modal">
        <h1>Edit Post</h1>
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
          <h2>Text</h2>
          {errors.text && <p className='error'>{errors.text}</p>}
            <textarea
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              ></textarea>
          <div>
            <button type="submit">Save Post</button>
          </div>
        </form>
      </div>
    )
}

export default EditPostModal

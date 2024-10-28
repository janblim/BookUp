import "./CreateBookModal.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { addBookThunk } from "../../redux/books";
import { getAllPostsThunk } from "../../redux/posts"

function CreateBookModal() {
    const user = useSelector( state => state.session.user);
    const book = useSelector( state => state.bookState.book)
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genreId, setGenreId] = useState("");
    const [cover, setCover] = useState("");
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const validateData = () => {
        const err ={}
        if(description.length < 4) err["description"] = "Description must be longer than 4 characters"
        if(description.length > 500) err['description'] = "Description must be shorter than 500 characters"
        if(title.length > 100) err['title'] = 'Title must be shorter than 100 characters'
        if(author.length > 50) err['author'] = 'Author name must be shorter than 50 characters'
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {

          dispatch(
            addBookThunk({
                title: title,
                author: author,
                amazon: "url",
                description: description,
                genre_id: genreId,
                cover: cover
            })
          )
          .then(() => {dispatch(getAllPostsThunk(book.id))})
          .then(() => {closeModal()})
          .then(() => {navigate(`/books/${book.id}`)})
          }

        }

    return (
        <div className="new-book-modal">
        <h1>Create New Book</h1>
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

          <h2>Author</h2>
          {errors.author && <p className='error'>{errors.author}</p>}
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              />


          <h2>Description of Book</h2>
          <p>What is this book about? Please write 1-2 paragraphs.</p>
          {errors.description && <p className='error'>{errors.description}</p>}
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              ></textarea>

          <h2>Genre</h2>
          {errors.address && <p className='error'>{errors.address}</p>}
            <select id='genre' value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
                <option value=''>--Please choose an option</option>
                <option value='1'>Fiction</option>
                <option value='2'>Science Fiction</option>
                <option value='3'>History</option>
                <option value='4'>Philosophy</option>
                <option value='5'>Self Help</option>
                <option value='6'>Psychology</option>
                <option value='7'>Feminism</option>
                <option value='8'>Science</option>
            </select>


          <h2>Cover</h2>
          <p>Please add a link to the image of the book cover.</p>
          {errors.cover && <p className='error'>{errors.cover}</p>}
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              required
              />


          <div>
            <button type="submit">Create Book</button>
          </div>
        </form>
      </div>
    )
}

export default CreateBookModal

import "./EditBookModal.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { editBookThunk } from "../../redux/books";
import { getAllPostsThunk } from "../../redux/posts"

function EditBookModal() {
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

    function isValidUrl(string) {
      try {
          new URL(string);
          return true;
      } catch (error) {
          return false;
      }
    }
    const validateData = () => {
        const err ={}
        if(description.length < 4) err["description"] = "Description must be longer than 4 characters"
        if(description.length > 2000) err['description'] = "Description must be shorter than 500 characters"
        if(title.length > 100) err['title'] = 'Title must be shorter than 100 characters'
        if(author.length > 50) err['author'] = 'Author name must be shorter than 50 characters'
        if(isValidUrl(cover) === false) err['cover'] = 'Please enter a valid URL'
        setErrors(err)
        if(Object.values(err).length){
            return false
        } else return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateData()) {

          dispatch(
            editBookThunk({
                title: title,
                author: author,
                amazon: "url",
                description: description,
                genre_id: genreId,
                cover: cover
            }, book.id)
          ).then(() => {dispatch(getAllPostsThunk(book.id))})
          .then(() => {closeModal()})
          .then(() => {navigate(`/books/${book.id}`)})
          }


      }

    useEffect(() => {
      if (book){
        setTitle(book.title || '');
        setAuthor(book.author || '');
        setDescription(book.description|| '');
        setGenreId(book.genre_id || '');
        setCover(book.cover || '');
      }
    }, [book])

    return (
        <div className="new-book-modal">
        <h1>Edit Book</h1>
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


          <h2>Edit Description of Book</h2>
          <p>What is this book about? Please write 1-2 paragraphs.</p>
          {errors.description && <p className='error'>{errors.description}</p>}
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              ></textarea>

          <h2>Genre</h2>
          {errors.genre_id && <p className='error'>{errors.genre_id}</p>}
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
          <p>Link to the image of the book cover.</p>
          {errors.cover && <p className='error'>{errors.cover}</p>}
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              required
              />


          <div>
            <button type="submit">Save Book</button>
          </div>
        </form>
      </div>
    )
}

export default EditBookModal

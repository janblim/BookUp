import './Card.css'
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";




const Card = ({cover, title, author, favBooks, posts, id}) => {

    const navigate = useNavigate();
    const numFav = favBooks.length;
    const numPosts = posts.length


    const goToBook = (e, id) => {
        e.stopPropagation();
        navigate('/')
    }

return (
    <div className='card' onClick={(e)=> goToBook(e,id)}>
        <div className='cover-box'>
            <img className='cover-img' src={cover} alt={title} />
        </div>
        <span>
            {numFav} <BsPersonHeart />
        </span>
        <span>
            {numPosts} <BiConversation />
        </span>

    </div>
)
}

export default Card;

import './Card.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsPersonHeart } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { useSelector } from 'react-redux';




const Card = ({cover, title, author, favBooks, posts, id}) => {

    const navigate = useNavigate();
    const numFav = favBooks.length;
    const numPosts = posts.length;
    const user = useSelector(state => state.session.user);

    const goToBook = (e, id) => {
        e.stopPropagation();
        navigate(`/books/${id}`)
    }

    const handleDelete = (e) => {
        e.preventDefault();
    }

    const handleAdd = (e) => {
        e.preventDefault()
    }


return (
    <div className='card' >

        <div className='cover-box' >
            <div id='info-box'>
                <div id='title'>{title}</div>
                <br></br>
                <div id='author'>{author}</div>
            </div>
        </div>

        <img className='cover-img' src={cover} alt={title} onClick={(e)=> goToBook(e,id)}/>

        <div id='forum-info'>

            <span className='data-box'>
                {numFav} <BsPersonHeart />
            </span>
            <span className='data-box'>
                {numPosts} <BiConversation />
            </span>

            {user && user.id ?

            favBooks.find( item => item.user_id === user.id) ?
                <span className='heart'><FaHeart/></span>
                :
                <span className='heart'><FaRegHeart/></span>

            : null }
        </div>
    </div>
)
}

export default Card;

import { csrfFetch } from './csrf'

//Action types
const GET_POSTS = 'posts/getAllById'


//Action creators
const getAllPosts = (posts) => ({
    type: GET_POSTS,
    posts
})




//Thunks

//get all posts with user info (picture and user name)

export const getAllPostsThunk = (book_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${book_id}`)

    if(res.ok){
        const posts = await res.json()
        dispatch(getAllPosts(posts))
        return posts
    }
    return res
}

// export const getAllFavoritesThunk = () => async(dispatch) => {
//     const res = await csrfFetch('/api/favorites/current')

//     if(res.ok){
//         const favorites = await res.json()
//         dispatch(getAllFavorites(favorites))
//         return favorites
//     }
//     return res
// }

// export const getBookByIdThunk = (book_id) => async(dispatch) => {
//     const res = await csrfFetch(`/api/books/${book_id}`)
//     if(res.ok){
//         const book = await res.json()
//         dispatch(getBookById(book))
//         return book
//     }
//     return res
// }

// export const addBookFavoriteThunk = (book_id) => async(dispatch) => {
//     const res = await csrfFetch(`/api/books/favorites/${book_id}`, {
//         method: 'POST',
//         body: JSON.stringify({})
//     })
//     if(res.ok){
//         const favorite = await res.json()
//         dispatch(addBookFavorite(favorite))
//         return favorite
//     }
//     return res.errors
// }

// export const deleteFavoriteThunk = (fav_id) => async(dispatch) => {
//     const res = await csrfFetch(`/api/favorites/${fav_id}`, {
//         method: 'DELETE',
//     })

//     if(res.ok){
//         const data = await res.json()
//         dispatch(deleteFavorite(fav_id))
//         return data
//     }
//     return res
// }

//Initial state
const initialState = {
    posts: {},
    post: {}
}

function postsReducer(state = initialState, action){
    let new_state;
    switch(action.type){
        case GET_POSTS: {
            new_state = {...state}
            new_state.posts = action.posts.Posts
            console.log(new_state)
            return new_state
        }
        // case GET_BOOK_BY_ID: {
        //     new_state = {...state}
        //     new_state.book = action.book.Book
        //     console.log(new_state)
        //     return new_state
        // }
        // case GET_FAVORITES: {
        //     new_state = {...state}
        //     new_state.favBooks = action.favorites.FavBooks
        //     console.log(new_state)
        //     return new_state
        // }
        // case ADD_BOOK_FAV: {
        //     new_state = structuredClone(state)
        //     new_state['favBooks'][action.favorite.fav.id] = action.favorite.fav
        //     console.log(new_state)
        //     return new_state
        // }
        // case DELETE_FAV: {
        //     new_state = structuredClone(state)
        //     delete new_state['favBooks'][action.fav_id]
        //     console.log(new_state)
        //     return new_state
        // }
    default:
        return state;
    }
}

export default postsReducer

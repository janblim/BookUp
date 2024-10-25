import { csrfFetch } from './csrf'

//Action types
const GET_BOOKS = 'books/getAll'
const GET_FAVORITES = 'books/favorites'
const GET_BOOK_BY_ID = 'books/byId'
const ADD_BOOK_FAV = 'favorites/bookId'

//Action creators
const getAllBooks = (books) => ({
    type: GET_BOOKS,
    books
})

const getAllFavorites = (favorites) => ({
    type: GET_FAVORITES,
    favorites
})

const getBookById = (book) => ({
    type: GET_BOOK_BY_ID,
    book
})
const addBookFavorite = (favorite) => ({
    type: ADD_BOOK_FAV,
    favorite
})

//Thunks

export const getAllBooksThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/books')

    if(res.ok){
        const books = await res.json()

        dispatch(getAllBooks(books))
        return books
    }
    return res
}

export const getAllFavoritesThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/favorites/current')

    if(res.ok){
        const favorites = await res.json()
        dispatch(getAllFavorites(favorites))
        return favorites
    }
    return res
}

export const getBookByIdThunk = (book_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/books/${book_id}`)
    if(res.ok){
        const book = await res.json()
        dispatch(getBookById(book))
        return book
    }
    return res
}

export const addBookFavoriteThunk = (book_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/books/favorites/${book_id}`, {
        method: 'POST',
        body: JSON.stringify({})
    })
    if(res.ok){
        const favorite = await res.json()
        dispatch(addBookFavorite(favorite))
        return favorite
    }
    return res.errors
}

//Initial state
const initialState = {
    books: {},
    book: {},
    favBooks: {}
}

function booksReducer(state = initialState, action){
    let new_state;
    switch(action.type){
        case GET_BOOKS: {
            new_state = {...state}
            new_state.books = action.books.Books
            console.log(new_state)
            return new_state
        }
        case GET_BOOK_BY_ID: {
            new_state = {...state}
            new_state.book = action.book.Book
            console.log(new_state)
            return new_state
        }
        case GET_FAVORITES: {
            new_state = {...state}
            new_state.favBooks = action.favorites.FavBooks
            console.log(new_state)
            return new_state
        }
        case ADD_BOOK_FAV: {
            new_state = structuredClone(state)
            return new_state
        }
    default:
        return state;
    }
}

export default booksReducer

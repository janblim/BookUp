import { csrfFetch } from './csrf'

//Action types
const GET_BOOKS = 'books/getAll'

//Action creators
const getAllBooks = (books) => ({
    type: GET_BOOKS,
    books
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

//Initial state
const initialState = {
    books: {}
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
    default:
        return state;
    }
}

export default booksReducer

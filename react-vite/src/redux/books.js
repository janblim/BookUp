import { csrfFetch } from './csrf'

//Action types
const GET_BOOKS = 'books/getAll'
const GET_BOOK_BY_ID = 'books/byId'

//Action creators
const getAllBooks = (books) => ({
    type: GET_BOOKS,
    books
})
const getBookById = (book) => ({
    type: GET_BOOK_BY_ID,
    book
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

export const getBookByIdThunk = (book_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/books/${book_id}`)
    if(res.ok){
        const book = await res.json()
        dispatch(getBookById(book))
        return book
    }
    return res
}

//Initial state
const initialState = {
    books: {},
    book: {}
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
    default:
        return state;
    }
}

export default booksReducer

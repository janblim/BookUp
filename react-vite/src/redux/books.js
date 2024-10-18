import { csrfFetch } from './csrf'

//Action types
const GET_BOOKS = 'books/getAll'

//Action creators
const getAllBooks = (books) => ({
    type: GET_BOOKS,
    payload: books
})

//Thunks

export const getAllBooksThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/books')
}

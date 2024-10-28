import { csrfFetch } from './csrf'

//Action types
const GET_BOOKS = 'books/getAll'
const GET_FAVORITES = 'books/favorites'
const GET_BOOK_BY_ID = 'books/byId'
const ADD_BOOK_FAV = 'favorites/bookId'
const DELETE_FAV = 'favorites/delete'
const ADD_BOOK = 'books/new'
const DELETE_BOOK = 'books/delete'
const EDIT_BOOK = 'books/edit'

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
const deleteFavorite = (book_id) => ({
    type: DELETE_FAV,
    book_id
})
const addBook = (book) => ({
    type: ADD_BOOK,
    book
})
const deleteBook = (book_id) => ({
    type: DELETE_BOOK,
    book_id
})
const editBook = (book) => ({
    type: EDIT_BOOK,
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

export const deleteFavoriteThunk = (fav_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/favorites/${fav_id}`, {
        method: 'DELETE',
    })

    if(res.ok){
        const data = await res.json()
        dispatch(deleteFavorite(fav_id))
        return data
    }
    return res
}

export const addBookThunk = (book) => async(dispatch) => {
    console.log(book)
    const res = await csrfFetch(`/api/books/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });

    if(res.ok){
        const data = await res.json()
        dispatch(addBook(data));
        return data;

    } else if (res.status < 500) {
        const errorMessages = await res.json();
        return errorMessages
      } else {
        return { server: "Something went wrong. Please try again" }
      }
}

export const deleteBookThunk = (book_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/books/${book_id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteBook(book_id))
        return res
    }
}

export const editBookThunk = (book, book_id) => async (dispatch) => {
    let res;

    let newBook = {
        title: book.title,
        author: book.author,
        amazon: book.amazon,
        description: book.description,
        genre_id: book.genre_id,
        cover: book.cover
    };

    try {
        res = await csrfFetch(`/api/books/${book_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        });
    } catch (error) {
        return await error.json();
    }

    if (res.ok) {
        const editedBook = await res.json();
        dispatch(editBook(editedBook));
        return editedBook;
    } else {
        return res
    }
};

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
            new_state['favBooks'][action.favorite.fav.id] = action.favorite.fav
            console.log(new_state)
            return new_state
        }
        case DELETE_FAV: {
            new_state = structuredClone(state)
            delete new_state['favBooks'][action.fav_id]
            console.log(new_state)
            return new_state
        }
        case ADD_BOOK: {
            new_state = structuredClone(state)
            new_state.book = action.book.book
            return new_state
        }
        case DELETE_BOOK: {
            new_state = {...state}
            new_state.book = {}
            return new_state
        }
        case EDIT_BOOK: {
            new_state = structuredClone(state)
            new_state.book = action.book.book
            return new_state
        }
    default:
        return state;
    }
}

export default booksReducer

import { csrfFetch } from './csrf'

//Action types
const GET_COMMENTS = 'comments/getByPostId'
const GET_USER_COMMENTS = 'comments/getById'
const COMMENT_UP = 'comments/up'
const DELETE_COMMENT_UP = 'comments/up/delete'
const ADD_COMMENT = 'comments/add'
const DELETE_COMMENT = 'comments/delete'

//Action creators
const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

const getUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    comments
})

const commentUp = (comment) => ({
    type: COMMENT_UP,
    comment
})

const deleteCommentUp = (comment) => ({
    type: DELETE_COMMENT_UP,
    comment
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const deleteComment = (comment_id) => ({
    type: DELETE_COMMENT,
    comment_id
})

//Thunks

//get all comments by post id
export const getCommentsThunk = (post_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${post_id}`)

    if(res.ok){
        const comments = await res.json()
        dispatch(getComments(comments))
        return comments
    }
    return res
}

export const addCommentThunk = (comment, post_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/new/${post_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    });

    if(res.ok){
        const newComment = await res.json()
        dispatch(addComment(newComment));
        return newComment;
    } else if (res.status < 500){
        const errorMessages = await res.json();
        return errorMessages
    } else {
        return { server: 'Something went wrong. Please try again'}
    }
}

//Initial state
const initialState = {
    comments: {},
    comment: {}
}

function commentsReducer(state = initialState, action){
    let new_state;
    switch(action.type){
        case GET_COMMENTS: {
            new_state = {...state}
            new_state.comments = action.comments.comments
            console.log(new_state)
            return new_state
        }
        case ADD_COMMENT: {
            new_state = structuredClone(state)
            new_state.comments.push(action.comment.comment)
            console.log(new_state)
            return new_state
        }
    default:
        return state;
    }
}

export default commentsReducer

import { csrfFetch } from './csrf'

//Action types
const GET_COMMENTS = 'comments/getByPostId'
const COMMENT_UP = 'comments/up'
const DELETE_COMMENT_UP = 'comments/up/delete'
const ADD_COMMENT = 'comments/add'
const DELETE_COMMENT = 'comments/delete'
const EDIT_COMMENT = 'comments/edit'

//Action creators
const getComments = (comments) => ({
    type: GET_COMMENTS,
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

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
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

export const commentUpThunk = (comment_id, value) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment_id}/up/${value}`, {
        method: 'POST',
        body: JSON.stringify({})
    })
    if(res.ok){
        const comment = await res.json()
        dispatch(commentUp(comment))
        return comment
    }
    return res.errors
}

export const deleteCommentUpThunk = (comment_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment_id}/up/delete`, {
        method: 'DELETE'
    })

    if(res.ok){
        const comment = await res.json()
        dispatch(deleteCommentUp(comment))
        return comment
    }
    return res
}

export const deleteCommentThunk = (comment_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment_id}`, {
        method: 'DELETE'
    })

    if (res.ok){
        dispatch(deleteComment(comment_id))
        return res
    }
}
export const editCommentThunk = (comment, comment_id) => async (dispatch) => {
    let res;

    let newComment = {
        text: comment.text,
    };

    try {
        res = await csrfFetch(`/api/comments/${comment_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        });
    } catch (error) {
        return await error.json();
    }

    if (res.ok) {
        const editedComment = await res.json();
        dispatch(editComment(editedComment));
        return editedComment;
    } else {
        return res
    }
};

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
        case COMMENT_UP: {
            new_state = structuredClone(state)
            Object.keys(new_state.comment).length ? new_state.comment.ups = action.comment.comment.ups : null //checks if post is empty first, if not updates ups
            Object.keys(new_state.comments).length ? new_state.comments[new_state.comments.map(e => e.id).indexOf(action.comment.comment.id)].ups = action.comment.comment.ups : null
            console.log(new_state)
            return new_state
        }
        case DELETE_COMMENT_UP: {
            new_state = structuredClone(state)
            Object.keys(new_state.comment).length ? new_state.comment.ups = action.comment.comment.ups : null //checks if post is empty first, if not updates ups
            Object.keys(new_state.comments).length ? new_state.comments[new_state.comments.map(e => e.id).indexOf(action.comment.comment.id)].ups = action.comment.comment.ups : null
            console.log(new_state)
            return new_state
        }
        case DELETE_COMMENT: {
            new_state = structuredClone(state)
            delete new_state.comments[new_state.comments.map(e => e.id).indexOf(action.comment_id)] //deletes where index is object with id of comment_id
            return new_state
        }
        case EDIT_COMMENT: {
            new_state = structuredClone(state)
            new_state.comments[new_state.comments.map(e => e.id).indexOf(action.comment.comment.id)].title = action.comment.comment.title
            new_state.comments[new_state.comments.map(e => e.id).indexOf(action.comment.comment.id)].text = action.comment.comment.text
            return new_state
        }
    default:
        return state;
    }
}

export default commentsReducer

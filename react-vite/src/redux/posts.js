import { csrfFetch } from './csrf'

//Action types
const GET_POSTS = 'posts/getAllById'
const GET_POSTS_BY_USER = 'posts/getPostsByUser'
const POST_UP = 'posts/up'
const DELETE_POST_UP = 'posts/up/delete'
const GET_POST = 'posts/getPostById'
const ADD_POST = 'posts/addPostByBookId'
const DELETE_POST = 'posts/delete'
const EDIT_POST = 'posts/edit'


//Action creators
const getAllPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

const getPostByUser = (posts) =>({
    type: GET_POSTS_BY_USER,
    posts
})


const getPost = (post) => ({
    type: GET_POST,
    post
})

const postUp = (post) => ({
    type: POST_UP,
    post
})

const deletePostUp = (post) => ({
    type: DELETE_POST_UP,
    post
})

const addPost =  (post) => ({
    type: ADD_POST,
    post
})
const deletePost = (post_id) => ({
    type: DELETE_POST,
    post_id
})
const editPost = (post) => ({
    type: EDIT_POST,
    post
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

export const getPostsByUserThunk = (user_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/user/${user_id}`)

    if(res.ok){
        const posts = await res.json()
        dispatch(getPostByUser(posts))
        return posts
    }
    return res
}

export const getPostThunk = (post_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/post/${post_id}`)
    if(res.ok){
        const post = await res.json()
        dispatch(getPost(post))
        return post
    }
    return res
}

export const postUpThunk = (post_id, value) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${post_id}/up/${value}`, {
        method: 'POST',
        body: JSON.stringify({})
    })
    if(res.ok){
        const post = await res.json()
        dispatch(postUp(post))
        return post
    }
    return res.errors
}

export const deletePostUpThunk = (post_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${post_id}/up/delete`, {
        method: 'DELETE'
    })

    if(res.ok){
        const post = await res.json()
        dispatch(deletePostUp(post))
        return post
    }
    return res
}

export const addPostThunk = (post, book_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/new/${book_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    });

    if(res.ok){
        const newPost = await res.json()
        dispatch(addPost(newPost));
        return newPost;
    } else if (res.status < 500){
        const errorMessages = await res.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again"}
    }
}

export const deletePostThunk = (post_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    })

    if (res.ok){
        dispatch(deletePost(post_id))
        return res
    }
}

export const editPostThunk = (post, post_id) => async (dispatch) => {
    let res;

    let newPost = {
        title: post.title,
        text: post.text,
    };

    try {
        res = await csrfFetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });
    } catch (error) {
        return await error.json();
    }

    if (res.ok) {
        const editedPost = await res.json();
        dispatch(editPost(editedPost));
        return editedPost;
    } else {
        return res
    }
};

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
        case GET_POSTS_BY_USER: {
            new_state = {...state}
            new_state.posts = action.posts.posts
            console.log(new_state)
            return new_state
        }
        case POST_UP: {
            new_state = structuredClone(state)
            Object.keys(new_state.post).length ? new_state.post.ups = action.post.post.ups : null //checks if post is empty first, if not updates ups
            Object.keys(new_state.posts).length ? new_state.posts[new_state.posts.map(e => e.id).indexOf(action.post.post.id)].ups = action.post.post.ups : null
            console.log(new_state)
            return new_state
        }
        case DELETE_POST_UP: {
            new_state = structuredClone(state)
            Object.keys(new_state.post).length ? new_state.post.ups = action.post.post.ups : null //checks if post is empty first, if not updates ups
            Object.keys(new_state.posts).length ? new_state.posts[new_state.posts.map(e => e.id).indexOf(action.post.post.id)].ups = action.post.post.ups : null
            console.log(new_state)
            return new_state
        }
        case GET_POST: {
            new_state = {...state}
            new_state.post = action.post.Post
            console.log(new_state)
            return new_state
        }
        case ADD_POST: {
            new_state = structuredClone(state)
            new_state.posts.push(action.post.post)
            new_state.post = action.post.post
            console.log(new_state)
            return new_state
        }
        case DELETE_POST: {
            new_state = {...state}
            new_state.post = {}
            return new_state
        }
        case EDIT_POST: {
            new_state = structuredClone(state)
            new_state.post.text = action.post.post.text
            new_state.post.title = action.post.post.title
            return new_state
        }
    default:
        return state;
    }
}

export default postsReducer

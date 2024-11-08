import { csrfFetch } from './csrf'

//Action types
const GET_POSTS = 'posts/getAllById'
const POST_UP = 'posts/up'
const DELETE_POST_UP = 'posts/up/delete'
const GET_POST = 'posts/getPostById'


//Action creators
const getAllPosts = (posts) => ({
    type: GET_POSTS,
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
        case POST_UP: {
            new_state = structuredClone(state)
            new_state.posts[new_state.posts.map(e => e.id).indexOf(action.post.post.id)].ups = action.post.post.ups
            console.log(new_state)
            return new_state
        }
        case DELETE_POST_UP: {
            new_state = structuredClone(state)
            new_state.posts[new_state.posts.map(e => e.id).indexOf(action.post.post.id)].ups = action.post.post.ups
            console.log(new_state)
            return new_state
        }
        case GET_POST: {
            new_state = {...state}
            new_state.post = action.post.Post
            console.log(new_state)
            return new_state
        }

    default:
        return state;
    }
}

export default postsReducer

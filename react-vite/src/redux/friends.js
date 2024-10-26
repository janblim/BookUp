import { csrfFetch } from './csrf'

//Action types
const GET_FRIENDS = '/friends/current'
const ADD_FRIEND = '/friends/add'
const DELETE_FRIEND = '/friends/delete'

//Action creators
const getFriends = (friends) => ({
    type: GET_FRIENDS,
    friends
})
const addFriend = (friend) => ({
    type: ADD_FRIEND,
    friend
})

const deleteFriend = () => ({
    type: DELETE_FRIEND
})




//Thunks

export const getFriendsThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/friends/current')

    if(res.ok){
        const friends = await res.json()
        dispatch(getFriends(friends))
        return friends
    }
    return res
}

export const addFriendThunk = (friend_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/friends/add/${friend_id}`, {
        method: 'POST',
        body: JSON.stringify({})
    })
    if(res.ok){
        const friend = await res.json()
        dispatch(addFriend(friend))
        return friend
    }
    return res
}

export const deleteFriendThunk = (friend_id) => async(dispatch) => {
    const res = await csrfFetch(`/api/friends/delete/${friend_id}`, {
        method: 'DELETE',
    })

    if(res.ok){
        const data = await res.json()
        dispatch(deleteFriend(data))
        return data
    }
    return res
}

//Initial state
const initialState = {
    friends: {},
}

function friendsReducer(state = initialState, action){
    let new_state;
    switch(action.type){
        case GET_FRIENDS: {
            new_state = {...state}
            new_state.friends = action.friends.friends
            console.log(new_state)
            return new_state
        }

        case ADD_FRIEND: {
            new_state = structuredClone(state)
            new_state['favBooks'][action.favorite.fav.id] = action.favorite.fav
            console.log(new_state)
            return new_state
        }
        case DELETE_FRIEND: {
            new_state = structuredClone(state)
            delete new_state['favBooks'][action.fav_id]
            console.log(new_state)
            return new_state
        }
    default:
        return state;
    }
}

export default friendsReducer

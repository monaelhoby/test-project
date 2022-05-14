
export const initialState = {
    posts:   []
};

export const Reducer = (state , action) => {
    switch(action.type){
        case "GetPosts" :
            return action.payload
        case "AddPost" :
            return {...state, posts: state.posts.concat(action.payload)}
        // case "DeletePost":
        //     const remArray = state.posts.filter(post => post.id !== action.payload)
        //     return {...state, posts: remArray}
        case "EditPost" :
            const editPost = state.posts.find(post => post.id == action.id)
            editPost.id = action.payload.id
            editPost.title = action.payload.title
            editPost.body = action.payload.body
            // console.log({...state})
            return {...state, posts: state.posts}
    }
    return state
}
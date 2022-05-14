import { createContext, useEffect, useContext, useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import './App.css'

import { Reducer, initialState } from "./store/reducers/reducer";
import AllPosts from './pages/posts/allPosts'
import AddPost from './pages/admin/addPost'


export const theReducer = createContext()

const FetchPosts = () => {
  const {state, dispatch} = useContext(theReducer)
  const [comments, setComments] = useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method: "GET"
    }).then(res => res.json())
    .then(posts => {
      fetch('https://jsonplaceholder.typicode.com/comments',{
        method: "GET"
      }).then(res => res.json())
      .then((comments) => {
        dispatch({type: "GetPosts", payload: {posts: posts.splice(0,5), comments: comments.splice(0,20)}})
      })
    })
  }, [])
  return (
      <Routes>
        <Route path='/' exact element={<AllPosts />} />
        <Route path='/addPost' exact element={<AddPost />} />
        <Route path='/addPost/:id' exact element={<AddPost />} />
      </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <div className="App">
      <div className="container-fluid">
      <theReducer.Provider value={{state, dispatch}}>
        <Router >
            <FetchPosts/>
        </Router>
      </theReducer.Provider>
      </div>
    </div>
  );
}

export default App;

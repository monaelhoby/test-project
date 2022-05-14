import React, {useState,useRef, useContext, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom"

import Navbar from '../../components/navBar'
import {theReducer} from '../../App'

const Addform = () => {
  const {state, dispatch} = useContext(theReducer)
  const Navigate = useNavigate()
  const {id} = useParams()
  const title = useState('');
  const body = useRef('');


  const thePost = id ? state.posts.find(post => post.id == id) : null;

  useEffect(() => {
    if(thePost){
      title.current.value = thePost.title;
      body.current.value = thePost.body
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: thePost ? thePost.id : Math.random() *10,
      title: title.current.value,
      body: body.current.value
    };
    thePost ? dispatch({type: "EditPost", id: thePost.id, payload:data, posts: state.posts}) : dispatch({type: "AddPost", payload: data,posts: state.posts});
    title.current.value= null;
    body.current.value=null;
    Navigate('/')
  }

  return (
    <>
    <Navbar />
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input 
              type='text' 
              className='form-control' 
              id='title' 
              required 
              ref={title} 
              />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              className='form-control'
              id='Description'
              rows='3'
              required
              ref={body}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' >
            {thePost ? "Save Changes" : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Addform;


/** 
import React, {useState, useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom"

import Navbar from '../../components/navBar'
import {theReducer} from '../../App'

const Addform = () => {
  const {state, dispatch} = useContext(theReducer)
  const Navigate = useNavigate()
  const {id} = useParams()
  const thePost = id ? state.posts.find(post => post.id == id) : null;
  const [title, setTitle] = useState(thePost ? thePost.title : '');
  const [body, setBody] = useState(thePost ? thePost.body : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: thePost ? thePost.id : Math.random() *10,
      title,
      body
    };
    console.log(state.posts)
    dispatch({type: "AddPost", payload: data});
    thePost ? dispatch({type: "EditPost", id: thePost.id, payload:data}) : dispatch({type: "AddPost", payload: data});
    
    Navigate('/')
  }

  return (
    <>
    <Navbar />
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input 
              type='text' 
              className='form-control' 
              id='title' 
              required 
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              className='form-control'
              id='Description'
              rows='3'
              required
              value={body}
              onChange={e => setBody(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' >
            {thePost ? "Save Changes" : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Addform;
*/
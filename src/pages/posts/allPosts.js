import React, { Fragment, useEffect, useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"

import Navbar from '../../components/navBar'
import {theReducer} from '../../App'
import CommentImg from "../../images/comment.png"
import AvatarImg from "../../images/user.png"

const PostContainer = () => {
  const {state, dispatch} = useContext(theReducer)
  const [commentsWithPosts, setCommentsWithPosts] = useState([])
  const [theDeletedPost, setTheDeletedPost] = useState([])

  const Navigate = useNavigate()
  


  useEffect(() => {
      let arr =[];
      state.posts.forEach(post => {
        let postComments = [];
        let num = 0;
        if(state.comments){
          state.comments.forEach(comment => {
            if(comment.postId === post.id){
              postComments.push(comment)
              num +=1;
            }
          })
          return arr.push({id: post.id, post: post, num,comment:postComments})
        }else{
          return arr.push({id: post.id, post: post, num,comment:postComments})
        }
      })
      setCommentsWithPosts(arr)
  }, [])

  const deletePost = (e, id) => {
    e.preventDefault();
    const remArray = commentsWithPosts.filter(post => post.id !== id)
    setCommentsWithPosts(remArray)
    Navigate('/')
  }

  const EditPost = (e, id) => {
    e.preventDefault();
    Navigate('/addPost/'+id)
  }


  return (
    <Fragment>
     <Navbar />
      <div className='container allposts'>
        {
          commentsWithPosts.length>0 ? commentsWithPosts.map((post, index) => {
            return (
              <div key={index} className="card" >
                <div className="card-body">
                  <h5 className="card-title">{post.post.title}</h5>
                  <p className="card-text">{post.post.body}</p>
                  <h5>
                    <img src={CommentImg} width="30px" alt="image"/>
                    {post.num} Comments
                  </h5>
                  {
                    post.comment ? post.comment.map(comment => {
                      return (
                      <div className='comment-container' key={comment.id}>
                          <h5>{comment.name}</h5>
                          <div className='comment-body'>
                            <img src={AvatarImg} width="50px" alt="image" />
                            <span>{comment.body}</span>
                          </div>
                      </div>)
                    }) : null
                  }
                  <hr />
                  <div className='div-flex'>
                    <button className="btn btn-info" onClick={(e)=>EditPost(e, post.id)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={()=>setTheDeletedPost(post.id)}>
                      Remove
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Do you want to delete post?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>deletePost(e, theDeletedPost)}>Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )
          }) : (<h1 className='text-center'>Loading...</h1>)
        }
      </div>
    </Fragment>
  );
};

export default PostContainer;

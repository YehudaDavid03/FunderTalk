import React, { useState, useEffect } from "react"
import validPerson from "../assets/validPerson.png"
import axios from "axios"
import { hexColor } from "../components/HexColorsArray"

const PostsFeed = ({ searchReceived, userInfoReceived, postsRender, changeReload, changeAlert, curseWords, todaysDate }) => {
  const [showComments, setShowComments] = useState(null)
  const [newComment, setNewComment] = useState(null)

  const [postsRenderInstance, setPostsRenderInstance] = useState()
  const [filterPost, setFilterPost] = useState({
    filterPostCategory: "",
    filterPostDate: ""
  })

  // useEffect(() => {
  //   if (filterPost.filterPostCategory !== "") {
  //     setPostsRenderInstance(postsRender?.filter(item => item.postCategory.includes(filterPost.filterPostCategory)))
  //   } else { setPostsRenderInstance(postsRender) }

  // }, [filterPost.filterPostCategory, postsRender])

  useEffect(() => {
    setFilterPost({ filterPostCategory: "", filterPostDate: "" })
    setPostsRenderInstance(postsRender?.filter(item => item.postUserInfoUsername.includes(String(searchReceived)))) 
  }, [searchReceived])

  useEffect(() => {
    if (filterPost.filterPostDate !== "") {
      setPostsRenderInstance(postsRender?.filter(item => Math.ceil(Math.abs(new Date(item.postUploadDate) - new Date()) / (1000 * 60 * 60 * 24)) - 1 <= Number(filterPost.filterPostDate)))
    } else { setPostsRenderInstance(postsRender) }

  }, [filterPost.filterPostDate, postsRender])

  useEffect(() => {
    setPostsRenderInstance(postsRender)
  }, [postsRender])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: `https://funder-talk-server.herokuapp.com/api/posts-comments-create/${userInfoReceived.userToken}`,
      data: {
        replyDetails: newComment,
        updatePostId: showComments
      },
    })
    .then((response) => {
      setNewComment("")
      changeReload()
      changeAlert(true, "done", "#0F9D58", "Success!", response.data)

      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
    .catch((err) => {
      changeAlert(true, "error", "#DB4437", "Error!", err.response.data)
      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }

  const handleSubmitAddLike = (postId) => {
    axios({
      method: "post",
      url: `https://funder-talk-server.herokuapp.com/api/posts-likes-add/${userInfoReceived.userToken}`,
      data: {
        postId: postId
      },
    })
    .then((response) => {
      changeReload()
      changeAlert(true, "done", "#0F9D58", "Success!", response.data)

      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
    .catch((err) => {
      changeAlert(true, "error", "#DB4437", "Error!", err.response.data)
      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }

  const handleSubmitRemoveLike = (postId) => {
    axios({
      method: "delete",
      url: `https://funder-talk-server.herokuapp.com/api/posts-likes-remove/${userInfoReceived.userToken}`,
      data: {
        postId: postId
      },
    })
    .then((response) => {
      changeReload()
      changeAlert(true, "done", "#0F9D58", "Success!", response.data)

      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
    .catch((err) => {
      changeAlert(true, "error", "#DB4437", "Error!", err.response.data)
      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }

  const doesNotWork = () => {
    changeAlert(true, "error", "#DB4437", "Error!", "Function is not available at this time.")
    const timer = setTimeout(() => {
      changeAlert(false, null, null, null, null)
    }, 3000)
    return () => clearTimeout(timer)
  }

  return (
    <div className="posts-feed-main">
      <div className="posts-feed-main-filter">
        {/* <select type="text" name="filterPostCategory" value={filterPost.filterPostCategory} onChange={(e) => { setFilterPost({ filterPostCategory: e.target.value, filterPostDate: "" }) }} >
          <option value={""}>All Categories</option>
          <option value="deal bin">Deal Bin</option>
          <option value="merchant cash advance">Merchant Cash Advance</option>
          <option value="business loans">Business Loans</option>
          <option value="financial services">Financial Services</option>
          <option value="payment processing">Payment Processing</option>
          <option value="help wanted">Help Wanted</option>
          <option value="promotions">Promotions</option>
        </select> */}

        <select type="text" name="filterPostDate" value={filterPost.filterPostDate} onChange={(e) => { setFilterPost({ filterPostCategory: "", filterPostDate: e.target.value }) }} >
          <option value={""}>All Posts</option>
          <option value="1">Today</option>
          <option value="7">This Week</option>
          <option value="30">This Month</option>
          <option value="90">Last 3 Months</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last 365 days</option>
        </select>
      </div>

      {
        postsRenderInstance?.map((item) => {
          return (
            <div key={item._id} className="posts-feed-main-render">
              <div className="posts-feed-main-render-a">
                <img src={item.postUserInfoProfilePicture ? item.postUserInfoProfilePicture : validPerson } />

                <div>
                  <h1>{item.postUserInfoUsername}</h1>
                  <span>Posted On {item.postUploadDate}</span>
                </div>
              </div>

              <div className="posts-feed-main-render-b">
                <h1>{item.postTitle}</h1>
                <p>{item.postDetails}</p>
              </div>

              <div className="posts-feed-main-render-c">
                <h1>
                  {item.postLikes.includes(userInfoReceived._id) ? <span onClick={() => {handleSubmitRemoveLike(item._id)}} className="material-icons">thumb_up</span> : <span onClick={() => {handleSubmitAddLike(item._id)}} className="material-icons-outlined">thumb_up</span>}
                  {` ${item.postLikes.length} Like${item.postLikes.length == 1 ? "" : "s"}`}
                </h1>
                <h1>
                  <span className="material-icons-outlined">forum</span>
                  {` ${item.postReplies.length} Comment${item.postReplies.length == 1 ? "" : "s"}`} {showComments == null ? <span onClick={() => {setShowComments(item._id)}} className="material-icons">expand_more</span> : showComments !== item._id ? <span onClick={() => {setShowComments(item._id)}} className="material-icons">expand_more</span> : <span onClick={() => {setShowComments(null)}} className="material-icons">expand_less</span>}
                </h1>
                <h1 onClick={doesNotWork} ><span className="material-icons-outlined">polyline</span> Share</h1>
                <h1 onClick={doesNotWork} ><span className="material-icons">turned_in_not</span> Save</h1>
              </div>

              <>
                {
                  showComments == null

                  ?

                  (
                    <></>
                  )

                  :

                  (
                    item._id !== showComments

                    ?

                    (
                      <></>
                    )

                    :

                    (
                      <div className="posts-feed-main-comments">
                        {
                          item.postReplies?.map((element) => {
                            let finalColor = ""
                            for (let i = 0; i < hexColor.length; i++) {
                              if (hexColor[i].hexColorLetter == element.replyUserUsername[0].toLowerCase()) {
                                finalColor = hexColor[i].hexColorValue
                              } else {  }
                            }

                            return (
                              <div key={element._id} className="posts-feed-main-comments-render">
                                <div className="posts-feed-main-comments-render-a">
                                  <h1 style={{backgroundColor: finalColor}}>{element.replyUserUsername[0].toUpperCase()}</h1>

                                  <div>
                                    <h2>{element.replyUserUsername}</h2>
                                    <h3>Posted On {element.replyUploadDate}</h3>
                                  </div>
                                </div>

                                <p>{element.replyDetails}</p>
                                {/* <h4>
                                  {element.replyLikes.includes(userInfoReceived.userUsername) ? <span className="material-icons">thumb_up</span> : <span className="material-icons-outlined">thumb_up</span>}
                                  {` ${element.replyLikes.length} Likes`}
                                </h4> */}
                              </div>
                            )
                          })
                        }

                        {
                          userInfoReceived.userToken 

                          ? 

                          (
                            <>
                              <textarea
                                type="text" 
                                name="newCommentDetails" 
                                value={newComment}
                                onChange={(e) => {setNewComment(e.target.value)}}
                                placeholder="Leave a comment here..."
                              ></textarea>
                              <button onClick={handleSubmit} >Comment</button>
                            </>
                          )

                          :

                          (
                            <></>
                          )
                        }
                      </div>
                    )
                  )
                }
              </>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostsFeed

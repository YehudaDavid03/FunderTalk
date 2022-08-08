import React, { useState } from "react"
import Login from "../views/Login"
import validPerson from "../assets/validPerson.png"
import axios from "axios"
import { UserInfoEdit } from "../components/UserInfoEdit"

const UserSettings = ({ userInfoReceived, userInfoSendInterference, changeReload, changeAlert, curseWords }) => {
  const userInfoSend = (userInfoSend) => {
    userInfoSendInterference(userInfoSend)
  }
  
  const [newPost, setNewPost] = useState({
    newPostTitle: null,
    newPostDetails: null
  })

  const handleChange = (e) => {
    setNewPost({
      ...newPost, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: `https://funder-talk-server.herokuapp.com/api/posts-create/${userInfoReceived.userToken}`,
      data: {
        postTitle: newPost.newPostTitle,
        postDetails: newPost.newPostDetails,
        postCategory: [],
      },
    })
    .then((response) => {
      setNewPost({
        newPostTitle: "",
        newPostDetails: ""
      })

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

  // const isImage = (url) => {
  //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  // }

  const doesNotWork = () => {
    changeAlert(true, "error", "#DB4437", "Error!", "Function is not available at this time.")
    const timer = setTimeout(() => {
      changeAlert(false, null, null, null, null)
    }, 3000)
    return () => clearTimeout(timer)
  }

  return (
    <div>
      {
        userInfoReceived.userToken
        
        ?

        (
          <div className="user-settings-main">
            <div className="user-settings-main-settings">
              <img src={userInfoReceived.userProfilePicture ? userInfoReceived.userProfilePicture : validPerson} />

              <UserInfoEdit doesNotWork={doesNotWork} label={"First Name"} display={userInfoReceived.userFirstName}/>
              <UserInfoEdit doesNotWork={doesNotWork} label={"Last Name"} display={userInfoReceived.userLastName}/>
              <UserInfoEdit doesNotWork={doesNotWork} label={"Username"} display={userInfoReceived.userUsername}/>
              <UserInfoEdit doesNotWork={doesNotWork} label={"Email"} display={userInfoReceived.userEmail}/>
              
              <div onClick={doesNotWork}>
                <div>
                  <h1>Website:</h1>
                  <a href={userInfoReceived.userWebsite}>{userInfoReceived.userWebsite}</a>
                </div>

                <div>
                  <button>Edit</button>
                </div>
              </div>
            </div>

            <div className="user-settings-main-post-input">
              <p>Make a post</p>
              <input
                type="text" 
                name="newPostTitle" 
                value={newPost.newPostTitle}
                onChange={handleChange}
                placeholder="Post Title..."
              ></input>
              <textarea 
                type="text" 
                name="newPostDetails" 
                value={newPost.newPostDetails}
                onChange={handleChange}
                placeholder="Post Details..."
              ></textarea>
              <button onClick={handleSubmit}>Post</button>
            </div>
          </div>
        )

        :

        (
          <Login doesNotWork={doesNotWork} userInfoSend={userInfoSend} changeAlert={changeAlert} />
        )
      }
    </div>
  )
}

export default UserSettings
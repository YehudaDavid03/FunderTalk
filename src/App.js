import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

import AlertBox from "./components/AlertBox"
import NavBar from "./components/NavBar"
import Ads from "./components/Ads"

import useSetAlert from "./components/useSetAlert"
import useSetReload from "./components/useSetReload"

import RouteNotFound from "./views/RouteNotFound"
import News from "./views/News"
import PostsFeed from "./views/PostsFeed"
import JobsFeed from "./views/JobsFeed"
import UserSettings from "./views/UserSettings"
import Register from "./views/Register"

function App() {
  let todaysDate = new Date()
  const localData = localStorage.getItem("userData")
  const { alert, changeAlert } = useSetAlert()
  const { reloadReceived, changeReload } = useSetReload()
  const [userInfoReceived, setUserInfoReceived] = useState(localData ? JSON.parse(localData) : {})

  const [searchReceived, setSearchReceived] = useState()
  const [postsRender, setPostsRender] = useState()
  const curseWords = /fuck|shit|pussy|ass|dick|nigga|bitch/gi
  
  useEffect(() => {
    axios({
      method: "get",
      url: "https://funder-talk-server.herokuapp.com/api/posts-read",
    })
    .then((response) => {
      setPostsRender(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [reloadReceived])

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userInfoReceived))
  }, [userInfoReceived])

  // Set alert for login
  useEffect(() => {
    if (userInfoReceived.userToken && userInfoReceived.userUsername) {
      changeAlert(true, "done", "#0F9D58", "Success!", `Signed in as ${userInfoReceived.userUsername}`)

      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
    }
  }, [userInfoReceived.userToken, userInfoReceived.userUsername])

  // Receive sign in info with security
  const userInfoSendInterference = (userInfoSendInterference) => {
    setUserInfoReceived(userInfoSendInterference)
  }

  // Receive search input
  const sendSearch = (sendSearch) => {
    setSearchReceived(sendSearch)
  }

  // Logout of localStorage & useState
  const logoutFunc = () => {
    localStorage.setItem("userData", null)
    setUserInfoReceived({})
  }

  return (
    <div className="app-main">
      {alert.onOff ? <AlertBox Icon={alert.icon} IconBackgroundColor={alert.iconBackgroundColor} AlertStatus={alert.alertStatus} AlertMessage={alert.alertMessage} /> : <></>}
      <NavBar sendSearch={sendSearch} logoutFunc={logoutFunc} userInfoReceived={userInfoReceived} />

      <div className="app-main-a">
        <div className="app-main-a-routes">
          <Routes>
            <Route path="*" element={<RouteNotFound />} />
            <Route path="/FunderTalk/" element={<News />} />
            <Route path="/FunderTalk/PostsFeed" element={<PostsFeed searchReceived={searchReceived} todaysDate={todaysDate} curseWords={curseWords} changeAlert={changeAlert} changeReload={changeReload} userInfoReceived={userInfoReceived} postsRender={postsRender} />} />
            <Route path="/FunderTalk/JobsFeed" element={<JobsFeed />} />
            <Route path="/FunderTalk/UserSettings" element={<UserSettings curseWords={curseWords} changeAlert={changeAlert} changeReload={changeReload} userInfoSendInterference={userInfoSendInterference} userInfoReceived={userInfoReceived} />} />
          </Routes>
        </div>

        <Ads />
      </div>
    </div>
  )
}

export default App

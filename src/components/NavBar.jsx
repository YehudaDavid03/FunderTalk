import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const NavBar = ({ userInfoReceived, logoutFunc, sendSearch }) => {
  const [search, setSearch] = useState("")

  useEffect(() => {
    sendSearch(search)
  }, [search])

  return (
    <div className="nav-bar-main">
      <div className="nav-bar-main-a">
        <Link className="react-link" to="/">
          <h1><span>Funder</span>Talk <p3 style={{color: "var(--white)", fontSize: "14px"}}>(Beta)</p3></h1>
        </Link>
      </div>

      <div className="nav-bar-main-b">
        <span className="material-icons">search</span>
        <input
          type="text" 
          name="search"
          value={search}
          onChange={ (e) => {setSearch(e.target.value)} }
          placeholder="Search a username..."
        ></input>
      </div>

      <div className="nav-bar-main-c">
        <Link className="react-link" to="/"><span className="material-icons">newspaper</span></Link>
        <Link className="react-link" to="/PostsFeed"><span className="material-icons">polyline</span></Link>
        <Link className="react-link" to="/JobsFeed"><span className="material-icons">work</span></Link>
        <div className="nav-bar-main-c-icon-div">
          <Link className="react-link" to="/UserSettings"><span className="material-icons">settings</span></Link>
          <h1 style={userInfoReceived.userToken ? {background: "#0F9D58"} : {background: "#ffca28"}}></h1>
        </div>
        {
          userInfoReceived.userToken

          ?

          (
            <Link className="react-link" to="/UserSettings"><span onClick={logoutFunc} className="material-icons">logout</span></Link>
          )

          :

          (
            <></>
          )
        }
      </div>
    </div>
  )
}

export default NavBar
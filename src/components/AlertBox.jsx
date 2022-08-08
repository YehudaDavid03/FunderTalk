import React from "react"

const AlertBox = ({ Icon, IconBackgroundColor, AlertStatus, AlertMessage }) => {
  return (
    <div className="alert-box">
      <div className="alert-box-a" style={{backgroundColor: IconBackgroundColor}} >
        <span className="material-icons">{Icon}</span>
      </div>

      <div className="alert-box-b">
        <h1><span>{AlertStatus} </span>{AlertMessage}</h1>
      </div>

      <div className="alert-box-c">
        <span className="material-icons">close</span>
      </div>
    </div>
  )
}

export default AlertBox
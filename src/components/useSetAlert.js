import React, { useState } from "react"

const useSetAlert = () => {
  const [alert, setAlert] = useState({
    onOff: false,
    icon: "warning",
    iconBackgroundColor: "#F4B400",
    alertStatus: "Warning!",
    alertMessage: "Not signed in"
  })

  const changeAlert = (onOff, icon, iconBackgroundColor, alertStatus, alertMessage) => {
    setAlert({
      onOff: onOff,
      icon: icon,
      iconBackgroundColor: iconBackgroundColor,
      alertStatus: alertStatus,
      alertMessage: alertMessage
    })
  }

  return { alert, changeAlert }
}

export default useSetAlert
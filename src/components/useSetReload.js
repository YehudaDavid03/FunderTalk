import React, { useState } from "react"

const useSetReload = () => {
  const [reloadReceived, setReloadReceived] = useState(true)
  
  const changeReload = () => {
    setReloadReceived(!reloadReceived)
  }
  
  return { reloadReceived, changeReload }
}

export default useSetReload
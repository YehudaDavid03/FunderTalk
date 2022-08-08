import React from "react"

export const UserInfoEdit = ({ label, display, doesNotWork }) => {
  return (
    <div onClick={doesNotWork}>
      <div>
        <h1>{`${label}: ${display}`}</h1>
      </div>

      <div>
        <button>Edit</button>
      </div>
    </div>
  )
}

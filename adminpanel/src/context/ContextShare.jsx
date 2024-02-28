import React, { createContext, useState } from 'react'

export const editCategoryResponseContext = createContext()

function ContextShare({children}) {
    const [editCategoryResponse,setEditResponse] = useState({})
  return (
    <editCategoryResponseContext.Provider value={{editCategoryResponse,setEditResponse}}>
        {children}
    </editCategoryResponseContext.Provider>
  )
}

export default ContextShare
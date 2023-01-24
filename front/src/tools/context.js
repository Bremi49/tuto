import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    count : 0,
    data : []
}

export {StoreContext, initialState}
import React from "react"
import {reducer} from "../tools/reducer.js"
import {initialState, StoreContext} from "../tools/context.js"

// {children} === props.children
const StoreProvider = ({ children }) => { 
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider


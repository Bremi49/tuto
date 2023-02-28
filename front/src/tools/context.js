import React from "react"
const StoreContext = React.createContext([]);

const initialState = {
    isLogged:false
}

export {StoreContext, initialState}

//définis le contexte d'utilisation
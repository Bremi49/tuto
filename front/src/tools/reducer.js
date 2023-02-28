const reducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {...state, isLogged:true, token:action.payload };
        case 'LOGOUT':
            return {...state, isLogged:false };
        default:
            return state;
    }
}

export {reducer}

//Traitement des différentes actions
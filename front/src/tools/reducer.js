const reducer = (state, action) =>{
    switch(action.type){
        case 'INCREMENTER':
            return {
                ...state,
                count:state.count + 1,
            }
                
        case 'ADD_DATA':
            return {
                ...state,
                data : [...state.data, action.payload]
            }

        default:
            return state;
    }
}

export {reducer}

//Traitement des différentes actions
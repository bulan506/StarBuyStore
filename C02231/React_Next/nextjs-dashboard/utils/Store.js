import { useReducer, createContext } from "react";

export const Store = createContext()

//el estado inicial de la aplicación o variable estado
const initialState = {
    cart: {
        cartItems: []
    }
}


//función redictora donde se crea la lógica funcional
function reducer(state, action) {

    switch (action.type) {
        case 'CARD_ADD_ITEM':{
            const newItem = action.payload
            const existItem = state.cart.cartItems.find(item => item.slug === newItem.slug)

            //una condicion para actualizar si existe el item o guardar sino existe
            const cardItems = existItem ? state.cart.cartItems.map(item => item.name === existItem.name ? newItem: item)

            //de lo contrario sino existe, entonces se guarda el primer item
            : [...state.cart.cartItems, newItem]

            return {...state, cart:{...state.cart, cartItems}}
        }

        default:
        return state;
    }

}

//funcion para crear el store y envolver a los componentes hijos
export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <Store.Provider value={value}></Store.Provider>
}

  
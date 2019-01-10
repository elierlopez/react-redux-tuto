const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        product
    }
}

const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        product //esto es lo mismo que -> product:product
    }
}

export { addToCart, removeFromCart }
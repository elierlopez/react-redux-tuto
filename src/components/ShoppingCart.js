import React from 'react'
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap'
import { removeFromCart } from '../actionCreators'
import { connect } from "react-redux";
const styles = {
  footer: {
    fontWeight: 'bold'
  }
}

const ShoppingCart = props => {
  return (
    <Panel header="Shopping Cart">
      <Table fill='true' >
        <tbody>
          {props.cart.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td className="text-right">${product.price}</td>
              <td className="text-right"><Button bsSize="xsmall" bsStyle="danger" onClick={() => props.remove(product)}><Glyphicon glyph="trash" /></Button></td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" style={styles.footer}>
              Total: ${props.cart.reduce((sum, product) => sum + product.price, 0)}
            </td>
          </tr>
        </tfoot>
      </Table>

    </Panel>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
//mapStateToProps is an objects that wraps all the poperties to be register to the store
//each time one of these properties is updated in the store, this component will be re-rendered

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (product) =>  {
      dispatch(removeFromCart(product))
    }
  }
}
//mapDispatchToProps is an object that wraps all the functions that will be 
//automaticaly dispatched by the store when they are called in this component

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
// With connect we insert mapStateToProps and mapDispatchToProps to ShoppingCart component by props
// as shown in this file the method remove dispatches removeFromCart action creator
// also cart is bound to state.cart and the component is re-rendered each time cart is updated

//Here an action is directly passed to the store.dispatch into the component
//According to the documentation of redux.js.org we should have:
/*
1) A file/layer with Actions types: its nothing but string constants that descibe the action to be executed
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

Note: An action is formed by ActionType and other parameters required for executing the desired action
{
  type:'REMOVE_FROM_CART',
  product
}

2) A file/layer with actions creators: nothing but functions that create actions

function removeFromCart(product){
  return {
    type:REMOVE_FROM_CART,
    product
  }
}

NOte: In traditional flux the action creator often trggers a dispatch() when invoked like so:

function removeFromCartWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  }
  dispatch(action)
}

But not in redux. in redux we pass the result of action creator to the dispatch, like so

dispatch(removeFromCart(product)) // removeFromCart(product) was previously defined

3) Alteratively we can create bound action creators like so:

const boundRemoveFromCart = product => dispatch(removeFromCart(product))

so we can call it directly like so

boundRemoveFromCart(product)

the above line would do it all at once;
  -build action with the proper action type and other product parameter
  -triger the dipatch with the created action

*/
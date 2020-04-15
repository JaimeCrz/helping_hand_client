import React from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'

const CreateRequest = props => {
  let productDisplay
  let requestDisplay
  let confirmButton

  const dispatch = useDispatch()

  const getProducts = async () => {
    let response = await axios.get('/products')
    dispatch({ type: 'GET_PRODUCT_LIST', payload: response.data })
    dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
  }

  const addToRequest = async event => {
    let id = event.target.parentElement.dataset.id
    let response
    if (props.task.id) {
      response = await axios.put(`/tasks/${props.task.id}`, {
        product_id: id
      })
    } else {
      response = await axios.post('/tasks', {
        product_id: id
      })
    }
    // debugger
    dispatch({ type: 'UPDATE_REQUEST', payload: response.data.task })
  }

  if (props.showRequestForm) {
    productDisplay = props.products.map(product => {
      return (
        <li
          id={`product-${product.id}`}
          key={product.id}
          data-id={product.id}
          data-name={product.name}
          data-price={product.price}
        >
          {product.name} {product.price}
          <button key={product.id} onClick={addToRequest.bind(this)}>
            Add
          </button>
        </li>
      )
    })
  }

  if (props.task.id) {
    confirmButton = <button id='confirm-task'>Place Order</button>
    requestDisplay = props.task.products.map(product => {
      return (
        <>
          <div id={product.id}>{product.name} {product.amount}</div>
        </>
      )
    })
  } 

  return (
    <>
      <button id='create-request' onClick={getProducts.bind(this)}>
        Create your request
      </button>
      <ul id='product-list'>{productDisplay}</ul>
      <div id="request-list">
        {requestDisplay} {confirmButton}
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm,
    task: state.task,
    taskProducts: state.taskProducts
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)

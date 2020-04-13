import React from 'react';
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from './state/actions/productActions'

const App = props => {
  

  return (
    <>
      <Header />
      <button className='create-request'>Create your request</button> 
      <CreateRequest props={props}/>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)
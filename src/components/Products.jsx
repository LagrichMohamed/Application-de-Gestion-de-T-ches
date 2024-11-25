import React, { Component } from 'react'
import productsArray from "../products";
import Product from './Product';

class Products extends Component
{
    constructor(props){
        super(props),
        this.state = {
            productsList : productsArray,
    }

    }
    render(){
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {this.state.productsList.map(product => (
                    <Product 
                        key={product.id} 
                        title={product.title} 
                        price={product.price} 
                        thumbnail={product.thumbnail} 
                        comments={product.Comments} 
                    />
                ))}
            </div>
        </div>
    );
}}
export default Products

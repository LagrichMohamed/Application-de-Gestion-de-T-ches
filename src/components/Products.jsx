import React from 'react'
import products from "../products";
import Product from './Product';

function ShowProducts(){
    return (
        <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => ( 
                    <Product key={product.id} title={product.title} 
                    price={product.price} thumbnail={product.thumbnail} /> 
                ))}
            </div>
        </div>
    )
}
export default ShowProducts

import React from 'react'
import "./Product.css"

const Product = ({key, title, price, thumbnail}) => {
  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-lg m-5 mt-10 bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          className="w-full h-full object-contain p-4" 
          src={thumbnail} 
          alt={title}
        />
      </div>
      
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
        <p className="text-green-600 font-semibold text-lg">{price}</p>
      </div>
      
      <div className="px-6 pb-4">
        <button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}

export default Product

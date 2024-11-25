import React, { Component } from 'react';
import productsArray from "../products";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsList: productsArray,
      productComments: {},
    };
  }

  handleCommentSubmit = (event, productId) => {
    event.preventDefault();
    const { productComments, productsList } = this.state;
    const newComment = productComments[productId];

    if (newComment && newComment.trim()) {
      const updatedProducts = productsList.map((product) => {
        if (product.id === productId) {
          product.Comments.push(newComment);
        }
        return product;
      });

      this.setState({
        productsList: updatedProducts,
        productComments: { ...productComments, [productId]: '' }, // Clear the input after submission
      });
    }
  };

  render() {
    const { productsList, productComments } = this.state;

    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Mon Blog</h1>

        <div className="mt-8">
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsList.map(product => (
              <div key={product.id} className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="font-bold text-xl">{product.title}</h3>
                <p className="text-green-600 font-semibold">{product.price}</p>
                <ul className="mt-2">
                  {product.Comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <form onSubmit={(event) => this.handleCommentSubmit(event, product.id)} className="mt-2">
                  <textarea
                    value={productComments[product.id] || ''}
                    onChange={(e) => this.setState({ productComments: { ...productComments, [product.id]: e.target.value } })}
                    placeholder="Laissez un commentaire sur ce produit..."
                    className="w-full p-2 border rounded"
                  />
                  <button type="submit" className="mt-2 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                    Soumettre le commentaire
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;

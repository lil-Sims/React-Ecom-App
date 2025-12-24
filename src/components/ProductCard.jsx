import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const placeholder = 'https://via.placeholder.com/200x200?text=No+Image';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(product.image || placeholder);

  const handleError = () => setImgSrc(placeholder);

  const handleAdd = () => {
    const payload = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
    };
    dispatch(addItem(payload));
  };

  return (
    <div className="card">
      <img src={imgSrc} alt={product.title} onError={handleError} />
      <div className="card-body">
        <h3 className="title">{product.title}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="category"><strong>Category:</strong> {product.category}</p>
        <p className="desc">{product.description}</p>
        <p className="rating"><strong>Rating:</strong> {product?.rating?.rate ?? 'N/A'}</p>
        <button onClick={handleAdd} className="btn">Add to cart</button>
      </div>
    </div>
  );
}

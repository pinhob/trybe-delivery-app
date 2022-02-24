import React, { useEffect } from 'react';
import fetchAllProducts from '../../api';

const Products = () => {
  const product = {
    name: 'produto',
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAllProducts();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {product.name}
      </ul>
    </div>
  );
};

export default Products;

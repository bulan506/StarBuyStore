import React, { useState, useEffect } from "react";
import Products from './Producs';

const StorePage = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
  const loadData = async () => {
      try {
        const response = await fetch('https://localhost:7013/api/Store');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        console.log('Data received:', json);
        setProductList(json);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  return (
    <section className="container-fluid">
      <div className="row product-container">
        {productList.map((item) => (
          <div key={item.id} className="col-3 col-md-3 col-lg-3 mt-2 product-item">
            <Products item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StorePage;
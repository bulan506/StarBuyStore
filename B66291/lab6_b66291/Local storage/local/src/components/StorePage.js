import React from "react";
import productsList from '../app/data' 
import Products from './Producs';

const StorePage = ({agregarProducto}) => { 
    return (
        <section className="container-fluid">
          <div className="row product-container">
            {productsList.map((item) => ( 
              <div key={item.id} className="col-3 col-md-3 col-lg-3 mt-2 product-item">
                <Products item={item} key={item.id} agregarProducto={agregarProducto}/> 
              </div>
            ))}
          </div>
        </section>
      );
   
}

export default StorePage;
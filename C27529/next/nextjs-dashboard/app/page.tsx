import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Page() {

  const productsList = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Audifonos con alta fidelidad',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Headset_1x._SY116_CB667159060_.jpg'
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Control PS4',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Controller2.png'
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'PS4 1TB',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Playstation3.jpg'
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Crash Bandicoot 4 Switch',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Game.png'
    },
    {
      id: 5,
      name: 'Producto 5',
      description: 'Mouse Logitech',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Mouse.jpg'
    },
    {
      id: 6,
      name: 'Producto 6',
      description: 'Silla Oficina',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_Quad_Chair.jpg'
    },
    {
      id: 7,
      name: 'Producto 7',
      description: 'Laptop Acer',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Laptop.png'
    },
    {
      id: 8,
      name: 'Producto 8',
      description: 'Oculus Quest 3',
      price: 20000,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Karu/2021/June/Karu_LP_Oculus2.jpg'
    }
  ];

  const Product = ({ product }) => {
    const { name, description, imageURL, price } = product;
    return (

      <div className="col-sm-3">


        <div className='info-product'>
          <h2>{name}</h2>
          <div className='price'>{description}</div>
          <div className='price'>Precio: ₡{price}</div>
          <img src={imageURL} alt={name} />
          <button>
            Agregar al Carrito
          </button>

        </div>


      </div>


    );
  };
  return (
    <div>

<header>
			
			<h1>GreatestBuy</h1>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">

							<div className="secciones">

								<div className="row">

									<div className="col-sm-2">
										<button className="nav-link"> <i className="fa-solid fa-list-ul"></i> Todo</button>
									</div>
									<div className="col-sm-2">
										<button className="nav-link"> Ofertas del día</button>
									</div>
									<div className="col-sm-2">
										<button className="nav-link"> Servicio al Cliente</button>
									</div>
									<div className="col-sm-2">
										<button className="nav-link"> Listas</button>
									</div>
									<div className="col-sm-2">
										<button className="nav-link">Tarjetas de Regalo</button>
									</div>
									<div className="col-sm-2">
										<button className="nav-link"> Vender</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

		</header>
<div className="row">
        {productsList.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

    </div>
    
  );
}

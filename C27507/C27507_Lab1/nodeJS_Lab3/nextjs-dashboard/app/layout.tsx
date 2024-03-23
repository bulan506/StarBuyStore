
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export const product: ProductItem[] = [
  // const product = [
  {
      id: 1,
      name: "Producto 1",                
      imageUrl: './img/tablet_samsung.jpg',
      price: 25
  },
  {
      id: 2,
      name: "Producto 2",                
      imageUrl: "./img/tv.jfif",
      price: 50
  },
  {
      id: 3,
      name: "Producto 3",                
      imageUrl: "./img/auri.jfif",
      price: 100
  },
  {
      id: 4,
      name: "Producto 4",                
      imageUrl: "./img/tablet_samsung.jpg",
      price: 35
  },
  {
      id: 5,
      name: "Producto 5",                
      imageUrl: "./img/teclado.jpg",
      price: 75
  },
  {
      id: 6,
      name: "Producto 6",                
      imageUrl: "./img/mouse.png",
      price: 150
  },
  {
      id: 7,
      name: "Producto 7",
      imageUrl: "./img/mouse.png",
      price: 250
  },
  {
      id: 8,                
      name: "Producto 8",
      imageUrl: "img/mouse.png",
      price: 250
  },
  {
      id: 9,
      name: "Producto 9",
      imageUrl: "./img/mouse.png",
      price: 2500
  }

];

export const StaticCarousel = () => {
  return (
      
      <div id="carouselExampleCaptions" className="carousel slide">
          <div className="cover"></div>
          <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
          <div className="carousel-item active">
              <div className="cover_img"></div>
              <img src="img/mouse.png" className="d-block w-100" alt="Mouse" />
              <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          <div className="carousel-item">
              <img src="img/teclado.jpg" className="d-block w-100" alt="Teclado" />
              <div className="cover_img"></div>
              <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          <div className="carousel-item">
              <img src="img/tablet_samsung.jpg" className="d-block w-100" alt="Tablet Samsung" />
              <div className="cover_img"></div>
              <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
              <div className="cover_info"></div>
              </div>
          </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
          </button>
      </div>                            
  );
}


// Lista de Productos
export const Product = ({ product }:{product: ProductItem}) => {
  const { name, imageUrl, price } = product;            
  return (
      <div className="product col-sm-4 row">
          <div className="row-sm-3"><img src={imageUrl}/></div>
          <p className="row-sm-3">{name}</p>
          <p className="row-sm-3">${price}</p>
          <button className="row-sm-3">Comprar</button>
      </div>
  );
}
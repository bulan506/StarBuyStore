const productos = [
  {
    id: 1,
    descripcion: "Descripcion producto 1",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82KYYpYvwCt-r4FUr5jlFGitEWKLnnoI5-Q&usqp=CAU",
    nombre: "objeto 1",
    precio: 20,

  },
  {
    id: 2,
    descripcion: "Descripcion producto 2",
    imagen: "https://falabella.scene7.com/is/image/FalabellaPE/gsc_113974681_748280_1?wid=1500&hei=1500&qlt=70",
    nombre: "objeto 2",
    precio: 10,
 
  },
  {
    id: 3,
    descripcion: "Descripcion producto 3",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_822477-MLA31604607474_072019-O.webp",
    nombre: "objeto 3",
    precio: 15,
    
  },
  {
    id: 4,
    descripcion: "Descripcion producto 4",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFTa9t1HvrkKSaKeFsB1tGZ9yCH3m2ZID1Q&usqp=CAU",
    nombre: "objeto 4",
    precio: 30,
    
  },
];

export function createUserData() {
  const savedData = localStorage.getItem("userData");
  if (!savedData) {
    const data = {
      "productos": productos,
      "carrito": {
        "productos": [],
        "subtotal": 0,
        "porcentajeImpuesto": 13,
        "total": 0,
        "direccionEntrega": "",
        "metodosDePago": {}
      },
      "metodosDePago": [
        {
          "necesitaVerificacion": true
        }]
    }
    localStorage.setItem("userData", JSON.stringify(data));
  }


}

export function saveUserData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function getUserData() {
  const data = localStorage.getItem("userData");
  return JSON.parse(data);
}

export function clearUserData() {
  localStorage.clear();
}


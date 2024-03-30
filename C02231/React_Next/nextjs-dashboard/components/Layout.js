import React from "react";
import Head from 'next/head'
import Link from "next/link"
//import '@/app/ui/global.css';
import "../app/prueba.jsx"

export default function Layout({ title, children }) {
    return (
        <div>
            <Head>
                <title>{title ? title + "- shopping" : "shopping"}</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="p-3 text-bg-dark">
                <div className="row">

                    <div className="col-sm-2">
                        <Link href="/">
                            <img src="Logo1.jpg" style={{ height: '75px', width: '200px', margin: '1.4rem' }} className="img-fluid" />
                        </Link>
                    </div>

                    <div className="col-sm-8 d-flex justify-content-center align-items-center">
                        <form className="d-flex justify-content-center">
                            <input type="search" name="search" style={{ width: '805%' }} className="text-dark" placeholder="Buscar"></input>
                            <button type="submit">Buscar</button>
                        </form>
                    </div>

                    <div className="col-sm-2 d-flex justify-content-end align-items-center">
                        <Link href={"/cart"}>
                            <button type="button">
                                <img src="https://miguelrevelles.com/wp-content/uploads/carrito-de-la-compra-1.png"
                                    style={{ height: '100px', width: '100px' }} className="img-fluid" />
                            </button>
                        </Link>
                       
                    </div>

                </div>
            </header>

            <main>
                {children}
            </main>

        </div>
    )
}


//Carrito
function Cart({ count }) {
    return (
      <div className='my-3' style={{ position: 'relative', display: 'inline-block' }}>
        <div >
          {/* Botón del carrito que permite al usuario acceder al carrito */}
          <Link href="/cart">
            <button className="btn btn-dark">
              <i className="bi bi-cart-fill"></i>
            </button>
          </Link>
        </div>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px', textAlign: 'center', color: 'white' }}>
          {count}
        </div>
      </div>
    );
  }
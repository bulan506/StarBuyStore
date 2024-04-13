"use client"
import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Products } from './components/products';
import { Cart } from './components/Cart';
import { Address } from './components/Address';
import { Payment } from './components/Payment';

export default function Page() {
  // Define un objeto predeterminado para tiendaGuardado
  const tiendaGuardado = {
    carrito: {
      subtotal: 0,
      porcentajeImpuesto: 0.13,
      total: 0,
      direccionEntrega: '',
      metodoDePago: ''
    },
    necesitaVerificacion: false,
    productos: [],
    idCompra: 0
  };

  // Define el estado inicial de store
  const [store, setStore] = useState(() => {
    // Intenta obtener los datos de localStorage
    const storedStore = localStorage.getItem("tienda");
    // Si no hay datos en localStorage o es null, usa tiendaGuardado como valor inicial
    return storedStore ? JSON.parse(storedStore) : tiendaGuardado;
  });
  
  // Define el estado de la página
  const [page, setPage] = useState(0);

  // Función para cambiar de página
  const goToPage = (pageNumber: React.SetStateAction<number>) => {
    setPage(pageNumber);
  };

  // Efecto para guardar los datos en localStorage cuando store cambia
  useEffect(() => {
    localStorage.setItem("tienda", JSON.stringify(store));
    console.log("Datos guardados en localStorage:", store); // Agrega un mensaje de registro para depurar
  }, [store]);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <Header goToPage={goToPage} />
      {/* Renderiza el componente correspondiente según el estado de la página */}
      {page === 0 ? (
        <Products />
      ) : page === 1 ? (
        <Cart goToPage={goToPage} />
      ) : page === 2 ? (
        <Address goToPage={goToPage} />
      ) : (
        <Payment />
      )}
    </main>
  );
}

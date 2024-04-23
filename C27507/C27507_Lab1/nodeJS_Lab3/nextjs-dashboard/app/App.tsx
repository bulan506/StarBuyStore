import React from 'react';
//Importamos Componentes dedicados al manejo de rutas desde la biblioteca react-router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './page';
//componente de las rutas
//import {AddressValidation} from './cart-validation/address-validation'
import {PaymentMethodValidation} from './cart-validation/payment-method-validation';

function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Archivo raiz de todo el proyecto */}
                    <Route path="/" element={<Page/>} />
                    {/* <Route path="/cart-validation/address-validation" element={<AddressValidation/>} /> */}
                    <Route path="/cart-validation/payment-method-validation" element={<PaymentMethodValidation/>} />
                    {/* <Route path="*" element={<NotFoundPage />} />
                    <Route path="*" element={<ErrorPage />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
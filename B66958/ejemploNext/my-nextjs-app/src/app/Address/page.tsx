'use client'

import { useState } from "react";

const AddressForm = ({ handleAddressForm }: { handleAddressForm: () => void }) => {

    const [activeAddress, setActiveAdress] = useState(false);
    const [address, setAddress] = useState('');

    function handleAddressChange(event: any) {
        const inputValue = event.target.value;
        setAddress(inputValue);
        setActiveAdress(inputValue.trim().length > 0);
    }

    return <div className="d-flex justify-content-center">
        <div className="card w-25">
            <div className="card-body">
                <div className="d-flex w-100 justify-content-center">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Dirección:</label>
                        <input type="text" className="form-control"
                            id="exampleFormControlInput1" placeholder="Ingrese su dirección"
                            value={address} onChange={handleAddressChange} />
                        <div className="d-flex w-100 justify-content-center">
                            <a className="btn btn-primary mr-2" onClick={() => handleAddressForm()}>Atrás</a>
                            <button className="btn btn-primary" disabled={!activeAddress}>Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AddressForm;
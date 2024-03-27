'use client'

const AddressForm = ({ handleAddressForm }: { handleAddressForm: () => void }) => {
    return <div className="d-flex justify-content-center">
        <div className="card w-25">
            <div className="card-body">
                <div className="d-flex w-100 justify-content-center">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Dirección:</label>
                            <input type="text" className="form-control"
                                id="exampleFormControlInput1" placeholder="Ingrese su dirección" />
                            <div className="d-flex w-100 justify-content-center">
                                <a className="btn btn-primary mr-2" onClick={() => handleAddressForm}>Atrás</a>
                                <a className="btn btn-primary">Continuar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default AddressForm;
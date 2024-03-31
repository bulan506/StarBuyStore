import { useState } from "react";

export default function ModalInput({ title, text }: { title: string, text: string }) {
    const [message,setMessage] = useState('');
    
    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">{text}</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">please enter the voucher:</label>
                                    <input type="text" className="form-control" id="recipient-name" />
                                </div>
                            </form>
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {setMessage('please wait for our administrator to confirm your method of payment.')}}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


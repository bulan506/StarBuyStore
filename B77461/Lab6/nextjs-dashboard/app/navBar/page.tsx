import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const NavBar = ({ productCount, toggleCart }: { productCount: number, toggleCart: (action: boolean) => void }) => {

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <button className="navbar-brand btn btn-outline-dark" type="submit" onClick={() => toggleCart(false)}>
                        Tienda Online
            </button>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" onClick={() => toggleCart(true)}>
                        {productCount}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                            className="bi bi-cart" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <span className="sr-only"></span>
                    </a>
                </li>


                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="usuarioDropdown" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        <i className="bi bi-person-fill" style={{ fontSize: '30px' }}></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end bg-transparent" aria-labelledby="usuarioDropdown">
                        <li><a className="dropdown-item"><i className="bi bi-box-arrow-right"></i> Salir</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;

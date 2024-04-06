import {useState} from 'react';
import { number } from 'zod';

import { totalPriceNoTax, totalPriceTax,getCartShopStorage,setCartShopStorage } from './page'; //precios totales - manejor LocalStorage

// export const StaticCarousel = () => {
//     const [activeIndex, setActiveIndex] = useState(0);

//     const handlePrevSlide = () => {
//         const newIndex = activeIndex === 0 ? 2 : activeIndex - 1;
//         setActiveIndex(newIndex);
//     };

//     const handleNextSlide = () => {
//         const newIndex = activeIndex === 2 ? 0 : activeIndex + 1;
//         setActiveIndex(newIndex);
//     };
//     return (
        
//         <div id="carouselExampleCaptions" className="carousel slide">
//             <div className="cover"></div>
//             <div className="carousel-indicators">
//             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
//             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
//             </div>
//             <div className="carousel-inner">
//             <div className="carousel-item active">
//                 <div className="cover_img"></div>
//                 <img src="img/mouse.png" className="d-block w-100" alt="Mouse" />
//                 <div className="carousel-caption d-none d-md-block">
//                 <h5>First slide label</h5>
//                 <p>Some representative placeholder content for the first slide.</p>
//                 <div className="cover_info"></div>
//                 </div>
//             </div>
//             <div className="carousel-item">
//                 <img src="img/teclado.jpg" className="d-block w-100" alt="Teclado" />
//                 <div className="cover_img"></div>
//                 <div className="carousel-caption d-none d-md-block">
//                 <h5>Second slide label</h5>
//                 <p>Some representative placeholder content for the second slide.</p>
//                 <div className="cover_info"></div>
//                 </div>
//             </div>
//             <div className="carousel-item">
//                 <img src="img/tablet_samsung.jpg" className="d-block w-100" alt="Tablet Samsung" />
//                 <div className="cover_img"></div>
//                 <div className="carousel-caption d-none d-md-block">
//                 <h5>Third slide label</h5>
//                 <p>Some representative placeholder content for the third slide.</p>
//                 <div className="cover_info"></div>
//                 </div>
//             </div>
//             </div>
//             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//             </button>
//             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//             </button>
//         </div>                            
//     );
//   }

export const StaticCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevSlide = () => {
        const newIndex = activeIndex === 0 ? 2 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const handleNextSlide = () => {
        const newIndex = activeIndex === 2 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };
    return (
        <div id="carouselExampleCaptions" className="carousel slide">
            <div className="cover"></div>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className={activeIndex === 0 ? "active" : ""} aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className={activeIndex === 1 ? "active" : ""} aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className={activeIndex === 2 ? "active" : ""} aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
                    <div className="cover_img"></div>
                    <img src="img/mouse.png" className="d-block w-100" alt="Mouse" />
                    <div className="carousel-caption d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                        <div className="cover_info"></div>
                    </div>          
                </div>
                <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
                    <img src="img/teclado.jpg" className="d-block w-100" alt="Teclado" />
                    <div className="cover_img"></div>
                    <div className="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                        <div className="cover_info"></div>
                    </div>          
                </div>
                <div className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}>

                    <img src="img/tablet_samsung.jpg" className="d-block w-100" alt="Tablet Samsung" />
                    <div className="cover_img"></div>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                        <div className="cover_info"></div>
                    </div>          
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" onClick={handlePrevSlide}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" onClick={handleNextSlide}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}



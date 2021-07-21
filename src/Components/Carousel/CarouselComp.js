import React from 'react'
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

function CarouselComp() {
    return (
        <div>
            <Carousel id="carousel" interval={2000}>
                <Carousel.Item >
                    <img
                        className="d-block w-100 image"
                        src="https://images.pexels.com/photos/374845/pexels-photo-374845.jpeg?cs=srgb&dl=pexels-burst-374845.jpg&fm=jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className="carouselTitle">Women's Collection</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="https://images.unsplash.com/photo-1553068551-db8745da0850?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1868&q=80"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className="carouselTitle">Deals of the day</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="https://images.unsplash.com/photo-1555788938-5796b2948fb5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className="carouselTitle">Seasonal Collection</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselComp

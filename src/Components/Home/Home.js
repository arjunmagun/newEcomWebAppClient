import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ProductContext } from '../../Context/Products/products';
import CarouselComp from '../Carousel/CarouselComp';
import CatalogComp from '../ProductCard/ProductCard';
import AppModal from './AppModal';
import './Home.css';

function Home() {
    const { products } = useContext(ProductContext);

    return (
        <div>
            <AppModal />
            <CarouselComp />
            <Container>
                <Row>
                    {products.map(product => (
                        <Col lg={4} md={6}>
                            <CatalogComp key={product._id} {...product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Home

import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ProductContext } from '../../Context/Products/products';
import ProductCard from '../ProductCard/ProductCard';

export default function CategoryComp(props) {
    const { products } = useContext(ProductContext);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setCategories(products.filter(el => props.match.params.category === el.productFor.toLowerCase()))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    {categories.map(product => (
                        <Col lg={4} md={6}>
                            <ProductCard key={product._id} {...product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

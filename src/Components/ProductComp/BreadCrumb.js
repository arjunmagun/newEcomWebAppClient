import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

export default function BreadCrumb({prod}){
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/${prod.productFor.toLowerCase()}`}>
                {prod.productFor}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{prod.productName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { firebaseAuth } from '../../Context/AuthProvider/AuthProvider';

function NavBarComp(props) {
    const { handleSignOut, adminLoggedIn } = useContext(firebaseAuth);

    const handleSignOutClick = async () => {
        await handleSignOut();
        window.location.reload();
    }

    return (
        <div>
            <Navbar id="navbar" collapseOnSelect expand="lg" variant="dark" >
                <Container>
                    <Navbar.Brand id="brandName" href="/">INSTASHOP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link id="link" href="/men">Mens</Nav.Link>
                            <Nav.Link id="link" href="/women">Womens</Nav.Link>
                            {
                                adminLoggedIn ? (
                                    <Nav.Link id="link" href="/create/product">Create Product</Nav.Link>
                                ) : null
                            }

                        </Nav>
                        <Nav>
                            <div>
                                <Nav.Link id="cartLink" href="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <p id="cartTitle">Cart</p>
                                </Nav.Link>
                            </div>
                            {
                                adminLoggedIn ? (
                                    <div id="adminLoggedIn">
                                        <Nav.Item>Admin account</Nav.Item>
                                    </div>
                                ) : null
                            }
                            {localStorage.userToken ? (
                                <>
                                    <div>
                                        <Nav.Link id="signOutLink" onClick={handleSignOutClick}>
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <p id="signOutTitle">Sign Out</p>
                                        </Nav.Link>
                                    </div>
                                </>
                            ) :
                                (
                                    <div>
                                        <Nav.Link id="signInLink" href="/signin">
                                            <FontAwesomeIcon icon={faSignInAlt} />
                                            <p id="signInTitle">Sign In</p>
                                        </Nav.Link>
                                    </div>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBarComp

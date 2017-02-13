import React from 'react';
import { Link } from 'react-router';
import { Navbar , Nav , NavItem , MenuItem ,NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {

    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Nodejs</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/">
                            <NavItem>Home</NavItem>
                        </LinkContainer>
                        <li><a href="/posts">Posts</a></li>
                        <li><a href="/chat">Chat</a></li>
                        <li><a href="/join">JOIN</a></li>
                        <li><a href="/login">LOGIN</a></li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
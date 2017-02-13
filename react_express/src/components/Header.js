import React from 'react';
import { Link } from 'react-router';
import { Navbar , Nav , NavItem , MenuItem ,NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

class Header extends React.Component {

    constructor(){
        super();
        this.state = {
            isLogin : false
        };
    }

    componentDidMount(){

        let $self = this;

        axios.get('/accounts/status', {
        }).then(function (res) {
            $self.setState({
                isLogin: res.data.isLogin
            });
        }).catch(function (error) {
            console.log(error);
        });
    }



    render(){
        const Login = () => {
            return (
                <li><a href="/accounts/login">LOGIN</a></li>
            );
        };

        const Join = () => {
            return (
                <li><a href="/accounts/join">JOIN</a></li>
            );
        };

        const Logout = () => {
            return (
                <li>
                    <a href="/accounts/logout"
                       onclick="return confirm('로그아웃 하시겠습니까?')">LOGOUT</a>
                </li>
            );
        };

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
                        {this.state.isLogin ?
                            <Logout /> : <Join />
                        }
                        { this.state.isLogin ? "" : <Login /> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
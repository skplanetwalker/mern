import React from 'react';
import { Link } from 'react-router';


class Header extends React.Component {

    render(){
        return(
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/posts">posts</Link></li>
                <li><Link to="/mypage">mypage</Link></li>
            </ul>
        );
    }
}

export default Header;
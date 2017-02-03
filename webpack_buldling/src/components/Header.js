import React from 'react';

class Header extends React.Component {
    myClick() {
        alert('1111');
    }

    render() {
        return(
            <div>Header Component! <button onClick={this.myClick}>{this.props.title}</button></div>
        );
    }
}

export default Header;
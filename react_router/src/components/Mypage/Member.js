import React from 'react';

class Member extends React.Component {

    render(){
        return (
            <p>{ this.props.name } : { this.props.phone }</p>
        );
    }
}

export default Member;
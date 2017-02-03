import React from 'react';

class Header extends React.Component {

    constructor() {
        super(); //this를 사용하려면 super로 부모컴포넌트를 불러야와됨
        this.state = {
            title : "state 타이틀",
            content : "내용입니다."
        };
        this.myClick = this.myClick.bind(this);
    }

    myClick() {
        this.setState({
            title : "클릭후 state 타이틀"
        }, this.myClickAfter);
    }

    myClickAfter() {
        alert(this.state.title);
    }

    render() {
        return(
            <div>{this.state.title} <button onClick={this.myClick}>{this.props.title}</button></div>
        );
    }
}

export default Header;
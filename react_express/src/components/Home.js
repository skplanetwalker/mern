import React from 'react';
import axios from 'axios';
import Gallery from './Gallery';

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            posts : []
        };
    }

    componentDidMount(){

        let $self = this;

        axios.get('/posts/list', {
        }).then(function (res) {
            $self.setState({
                posts: res.data.posts
            });
        }).catch(function (error) {
            console.log(error);
        });
    }


    render(){

        return (
            <div>
                <Gallery posts={ this.state.posts }/>
            </div>
        );
    }
}

export default Home;
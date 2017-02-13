import React from 'react';
import axios from 'axios';

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
                <h2>Home123231443</h2>
                {this.state.posts.map((post , key) => {
                    return (
                        <p key={ key }>{ post.title }</p>
                    );
                })}
            </div>
        );
    }
}

export default Home;
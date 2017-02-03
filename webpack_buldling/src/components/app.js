import React from 'react';
import Header from './Header';

class App extends React.Component {
    render(){
        return (
            <div>
                <Header title="props 타이틀" />
                <h1>Hello React!</h1>
            </div>
        );
    }
}

export default App;
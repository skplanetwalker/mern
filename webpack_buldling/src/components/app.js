import React from 'react';
import Header from './Header';

class App extends React.Component {
    render(){
        return (
            <div>
                <Header title="사이트 타이틀입니다." />
                <h1>Hello React!</h1>
            </div>
        );
    }
}

export default App;
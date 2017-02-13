import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// action 생성
function input(message) {
    return {
        type :"INPUT",
        message : message
    };
}

// reducer 생성
function inputReducer(state , action){

    state = { message : "기본값 입니다." };

    if(action.message){
        return Object.assign(
            {},
            state,
            { message: action.message }
        );
    }else{
        return state;
    }
}

// store 지정(reducer 인자로)
const store = createStore(inputReducer);

class Form extends React.Component {
    constructor(){
        super();
        this.state = { textInput : "" };
    }

    inputChange(event){
        this.setState({
            textInput : event.target.value
        });
    }

    // dispatch 적용
    submit(){
        let message = this.state.textInput;
        this.props.store.dispatch( input(message) );
    }

    render() {
        return (
            <div>
                <input type="text" onChange={ this.inputChange.bind(this) } />
                <button onClick={ this.submit.bind(this) }>입력전송</button>
            </div>
        );
    }
}

// 저장소 참조하는 부분 작성
const Answer = (props) => {
    return (
        <h1>{ props.store.getState().message}</h1>
    );
};

// dispatch 발생시 뷰를 다시 그리는 subscribe 작성
const App = () => {
    return (
        <div>
            <Form store={store}/>
            <Answer store={store}/>
        </div>
    );
};

const render = () => {
    const rootElement = document.getElementById('root');
    ReactDOM.render(<App store={store}/>, rootElement);
};

store.subscribe(render);
render();
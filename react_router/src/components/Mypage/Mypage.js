import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import Member from './Member';

class Mypage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneDirectory : [
                { name : "1번" , phone : "010-2111-222" },
                { name : "2번" , phone : "010-2161-2324" },
                { name : "3번" , phone : "010-3111-3345" },
                { name : "4번" , phone : "010-5111-6666" },
                { name : "5번" , phone : "010-4111-5555" }
            ],
            name : "",
            phone : ""
        };

        this.initInput = this.initInput.bind(this);
    }

    handleEvent(){
        if(!this.state.name){
            alert("이름을 입력하세요");
            this.refs.nameInput.focus();
            return;
        }
        if(!this.state.phone){
            alert("전화번호를 입력하세요");
            this.refs.phoneInput.focus();
            return;
        }

        let newObject = {
            name : this.state.name,
            phone : this.state.phone
        };

        this.setState({
            phoneDirectory: this.state.phoneDirectory.concat(newObject)
        }, this.initInput );

    }

    initInput(){
        this.setState({
            name : "",
            phone : ""
        });
        this.refs.nameInput.value = "";
        this.refs.phoneInput.value = "";
    }

    inputChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    removeState(key){
        this.setState({
            phoneDirectory: this.state.phoneDirectory.slice(key,1)
        });
    }


    render(){
        let styles = {
            marginTop : "50px"
        };

        return (
            <div>
                <PanelGroup>
                    <Panel header="즐겨찾기 추가">
                        이름
                        <input type="text" name="name" ref="nameInput" onChange={this.inputChange.bind(this)} className="form-control"/>
                        번호
                        <input type="text" name="phone" ref="phoneInput" onChange={this.inputChange.bind(this)} className="form-control"/>
                    </Panel>
                </PanelGroup>

                <div>
                    <button className="btn btn-primary" onClick={ this.handleEvent.bind(this) } >추가하기</button>
                </div>

                <div style={ styles }>
                    {this.state.phoneDirectory.map((member , key) => {
                        return (
                            <Member key={key}
                                    name = { member.name }
                                    phone = { member.phone }
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Mypage;
import React from 'react';
import { PanelGroup, Panel, ButtonToolbar, Button} from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class Detail extends React.Component {

    constructor(){
        super();
        this.state = {
            posts : [
                { title : "첫번째글.", created_at : "2016-12-20" },
                { title : "두번째글.", created_at : "2016-11-20" },
                { title : "세번째글.", created_at : "2016-10-20" },
                { title : "네번째글", created_at : "2016-09-20" },
                { title : "다섯번째글", created_at : "2016-08-20" }
            ],
            content : "그냥 공통적으로 들어갈 내용"

        };
    }

    render(){
        return (
            <div>
                <PanelGroup>
                    <Panel header={ this.state.posts[this.props.params.id].title }>
                        { this.state.content }
                    </Panel>
                </PanelGroup>
                <ButtonToolbar>
                    <LinkContainer to="/posts">
                        <Button bsStyle="primary">목록으로</Button>
                    </LinkContainer>
                </ButtonToolbar>
            </div>
        );
    }
}

export default Detail;
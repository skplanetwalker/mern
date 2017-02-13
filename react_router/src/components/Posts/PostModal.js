import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class PostModal extends React.Component {

    historyBack(){
        browserHistory.push('/posts');
    }

    render(){

        return (
            <Modal show="true" onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        {this.props.params.id}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    One fine body...
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ this.historyBack }>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>

            </Modal>

        );
    }
}

export default PostModal;
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import api from "../api/axios";


function UseModal(props) {

    const {show, register,} = props;


    return(
        <>
        <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="PASSWORD"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" >
            Login
          </Button>
          <Button variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default Modal;
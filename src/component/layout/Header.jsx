

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Modal from '../ui/UseModal';
import api from "../api/axios";

function Header(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [login_id, set_login_id] = useState('');
  const [login_pwd, set_login_pwd] = useState('');
  const [regi_id, set_regi_id] = useState('');
  const [regi_username, set_regi_username] = useState('');
  const [regi_pwd, set_regi_pwd] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const loginShow = () => setLogin(true);
  const loginClose = () => {
    setLogin(false);
    set_login_id("");
    set_login_pwd("");
  };

  const regiShow = () => setRegister(true);
  const regiClose = () => {
    setRegister(false);
    set_regi_id("");
    set_regi_username("");
    set_regi_pwd("");
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작을 방지
    specific(); // 검색 수행
  };

  const specific = async () => {
            try {
              console.log(search);
              const response = await api.post(`mv/specifics`, search)
              console.log(response.data);
              navigate(`/specifics/${search}`, { state: { data: response.data } });
            } catch (err) {
              console.log(err);
            }
          }

  const loginProc = async () => {
    const login_data = {
      id: login_id,
      password: login_pwd,
    };

    try {
      const response = await api.post("users/login", login_data);
      if (response && response.data) {
        const { username } = response.data;
        console.log(response.data);
        // sessionStorage에 username 저장
        sessionStorage.setItem('username', response.data);
        setIsLoggedIn(true);
        setUsername(response.data);

        window.alert("Successfully login");
        loginClose();
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Login failed");
    }
  };

  const registerProc = async () => {
    const register_data = {
      id: regi_id,
      username: regi_username,
      password: regi_pwd,
    };
    try {
      const response = await api.post("users/register", register_data);
      if (response) {
        window.alert("Successfully registered");
        regiClose();
        loginShow();
      }
    } catch (err) {
      console.log(err);
      window.alert("Register failed");
    }
  };

  const logoutProc = () => {
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <>
      {!isLoggedIn ? (
        <Navbar className="bg-body-tertiary justify-content-between" >
          <Form inline>
            <Button variant="primary" onClick={loginShow}>Login</Button> &nbsp;
            <Button variant="primary" onClick={regiShow}>Register</Button>
          </Form>
          <Form inline onSubmit={handleSearchSubmit}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  value={search}
                  onChange={searchHandler}
                />
              </Col>
            </Row>
          </Form>
        </Navbar>
      ) : (
        <Navbar className="bg-body-tertiary justify-content-between">
          <Form inline>
            <Button variant="primary" onClick={logoutProc}>Logout</Button> &nbsp;
            {username}
          </Form>
          <Form inline onSubmit={handleSearchSubmit}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  value={search}
                  onChange={searchHandler}
                />
              </Col>
            </Row>
          </Form>
        </Navbar>
      )}

      <Modal show={login} onHide={loginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control 
                type="text"
                placeholder="ID"
                value={login_id}
                onChange={(e) => set_login_id(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="PASSWORD"
                value={login_pwd}
                onChange={(e) => set_login_pwd(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={loginProc}>
            Login
          </Button>
          <Button variant="secondary" onClick={loginClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={register} onHide={regiClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                value={regi_id}
                onChange={(e) => set_regi_id(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="UserName"
                value={regi_username}
                onChange={(e) => set_regi_username(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="PASSWORD"
                value={regi_pwd}
                onChange={(e) => set_regi_pwd(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={registerProc}>
            Register
          </Button>
          <Button variant="secondary" onClick={regiClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;

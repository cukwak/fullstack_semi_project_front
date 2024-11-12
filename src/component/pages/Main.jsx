import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import api from "../api/axios";
import Modal from '../ui/UseModal';
import MainBox from './MainBox';
import Header from '../layout/Header';

function Main() {

  const navigate = useNavigate();
  

  useEffect(() => {

  }, [])


  return (
    <>
      <Header/>

      <MainBox />
      
    </>
  );
}

export default Main;
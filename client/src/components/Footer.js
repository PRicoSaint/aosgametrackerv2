import React from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Row,
  Image,
  Navbar,
} from "react-bootstrap";
import DDlogo from "../images/Dallas_Star1.webp";
import prsaintlogo from "../images/prsaintlogo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
        <Navbar bg="dark" variant="dark" className="centerthis" fixed="bottom" >
          <Row>
            <Col>
              <Image
                src={prsaintlogo}
                className="DDlogo"
                alt="PRSaint Logo"
              />{" "}
            </Col>
            <Col>
              <Image
                src={DDlogo}
                className="DDlogo"
                alt="Gameclub Logo"
              />
            </Col>
            <Col>
              <h6>App created by Esteban Santos</h6>
            
            </Col>
            <Col>
              <Form action="https://www.thetexasmasters.com/">
                <Button type="submit" className="spacing">Texas Masters</Button>
              </Form>
            
              <Form
                action="https://shrouded-waters-22536.herokuapp.com/"
              >
                <Button type="submit" className="spacing">My Other Work</Button>
              </Form>
            </Col>
          </Row>
      
      </Navbar>

    </div>
  );
}

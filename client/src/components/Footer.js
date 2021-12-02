import React from 'react'
import {  Container, Col, Form, Button, Row, Image } from 'react-bootstrap';
import DDlogo from '../images/Dallas_Star1.webp';
import prsaintlogo from '../images/prsaintlogo.png';
export default function Footer() {
    return (
        <>
            <Container>
        <Row>
                <Col><Image src={prsaintlogo} alt="PRSaint Logo" fluid /> </Col>
            <Col>
            <Image src={DDlogo} alt="Gameclub Logo" fluid />
            </Col>
            <Col>
            <p>
                App created by Esteban Santos
            </p>
            </Col>
            <Col>
            <Form  action="https://www.thetexasmasters.com/">
                <Button type="submit" >Texas Masters</Button>
            </Form>
            </Col>
            <Col>
            <Form class="feet" action="https://shrouded-waters-22536.herokuapp.com/">
                <Button type="submit">My Other Work</Button>
            </Form>
            </Col>
            </Row>
            </Container>
            </>
    )
}

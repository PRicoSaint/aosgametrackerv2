import React, { useState, useEffect } from 'react';
import IDK from '../images/AoSIDK.jpg'
import {  Container, Col, Form, Button, Row, Image } from 'react-bootstrap';


export default function LandingPage() {
    return (
        <div>
            <h1>Login to see your games and add more. Sign up to be able to add your own games with round information</h1>
            <Image  src={IDK}  alt="IDK Attack Nurgle" fluid />


            
        </div>
    )
}

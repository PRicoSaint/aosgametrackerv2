import React, { useState, useEffect } from 'react';
import IDK from '../images/AoSIDK.jpg'
import {  Container, Col, Form, Button, Row, Image } from 'react-bootstrap';
import './LandingPage.css';
import Footer from '../components/Footer';

export default function LandingPage() {
    return (
        <div >
            <h1 >Login to see your games and add more. Sign up to be able to add your own games with round information</h1>
            <img src={IDK} className="bgimage" />

            <Footer/>
            
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { createGame, searchGoogleBooks } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

const GameCreation = () => {
  let history = useHistory();
    // set initial form state
  const [gameData, setGameForm] = useState({ 
    name: '',
    battleplan: '',
    army: '',
    opponent: '',
    opponentarmy: '',
    victory: '',});
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setGameForm({ ...gameData, [name]: value, victory: checked });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert("Please log in!");
      console.log("please log in")
      return false;
    }
    console.log("this is the token on Line 35:", token);
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // console.log(gameData);
    try {
      const response = await createGame(gameData, token);
      
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      else{
        setShowSuccess(true);
           setTimeout(() => {  
      console.log("redirecting to game history page")
      history.push('/saved'); 
    }, 3000);
        
      }

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    
    setGameForm({
      name: '',
      battleplan: '',
      army: '',
      opponent: '',
      opponentarmy: '',
      victory: '',
    }); 
    
  }


  return (
    <>
 
      <h1>Enter New Game Information!</h1>
    <Container>
      <Form className="mb-3" noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with game creation!
        </Alert>
        <Alert dismissible onClose={() => setShowSuccess(false)} show={showSuccess} variant='success'>
          Game Successfully created!
        </Alert>

        <Form.Group >
          <Form.Label htmlFor='name'>Name of Game</Form.Label>
          <Form.Control
            type='text'
            placeholder='Game name'
            name='name'
            onChange={handleInputChange}
            value={gameData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Game Name is required</Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group>
          <Form.Label htmlFor='battleplan'>Battleplan played</Form.Label>
          <Form.Control
            type='text'
            placeholder='Savage Gains'
            name='battleplan'
            onChange={handleInputChange}
            value={gameData.battleplan}
            required
          />
          <Form.Control.Feedback type='invalid'>Battleplan is required!</Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group>
          <br />
      <Form.Label>Battleplan</Form.Label>
      <Form.Select name="battleplan" value={gameData.battleplan} onChange={handleInputChange}>
        <option>Choose...</option>
        <option value="Marking Territory">Marking Territory</option>
        <option value="Savage Gains">Savage Gains</option>
        <option value="First Blood">First Blood</option>
        <option value="Power Struggle">Power Struggle</option>
        <option value="Survival of the Fittest">Survival of the Fittest</option>
        <option value="Tectonic Interference">Tectonic Interference</option>
        <option value="Apex Predators">Apex Predators</option>
        <option value="The Vice">The Vice</option>
        <option value="Tooth and Nail">Tooth and Nail</option>
        <option value="Feral Foray">Feral Foray</option>
        <option value="Power in Numbers">Power in Numbers</option>
        <option value="The Veins of Ghur">The Veins of Ghur</option>
      </Form.Select>
      </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='army'>Your Army</Form.Label>
          <Form.Control
            type='text'
            placeholder='Stormcast Eternals'
            name='army'
            onChange={handleInputChange}
            value={gameData.army}
            required
          />
          <Form.Control.Feedback type='invalid'>Army is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='army'>Opponent Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Jeff'
            name='opponent'
            onChange={handleInputChange}
            value={gameData.opponent}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='army'>Opponent's Army</Form.Label>
          <Form.Control
            type='text'
            placeholder='Disciples of Tzeentch'
            name='opponentarmy'
            onChange={handleInputChange}
            value={gameData.opponentarmy}
            required
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label htmlFor='army'>Did you win?</Form.Label>
          <Form.Control
            type='text'
            placeholder='no'
            name='victory'
            onChange={handleInputChange}
            value={gameData.victory}
            required
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
        <Form.Label htmlFor='army'>Did you win?</Form.Label>
    <Form.Check type="checkbox" name="victory" checked={gameData.victory} onChange={handleInputChange} label="I was victorious!" />
  </Form.Group>
        <Button
          disabled={!(gameData.name&& gameData.battleplan && gameData.army)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        
      </Form>
      <br/>
      </Container>
    </>
  );
};

export default GameCreation;

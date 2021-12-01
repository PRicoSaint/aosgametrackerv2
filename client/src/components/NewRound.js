import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert } from 'react-bootstrap';
import { useHistory, Link, useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import { addRound } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

const NewRound = () => {
  let history = useHistory();

  const { id } = useParams();
  console.log(id);
  // if (!id){
  //   console.log("cannot find id of game");
  //   return false;
  // }
  // set initial form state
const [roundData, setRoundForm] = useState({ 
  roundNumber: '',
  battletactic: '',
  btcomplete: '',
  heroicactiontop: '',
  heroicactionbottom: '',
  victorypoints: '',});
// set state for form validation
const [validated] = useState(false);
// set state for alert
const [showAlert, setShowAlert] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);


const handleInputChange = (event) => {
  const { name, value, checked } = event.target;
  setRoundForm({ ...roundData, [name]: value, btcomplete: checked });
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
  console.log("this is roundData line 55: ",roundData);
  console.log("this is id line 56: ",id);

  try {
    const response = await addRound(id, roundData, token);
    
    if (!response.ok) {
      throw new Error('something went wrong!');
    }
    else{
      setShowSuccess(true);
  //        setTimeout(() => {  
  //   console.log("redirecting to game history page")
  //   history.push('/saved'); 
  // }, 3000);
      
    }

  } catch (err) {
    console.error(err);
    setShowAlert(true);
  }
  
  setRoundForm({
    roundNumber: '',
    battletactic: '',
    btcomplete: '',
    heroicactiontop: '',
    heroicactionbottom: '',
    victorypoints: '',
  }); 
  };
  return (
    <>
     <h1>Enter New Round Information!</h1>
    <Container>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with the saving of this round!
        </Alert>
        <Alert dismissible onClose={() => setShowSuccess(false)} show={showSuccess} variant='success'>
          Round Successfully saved!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='roundNumber'>Round Number</Form.Label>
          <Form.Control
            type='number'
            placeholder='1'
            name='roundNumber'
            onChange={handleInputChange}
            value={roundData.roundNumber}
            required
          />
          <Form.Control.Feedback type='invalid'>Round Number is required</Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group>
          <Form.Label htmlFor='battleplan'>Battleplan played</Form.Label>
          <Form.Control
            type='text'
            placeholder='Conquer'
            name='battleplan'
            onChange={handleInputChange}
            value={roundData.battleplan}
            required
          />
          <Form.Control.Feedback type='invalid'>Battleplan is required!</Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group>
          <br />
      <Form.Label>Battle Tactic chosen</Form.Label>
      <Form.Select name="battletactic" value={roundData.battletactic} onChange={handleInputChange}>
        <option>Choose...</option>
        <option value="Broken Ranks">Broken Ranks</option>
        <option value="Conquer">Conquer</option>
        <option value="Slay the Warlord">Slay the Warlord</option>
        <option value="Ferocious Advance">Ferocious Advance</option>
        <option value="Bring It Down!">Bring It Down!</option>
        <option value="Aggressive Expansion">Aggressive Expansion</option>
        <option value="Monstrous Takeover">Monstrous Takeover</option>
        <option value="Savage Spearhead">Savage Spearhead</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='army'>Battle tactic completed?</Form.Label>
    <Form.Check type="checkbox" name="btcomplete" checked={roundData.btcomplete} onChange={handleInputChange} label="Completed" />
    {/* <Form.Check type="checkbox" name="btcompletewithmonster" checked={roundData.btcomplete} onChange={handleInputChange} label="Completed with monster" /> */}
  </Form.Group>
  <Form.Group>
          <br />
      <Form.Label>Heroic Action chosen - Top of Round</Form.Label>
      <Form.Select name="heroicactiontop" value={roundData.heroicactiontop} onChange={handleInputChange}>
        <option>Choose...</option>
        <option value="Heroic Leadership">Heroic Leadership</option>
        <option value="Heroic Willpower">Heroic Willpower</option>
        <option value="Their Finest Hour">Their Finest Hour</option>
        <option value="Heroic Recovery">Heroic Recovery</option>
      </Form.Select>
      </Form.Group>
      <Form.Group>
          <br />
      <Form.Label>Heroic Action chosen - Bottom of Round</Form.Label>
      <Form.Select name="heroicactionbottom" value={roundData.heroicactionbottom} onChange={handleInputChange}>
        <option>Choose...</option>
        <option value="Heroic Leadership">Heroic Leadership</option>
        <option value="Heroic Willpower">Heroic Willpower</option>
        <option value="Their Finest Hour">Their Finest Hour</option>
        <option value="Heroic Recovery">Heroic Recovery</option>
      </Form.Select>
      </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='victorypoints'>Victory Points scored</Form.Label>
          <Form.Control
            type='number'
            placeholder='0'
            name='victorypoints'
            onChange={handleInputChange}
            value={roundData.victorypoints}
            required
          />
          <Form.Control.Feedback type='invalid'>A number is required</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(roundData.roundNumber&& roundData.battletactic && roundData.victorypoints)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        
      </Form>
      </Container>


    </>
  );
};

export default NewRound;

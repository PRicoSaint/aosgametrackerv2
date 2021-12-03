import React, { useState, useEffect } from 'react';
import {  Container, Row, Col, Form, Button, Card, Modal, Tab, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './GameHistory.css';
import Auth from '../utils/auth';
import { getMe } from '../utils/API';
import white_warhammer from '../images/white_warhammer.svg'
import UserStats from '../components/UserStats';

// import NewRound from '../components/NewRound';

import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

const GameHistory = () => {
  // const [showNewRound, setNewRound] = useState(false);

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

// Add hammering gif here
  if (!userDataLength) {
    return <Spinner animation="border" role="status" >
    <img src={white_warhammer} style={{width:'25px', height: '25px'}} />
  </Spinner>;
  }



  return (
    <>
        <Container>
          <h1>Viewing previous Games!</h1>
        </Container>
      <Container>
        <h2>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <Row xs={1} md={2} className="g-4">
          {userData.savedGames.map((game) => {
            return (
              <Card style={{ width: '18rem' }} className="mb-2" key={game._id} border='dark'>
                <Card.Body className="centertext">
                  <Card.Title>{game.name}</Card.Title>
                  <p>Battleplan: {game.battleplan}</p>
                  <Card.Text>
                    <li>Army Played:{game.army}</li>
                    <li>Opponent:{game.opponent}</li>
                    <li>Opponent's Army:{game.opponentarmy}</li>
                    Victory?
                    <li>{game.victory == true ? 'Victory' : "Loss" }</li>
                   </Card.Text>

                   <Link to={`/saved/${game._id}`} className="btn btn-primary">Game Stats</Link>
                  {/* <Button className='btn-block btn-info' data-id={game._id} onClick={console.log("Game stats button clicked")}>
                    Game Stats
                  </Button> */}
                  {/* <Button className='btn-block btn-warning' data-id={game._id} onClick={() => setNewRound(true)}>
                    Add Round
                  </Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
      <Container>
        <UserStats/>
      </Container>
      {/* set modal data up */}
      {/* <Modal
        size='lg'
        show={showNewRound}
        onHide={() => setNewRound(false)}
        aria-labelledby='newround-modal'>
          <Modal.Header closeButton>
            <Modal.Title id='newround-modal'>
            <h1>New Round Input</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <NewRound handleModalClose={() => setNewRound(false)} />
          </Modal.Body>
      </Modal> */}
    </>
  );
};

export default GameHistory;

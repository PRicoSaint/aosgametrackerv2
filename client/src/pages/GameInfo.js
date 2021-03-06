import React, { useState, useEffect } from 'react';
import {  Container, Col, Button, Card, Modal, Spinner, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './GameHistory.css'
import Auth from '../utils/auth';
import { getGame } from '../utils/API';
import white_warhammer from '../images/white_warhammer.svg'

import NewRound from '../components/NewRound';

import { saveGameIds, getSavedGameIds } from '../utils/localStorage';



export default function GameInfo() {
    const [gameData, setGameData] = useState({});
  const [showNewRound, setNewRound] = useState(false);
    const { id } = useParams();
    

    // use this to determine if `useEffect()` hook needs to run again
    const gameDataLength = Object.keys(gameData).length;
    const getgameData = async () => {
        try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;
  
          if (!token) {
              console.log("PLEASE LOG IN");
            return false;
          }
  
          const response = await getGame(id);
  
          if (!response.ok) {
            throw new Error('something went wrong!');
          }
  
          const game = await response.json();
          console.log("line 39 game data: ",game);
          setGameData(game);
        } catch (err) {
          console.error(err);
        }
      };


    useEffect(() => {
    //   const getgameData = async () => {
    //     try {
    //       const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    //       if (!token) {
    //           console.log("PLEASE LOG IN");
    //         return false;
    //       }
  
    //       const response = await getGame(id);
  
    //       if (!response.ok) {
    //         throw new Error('something went wrong!');
    //       }
  
    //       const game = await response.json();
    //       console.log("line 39 game data: ",game);
    //       setGameData(game);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
  
      getgameData();
    }, [gameDataLength]);
  
  // Add hammering gif here
    if (!gameDataLength) {
      return <Spinner animation="border" role="status">
          <img src={white_warhammer} style={{width:'25px', height: '25px'}} />
    </Spinner>;
    }

    return (
        <div>
          <Row>
              <Card style={{ width: '30rem' }} className="mb-2 cardcenter" key={gameData._id} border='dark'>
                <Card.Body >
                  <Card.Title>{gameData.name}</Card.Title>
                  <p>Battleplan: {gameData.battleplan}</p>
                  <Card.Text><ul>
                    <li>Army Played:{gameData.army}</li>
                    <li>Opponent:{gameData.opponent}</li>
                    <li>Opponent's Army:{gameData.opponentarmy}</li>
                    Victory?
                    <li>{gameData.victory == true ? 'Victory' : "Loss" }</li>
                   </ul></Card.Text>

                   <Button className='btn-block btn-info' data-id={gameData._id} onClick={console.log("Game Finished!")}>
                    Finish Game
                  </Button>
                  <Button className='btn-block btn-warning' data-id={gameData._id} onClick={() => setNewRound(true)}>
                    Add Round
                  </Button>
                </Card.Body>
              </Card>
              </Row>
              <Container>
          <h1> Saved Rounds</h1>
        </Container>
      <Container>
        <h2>
          {gameData.rounds.length
            ? `Viewing ${gameData.rounds.length} saved ${gameData.rounds.length === 1 ? 'round' : 'rounds'}:`
            : 'You have no saved rounds! Click the button to add a round!'}
        </h2>
        <Row xs={1} md={2} className="g-4">
          {gameData.rounds.map((round) => {
            return (
              <Card style={{ width: '18rem' }} className="mb-2" key={round.roundNumber} border='dark'>
                <Card.Body >
                  <Card.Title>Round {round.roundNumber}</Card.Title>
                  <p>Battle Tactic Chosen: {round.battletactic}{round.btcomplete ? "???" : "???" }</p>
                  <Card.Text><ul>
                    <li>Heroic Action chosen - Top of Round:{round.heroicactiontop}</li>
                    <li>Heroic Action chosen - Bottom of Round:{round.heroicactionbottom}</li>
                    <li>Victory Points scored: {round.victorypoints}</li>
                   </ul></Card.Text>
                </Card.Body>
              </Card>
              
            );
          })}
          </Row>
      </Container>
      
            <Modal
        size='lg'
        show={showNewRound}
        onHide={() => setNewRound(false)}
        onExiting={()=> getgameData()}
        aria-labelledby='newround-modal'>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
          <NewRound handleModalClose={() => setNewRound(false)} />
          </Modal.Body>
      </Modal>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import {  Container, Col, Form, Button, Card, Modal, Tab } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import { getGame } from '../utils/API';

import NewRound from '../components/NewRound';

import { saveGameIds, getSavedGameIds } from '../utils/localStorage';



export default function GameInfo() {
    const [gameData, setGameData] = useState({});
  const [showNewRound, setNewRound] = useState(false);
    const { id } = useParams();
    

    // use this to determine if `useEffect()` hook needs to run again
    const gameDataLength = Object.keys(gameData).length;
  
    useEffect(() => {
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
  
      getgameData();
    }, [gameDataLength]);
  
  // Add hammering gif here
    if (!gameDataLength) {
      return <h2>LOADING...</h2>;
    }

    return (
        <div>
              <Card key={gameData._id} border='dark'>
                <Card.Body>
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
      
            <Modal
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
      </Modal>
        </div>
    )
}

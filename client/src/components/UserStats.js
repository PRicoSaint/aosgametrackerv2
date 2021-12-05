import React, { useState, useEffect } from "react";
import { getUserGames } from "../utils/API";
import {
  ListGroup,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Alert,
} from "react-bootstrap";
import Auth from '../utils/auth';


export default function UserStats() {
  const [allUserGamesData, setUserGamesData] = useState({});

  const allUserGamesLength = Object.keys(allUserGamesData).length;
  useEffect(() => {
    const allUserGames = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }
        const response = await getUserGames(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const data = await response.json();
        setUserGamesData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    allUserGames();
  }, [allUserGamesLength]);
// Data manipulation here (its really array manipulation with simple math lol)
let totalGames = allUserGamesData.length;
let winCounter = 0;
for (let i=0;i<allUserGamesData.length;i++){
    if(allUserGamesData[i].victory === true){
        winCounter = winCounter+1;
    }
}

const winLossPercent = (((winCounter)/totalGames)*100).toFixed(2);

// TODO: Calculate average victory points
// const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

// let vpArray=[];
// for (let i=0;i<allUserGamesData.length;i++){
//     if(allUserGamesData.rounds){

//     }
    
//     vpArray.push(allUserGamesData[]
// }

// Most played army









  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Past Games</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Win%:{winLossPercent}</ListGroup.Item>
          <ListGroup.Item>Most Played Army: </ListGroup.Item>
          <ListGroup.Item>Average Victory Points</ListGroup.Item>
          <ListGroup.Item>Most played Battleplan:</ListGroup.Item>
          <ListGroup.Item>Worst Army to play against</ListGroup.Item>
          <ListGroup.Item>Battle Tactic Most completed</ListGroup.Item>
          <ListGroup.Item>Battle Tactic Most Failed</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

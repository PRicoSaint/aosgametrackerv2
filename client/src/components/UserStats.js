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
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Past Games</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Win%:</ListGroup.Item>
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

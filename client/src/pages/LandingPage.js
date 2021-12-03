import React, { useState, useEffect } from "react";
import IDK from "../images/AoSIDK.jpg";
import {
  Container,
  Col,
  Form,
  Button,
  Row,
  Image,
  Table,
} from "react-bootstrap";
import "./LandingPage.css";
import Footer from "../components/Footer";
import { getAllGames } from "../utils/API";

export default function LandingPage() {
  const [allGameData, setAllGameData] = useState({});

  const allGameDataLength = Object.keys(allGameData).length;
  useEffect(() => {
    const allGameData = async () => {
      try {
        const response = await getAllGames();

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const data = await response.json();
        setAllGameData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    allGameData();
  }, [allGameDataLength]);
  let allVPs = 0;
  for(let i=0;i<allGameData.length;i++){
    
    allVPs = allGameData[i].totalVPs+allVPs;
  }

  

  return (
    <div>
        <Table className="formattable" striped bordered hover size="sm" variant="dark">
          <h6>Community Data</h6>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td>Games Played</td>
            <td>{allGameData.length}</td>
          </tr>
          <tr>
            <td>Victory Points Scored</td>
            <td>{allVPs}</td>
          </tr>
          <tr>
            <td>Battle Tactics Completed</td>
            <td>MANY MORE</td>
          </tr>
        </tbody>
      </Table>
      <h1>
        Login to see your games and add more. Sign up to be able to add your own
        games with round information
      </h1>
      <img src={IDK} className="bgimage" />
      <Footer />
    </div>
  );
}

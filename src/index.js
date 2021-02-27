import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Row} from 'react-bootstrap';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const letters = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
const audioClips = [
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', 
  'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
]
// const lists = letters.map(
//   letter => <li key={letter}>{letter}</li>
// )
const drumButton = (number = 1, classes = 'drum-pad col btn btn-primary mb-2 mr-1') => {
  return [3,6,9].indexOf(number) >= 0 ? 
  <button id={`audio${letters[number - 1]}`} className={classes.slice(0, classes.length-4)}>
    <audio
      src={audioClips[number - 1]}
      className='clip'
      id={letters[number - 1]}></audio>
    {letters[number - 1]}
  </button>
  : <button id={`audio${letters[number - 1]}`} className={classes}>
      {letters[number - 1]}
    </button>
}

function DrumMachine() {
  // eslint-disable-next-line no-unused-vars
  const [display, setDisplay] = useState('Press Key to Play')

  document.getElementById('body').addEventListener(onkeydown, playSound)
  const playSound = (e) => {
    console.log(e.keyCode)
  }

  return (
    <div id='drum-machine' className='container'>
      <div
        className='d-flex flex-row mt-4 mb-2'>
          <h2>Welcome to the Virtual Drum Machine!</h2>
      </div>
      <div className='card bg-light'>
        <div 
          className='d-flex flex-row justify-content-center mx-3 my-2 py-4'
          id='display'>{display}
        </div>
        <Row className='d-flex flex-row col-sm-8 mx-auto'>
          {drumButton(1)}
          {drumButton(2)}
          {drumButton(3)}
        </Row>
        <Row className='d-flex flex-row col-sm-8 mx-auto'>
          {drumButton(4)}
          {drumButton(5)}
          {drumButton(6)}
        </Row>
        <Row className='d-flex flex-row col-sm-8 mx-auto'>
          {drumButton(7)}
          {drumButton(8)} 
          {drumButton(9)} 
        </Row>
      </div>
    </div>
  )
}


const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Row} from 'react-bootstrap';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const letters = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
const descrip = ['Heater-1', 'Heater-2', 'Heater-3',
                 'Heater-4', 'Clap', 'Open-Hat',
                 'Kick-N-Hat', 'Kick', 'Closed-Hat']
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
const drumButton = (number = 1, func) => {
  const classes = 'drum-pad col btn btn-primary mb-2 mr-1';
  return [3,6,9].indexOf(number) >= 0 ? 
  <button 
    id={descrip[number - 1]} 
    className={classes.slice(0, classes.length-4)} 
    onClick={func}>
    <audio
      src={audioClips[number - 1]}
      className='clip'
      id={letters[number - 1]}></audio>
    {letters[number - 1]}
  </button>
  : <button 
      id={descrip[number - 1]}
      className={classes}
      onClick={func}>
    <audio
      src={audioClips[number - 1]}
      className='clip'
      id={letters[number - 1]}></audio>
      {letters[number - 1]}
    </button>
}

function DrumMachine() {
  const [display, setDisplay] = useState('Press Key to Play');

  const playSound = (e) => {
    if (e.type === 'click') {
      const clip = e.target.firstChild;
      clip.currentTime = 0;
      clip.play();
      setDisplay(e.target.id)
    } else {
      const audioletter = e.key;
      const clip = document.getElementById(audioletter.toUpperCase());
      // console.log(clip);
      // console.log(Boolean(clip));
      // console.log(parentButton);
      const parentButton = clip.parentElement
      setDisplay(parentButton.id);
      
      if (typeof clip === 'object') {
        try {
          // setDisplay()
          clip.currentTime = 0;
          clip.play()
        } catch (exception) {console.log(typeof exception)}
      } else {console.log('no key')}
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => playSound(e))
  })



  return (
    <div 
      id='drum-machine' 
      className='container'>
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
          {drumButton(1, (e) => playSound(e))}
          {drumButton(2, (e) => playSound(e))}
          {drumButton(3, (e) => playSound(e))}
        </Row>
        <Row className='d-flex flex-row col-sm-8 mx-auto'>
          {drumButton(4, (e) => playSound(e))}
          {drumButton(5, (e) => playSound(e))}
          {drumButton(6, (e) => playSound(e))}
        </Row>
        <Row className='d-flex flex-row col-sm-8 mx-auto'>
          {drumButton(7, (e) => playSound(e))}
          {drumButton(8, (e) => playSound(e))} 
          {drumButton(9, (e) => playSound(e))} 
        </Row>
      </div>
    </div>
  )
}


const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
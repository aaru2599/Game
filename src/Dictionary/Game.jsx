import  { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'];

function Game() {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [loading,setLoading]=useState(false); 

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return 'It\'s a tie!';
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  };

  const handleClick = (choice) => {
      setUserChoice(choice);
      setTimeout(() => {
       setLoading(false)
    const computerChoice = generateComputerChoice();
    const winner = determineWinner(choice, computerChoice);

    setComputerChoice(computerChoice);
    setResult(winner);
}, 1000);
setLoading(true)
  };
  const getBackgroundColor = () => {
    if(result==="You win!"){
        return "green"
    }
    if(result==="It\'s a tie!"){
        return "yellow";
    }
    else{
        return "red"
    }
  };
console.log("loading",loading);
  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <div>
        <button style={{cursor:"pointer"}} onClick={() => handleClick('rock')}>Rock</button>
        <button style={{cursor:"pointer"}} onClick={() => handleClick('paper')}>Paper</button>
        <button style={{cursor:"pointer"}} onClick={() => handleClick('scissors')}>Scissors</button>
      </div>
      <div>
        <h2>Your Choice: {userChoice}</h2>
        <h2>Computer's Choice: {loading?"Thinking...":<span>{computerChoice}</span>}</h2>
        <button style={{padding:"5px",backgroundColor:getBackgroundColor()}}>{result}</button>
      </div>
    </div>
  );
}

export default Game;

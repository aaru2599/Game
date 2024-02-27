import React, { useState, useEffect } from "react";
import { words } from "popular-english-words";

function Dictionary() {
  const [userWord, setUserWord] = useState("");
  const [userInputWord, setUserInputWord] = useState("");
  const [computerWord, setComputerWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [timer, setTimer] = useState(20); // 20 seconds for each turn
  const [dictionary, setDictionary] = useState([]);
  const [wordObj, setWordObj] = useState({});
  useEffect(() => {
    // Fetch the dictionary asynchronously
    const fetchDictionary = async () => {
      try {
        const dictionaryWords = await words.getMostPopular(500);
        setDictionary(dictionaryWords);
      } catch (error) {
        console.error("Error fetching dictionary:", error);
      }
    };

    fetchDictionary();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      endTurn();
    }

    const interval = setInterval(() => {
      if (isUserTurn) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isUserTurn]);

  useEffect(() => {
    if (!isUserTurn) {
      const computerGeneratedWord = generateComputerWord();
      setIsUserTurn(true); // Switch back to user's turn
      setUserWord(""); // Clear user's word
    }
  }, [isUserTurn]);

  useEffect(() => {
    setUserInputWord(userWord); // Update userInputWord when userWord changes
  }, [userWord]);

  const handleInputChange = (event) => {
    setUserWord(event.target.value);
    setErrorMessage("");
    // setTimer(20)

  };

  const generateComputerWord = () => {

    const randomIndex = Math.floor(Math.random() * dictionary.length);
    setComputerWord(dictionary[randomIndex]);
    return;
  };

  const endTurn = () => {
    setErrorMessage("Time's up! Game Over.");
    setIsUserTurn(!isUserTurn);
    setTimer(20);
  };
  const handleSubmit = () => {
    if (userWord === "") {
      setErrorMessage("Please enter a word!");
      return;
    }

    if (!dictionary.includes(userWord.toLowerCase())) {
      setErrorMessage("Not a valid English word!");
      return;
    }

    if (wordObj[userInputWord]) {
      setErrorMessage("You cannot send the same word twice!");
      // setTimer(20)
      return;
    }

    setIsUserTurn(false); // Switch to computer's turn
    setUserInputWord(userWord); // Update userInputWord with current userWord value
    setWordObj((prevWordObj) => ({
      ...prevWordObj,
      [userInputWord]: 1,
    }));
    setTimer(20)
    console.log("wordObj", wordObj);
  };

  return (
    <div>
      <h1>Word Game</h1>
      <div>
        {isUserTurn ? (
          <div>
            <input type="text" value={userWord} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Submit</button>
            <div>Time remaining: {timer} seconds</div>
            <div>Comp:{computerWord}</div>
            <div>User Input: {userInputWord}</div> {/* Display userInputWord */}
          </div>
        ) : (
          <div>Computer's turn...</div>
        )}
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default Dictionary;

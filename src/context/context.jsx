import React, { createContext, useState, useEffect } from "react"; // Import React and hooks
import main from "../config/Gimini.js"; // Import the Gemini API call function

export const Context = createContext(); // Create a new context object

const ContextProvider = (props) => { // Define the context provider component

    const [input, setInput] = useState(""); // State to store user input
    const[recentPromts, setRecentPrompts] = useState(""); // State to store recent prompts
    const[prevPromts, setPrevPrompts] = useState([]); // State to store previous prompts
    const[showResult, setShowResult] = useState(false); // State to store shoe results
    const [loading, setLoading] = useState(false); // State to indicate loading status
    const [resultData, setResultData] = useState(""); // State to store result data
    const [response, setResponse] = useState(""); // State to store the AI response


const delayPara = (index, nextWord) => {
    setTimeout(function() {
        setResultData(prev => prev + nextWord); // Append the next word to the result data
    }, 75 * index); // Delay each word by 75 milliseconds
}

    const newChat = () => {
        setLoading(false); // Reset loading state
        setShowResult(false); // Hide results
    }


  // Function to send a prompt to the Gemini API and update state
  const onSent = async (prompt) => {
    try {
        setResultData(""); // Clear previous result data
      setLoading(true); // Set loading state to true
        setShowResult(true); // Show results
        let result; // Variable to store the API response
        // Check if a prompt is provided, otherwise use the input state
        if (prompt !== undefined){
           result = await main(prompt); // Call the Gemini API with the prompt
            setRecentPrompts(prompt); // Update recent prompts with the current prompt
        }
        else{
            setPrevPrompts(prev => [...prev,input]); // Add current input to previous prompts array
            setRecentPrompts(input); // Update recent prompts with current input
            result = await main(input); // Call the Gemini API with the input
                
        }


    //     setRecentPrompts(input); // Update recent prompts with current input
    //     setPrevPrompts(prev => [...prev, input]); // Add current input to previous prompts array
    //   const result = await main(input); // Call the Gemini API with the prompt
      let resposeArray = result.split("**"); // Split the response into words
      let newResponse = ""; // Initialize a new response string
      for (let i = 0; i < resposeArray.length; i++) {
        if (i === 0 || i%2 !==1) {
            newResponse += resposeArray[i]; // Split each word into an array
            }
            else{
                newResponse += " <b>" + resposeArray[i] + "</b> "; // Add bold tags around every second word
            }
      }
      let newResponse2 = newResponse.split("*").join ("<br/>"); // Replace asterisks with line breaks


    //   setResultData(newResponse2); // Update result data state with the API response
      let newResponseArray = newResponse2.split(" "); // Split the response into words
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i] ;
            delayPara(i, nextWord + " "); // Call the delay function for each word
        }
      setLoading(false); // Set loading state to false
      setInput(""); // Clear the input field after sending
      setResponse(result); // Save the response in state
      console.log(result) // Log the response to the console
    } 
    catch (error) {
      console.error("Error calling Gemini API:", error); // Log any errors
    }
  };
  // Call onSent once when the component mounts, with a default prompt
  useEffect(() => {
    // onSent("What is React JS?");
  }, []);
  // Value to provide to context consumers (children components)
  const contextValue = {
    response, // The latest AI response
    onSent,   // The function to send prompts
           // State and functions for managing user input and prompts
    input,    // The current user input
    setInput, // Function to update user input      
    recentPromts, // Recent prompts state
    setRecentPrompts, // Function to update recent prompts
    prevPromts, // Previous prompts state
    setPrevPrompts, // Function to update previous prompts
    showResult, // State to control showing results
    setShowResult, // Function to update show results state
    loading, // Loading state
    setLoading, // Function to update loading state
    resultData, // Result data state
    setResultData, // Function to update result data
    newChat // Function to start a new chat

  };
  // Provide the context value to all child components
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider; // Export the provider for use in your app

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '../../photos/logo.png';
import './console.css'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Include the quill.snow.css stylesheet



export const Console = () => {
    const [isPhone, setIsPhone] = useState(window.innerWidth < 1233);
    const bannerRef = useRef(null);
    const contactBtnRef = useRef(null);
    const [text, setText] = React.useState('');
    const [plainText, setPlainText] = useState('');
    const [data, setData] = useState([]);
    const [animationActive, setAnimationActive] = useState(false);

    const [positiveCount, setPositiveCount] = useState(0);
    const [negativeCount, setNegativeCount] = useState(0);

    const progressRef = useRef(null);
    const isFirstLoad = useRef(true);





    const handleChange = (content, delta, source, editor) => {
        setText(editor.getContents()); // Update the state with the editor content
        setPlainText(editor.getText()); // Call the onTextChange prop with just the text

    };

    const startAnalysis = async () => {
        const response = await analyzeText();
        try{
           
            highlightText(data);
        
        }
        catch (error) {
        }
        
        
        
    };

    // Calls a Options API to analyze the text
    const analyzeText = async () => {
        if (!isFirstLoad.current) {
        startAnimation();
        // Split the text by periods and turn into an array of sentences
        let plainTextProcessed = plainText.split('.').map((sentence) => sentence.trim());
        // Remove special characters from the text

       

        if (plainText.length > 0) {
            try {
                const response =  await fetch('https://iv4i8ilxs4.execute-api.us-east-1.amazonaws.com/Dev/requ', {
                    method: 'OPTIONS', // Use the OPTIONS method to check if the API is available
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "input_text": plainTextProcessed }),
                });
                

                // Response will take 20 seconds to return

                // Keep the response preview in the console
                console.log(response);


    
                // Get the response preview not the entire response    
                const responseData = await response.json(); // Await the entire response

                console.log(responseData);
                highlightText(responseData);
              
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    
        // Return null if the analysis cannot be performed
        return null;
    }
    };

    

    const quillRef = useRef(null);
    const highlightText = (responseData) => {

        if (responseData['predicted_sentiment'] === undefined) {
            return;
        }

        console.log("highlightText");
        const quill = quillRef.current.getEditor();
        quill.format('color', 'black');

        // Get the text from the editor
        const text = quill.getText();
        // Split the text by periods and turn into an array of sentences
        const textProcessed = text.split('.').map((sentence) => sentence.trim());
        let indexOffset = 0;

        responseData = responseData['predicted_sentiment'];


        const regexPattern = /\d/g;
        const matches = responseData.match(regexPattern);

        // Add to Positive and Negative Count
        let positive = 0;
        let negative = 0;

        // Remove last element of matches if textprocessed last element is empty
        if (textProcessed[textProcessed.length - 1] === '') {
            matches.pop();
        }

        matches.forEach((match) => {
            if (match === '1') {
                positive++;
            }
            else {
                negative++;
            }

        });

        setPositiveCount(positive);
        setNegativeCount(negative);

        console.log(matches)
        textProcessed.forEach((sentence, index) => {
            if (matches[index] === '1') {
                const startIndex = text.indexOf(sentence, indexOffset);
                const length = sentence.length;
                quill.formatText(startIndex, length, 'background', 'green');
                indexOffset = startIndex + length;
            }
            else if (matches[index] === '0') {
                const startIndex = text.indexOf(sentence, indexOffset);
                const length = sentence.length;
                quill.formatText(startIndex, length, 'background', 'red');
                indexOffset = startIndex + length;
            }
            else {
                const startIndex = text.indexOf(sentence, indexOffset);
                const length = sentence.length;
                quill.formatText(startIndex, length, 'background', 'yellow');
                indexOffset = startIndex + length;
            }
        });
    };
    
    const startAnimation = () => {
        if (!isFirstLoad.current) {
        setAnimationActive(true);
        progressRef.current.style.animation = 'none'; // Reset animation
        void progressRef.current.offsetWidth; // Trigger reflow
        progressRef.current.style.animation = 'fill-up 20s linear forwards'; // Start animation
        // Set the animation to false after 20 seconds
        setTimeout(() => {
            setAnimationActive(false);
        }, 0);
    }
    };

    useEffect(() => {
        // Clear response data when the text changes
        setData([]);
        // Add an event listener to the window to detect when the screen is resized
        
            // Check if the screen is a phone
            progressRef.current.style.animation = 'none'; // Reset animation
            void progressRef.current.offsetWidth
            progressRef.current.style.animation = 'fill-up 1s linear forwards';
        

        // Set isFirstLoad to false after the initial animation
        setTimeout(() => {
            isFirstLoad.current = false;
        }, 1000); // Assuming initial animation duration is 1 second
    }, []);
 



    return (
        <div style={{ backgroundColor: '#5c6f24', height: '100vh', top: '0', position: 'absolute', width: '100%' }}>
            <div style={{ marginTop: '100px' }}>
                <div>
                    <div style={{}}>
                    </div>
                    <div style={{ margin: 'auto', width: '70vw', position: 'relative' }}>
                        {/* Wrapper div for ReactQuill and the button */}
                        <div style={{ position: 'relative' }}>
                            <ReactQuill style={{ height: '70vh', backgroundColor: 'white' }} theme="snow" value={text} onChange={handleChange} ref={quillRef} />
                            {/* Position the button to the left corner */}
                            {!animationActive ? <button style={{ position: 'absolute', bottom: '15vh', right: '2vw', height: '5vh', borderStyle: 'solid', borderRadius: '5px' }} onClick={startAnalysis} >Analyze</button>: <div></div>}
                            <div className="progress-container">
                                <div ref={progressRef} className={`progress-bar ${animationActive ? 'active' : ''}`} />
                            </div>
                            
                            <div style={{marginTop:'50px'}}>Number of Positive: {positiveCount}</div>
                            <div>Number of Negative: {negativeCount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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

    const handleChange = (content, delta, source, editor) => {
        setText(editor.getContents()); // Update the state with the editor content
        setPlainText(editor.getText()); // Call the onTextChange prop with just the text

    };

    


    return (
        <div style={{ backgroundColor: '#5c6f24', height: '100vh', top: '0', position: 'absolute', width: '100%' }}>
        <div style={{ marginTop: '100px' }}>
            <div>
                <div style={{}}>
                </div>
                <div style={{ margin: 'auto', width: '70vw', position: 'relative' }}>
                    {/* Wrapper div for ReactQuill and the button */}
                    <div style={{ position: 'relative' }}>
                        <ReactQuill style={{ height: '70vh' }} theme="snow" value={text} onChange={handleChange} />
                        {/* Position the button to the left corner */}
                        <button style={{ position: 'absolute', bottom: 0, right: '2vw', height:'5vh', borderStyle:'solid', borderRadius:'5px'}}>Analyze</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

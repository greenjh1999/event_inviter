import React, { useState } from "react";
import axios from "axios";
import './App.css'
import emailValidator from 'email-validator'; // Import the email validation library

function Invitation() {
    const [name, setName] = useState('');
    const [emailList, setEmailList] = useState('');
    const [emailSubject, setEmailSubject] = useState('')
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailsArray = emailList.split(' ');
    
        if (emailsArray.every(emailValidator.validate)) {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('emailList', emailList);
                formData.append('emailSubject', emailSubject);
                formData.append('message', message);
                formData.append('attachment', attachment); // Attach the selected file
                
    
                const response = await axios.post('http://localhost:3001/submit-invitation', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Response from server', response.data);
            } catch (error) {
                console.error('Error', error);
            }
        } else {
            console.error('Invalid email addresses');
        }
    };


   
    console.log(attachment)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAttachment(file);
        console.log(file)
    }
    

    return (
        <div className="Form-Container">
            <form onSubmit={handleSubmit}>
                <label>From: (Enter your name or email)</label>
                <input
                    className="name-input-field"
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Subject Field:</label>
                <input
                    className="subject-input-field"
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                />

                <label>Enter Emails to Send (separated by spaces):</label>
                <textarea
                    className="emails-input-field"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                />

                <label>Message to Send:</label>
                <textarea
                    className="message-input-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="button-container">
                 <label>Attach File: </label>
                <div className="button-group">
                    <input
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                />
                <button className="submit-button" type="submit">Submit</button>
                </div>
            </div>
        </form>
                <p></p>
    </div>
    );
}

export default Invitation;
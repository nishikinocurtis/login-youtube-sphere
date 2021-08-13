import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthingDialog from './App';
import reportWebVitals from './reportWebVitals';
import ProfileIndex from "./ProfileIndex";
import axios from 'axios';

const mockSync = (user) => {
    console.log(user);
}
const actualSync = (user) => {
    const baseURL = "https://social.qmcurtis.me/api/"
    const config = {
        method: 'post',
        baseURL: "https://aws.nicegoodthings.com/",
        timeout: 36000,
        responseType: 'json',
        data: {
            userId: user.id,
            nickname: user.username || "",
            liked: ""
        },
        url: "/user"
    }
    console.log(config);
    axios.request(config).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log("axios err external register", err);
    })
}

ReactDOM.render(
  <React.StrictMode>
      <ProfileIndex serverSync={actualSync}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

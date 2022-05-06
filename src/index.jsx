import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { io } from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import InitApp from './InitApp.jsx';

const socket = io();

ReactDOM.render(
  <InitApp socket={socket} />,
  document.getElementById('app'),
);

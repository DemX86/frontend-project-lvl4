import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';

import InitApp from './InitApp.jsx';

const socket = io();

ReactDOM.render(
  await InitApp(socket),
  document.getElementById('app'),
);

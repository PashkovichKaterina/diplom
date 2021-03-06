import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/application/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();

import '@backstage/cli/asset-types';
// import { TeamCloudProvider } from '@internal/plugin-teamcloud';
import { TeamCloudAuthProvider } from '@internal/plugin-teamcloud/src/providers/TeamCloudAuthProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <TeamCloudAuthProvider >
        <App />
    </TeamCloudAuthProvider >
    , document.getElementById('root'));

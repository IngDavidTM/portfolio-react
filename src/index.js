import React from 'react';
import ReactDOM from 'react-dom/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';
import App from './App';

// Icon CSS ships in the bundle, so prerendered icons are sized before JS runs
config.autoAddCss = false;

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production pages arrive prerendered (scripts/prerender.js): attach to that
// markup instead of throwing it away. The dev server sends an empty root.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n.ts';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical: Could not find 'root' element in the DOM.");
}

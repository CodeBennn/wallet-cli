import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@pages/App';
import './wdyr';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

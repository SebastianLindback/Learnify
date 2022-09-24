import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import "./sass/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './context/StoreContext';
import { configureStore } from './redux/store/ConfigureStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = configureStore();
root.render(
  <Router>
    <StoreProvider>
      <Provider store={store}>
      <App></App>
      </Provider>
    </StoreProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

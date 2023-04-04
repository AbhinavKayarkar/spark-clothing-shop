import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { appRoutes } from './routes/appRoutes/appRoutes';

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Header />
        <main>{appRoutes}</main>
        <Footer />
      </HashRouter>
    </React.Fragment>
  );
}

export default App;

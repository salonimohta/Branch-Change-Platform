import React from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import AdminHome from './core/AdminHome'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Header />
      <br/>
      <AdminHome />
      <br/>
      <Footer />
    </div>
  );
}

export default App;

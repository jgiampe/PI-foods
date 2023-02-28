import React from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';

import {Create, Detail, Error, Home, Splash} from './views/index.js'
import Nav from './components/Nav/Nav.jsx'

function App() {

  return (
    <div  className='App'>
      <Nav/> 
      
      <Routes>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/home/:name' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/detail/:id' element={<Detail/>}/> 
        <Route path='*' element={<Error/>}/>
        <Route path="/" element={<Splash/>}/>
      </Routes>
    </div>
  );
}

export default App;

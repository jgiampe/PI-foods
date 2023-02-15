import React,{useState, useEffect} from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <div  className='App'>
      
      <Nav onSearch={onSearch} random={random} remove={remove} logout={logout}/>
      
      <Routes>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/create' element={<Create/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path="/" element={<Welcome/>}/>
      </Routes>
    </div>
  );
}

export default App;

import React, {useLayoutEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './components/pages/SignInPage';
import {tokenValid} from './common/CustomerApi';
function App() {
  const [loginState, setLoginState] = useState<boolean>(false)

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    if (token && tokenValid(token)) {
      setLoginState(true)
      console.log("Logged in")
    }
  }, [])


  return (
    <div className="App">
      <Header loggedIn={loginState} />
      <Routes>
        <Route path="signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;

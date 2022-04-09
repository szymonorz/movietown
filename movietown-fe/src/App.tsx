import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './components/pages/SignInPage';
import CustomerAccount from './components/customer_components/CustomerAccount';
import CustomerPage from './components/pages/CustomerPage';
import CustomerChangePassword from './components/customer_components/CustomerChangePassword';
import MovieListPage from './components/pages/MovieListPage';
import ScreeningListPage from './components/pages/ScreeningListPage';
function App() {
  const [loginState, setLoginState] = useState<boolean>(false)

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setLoginState(true)
      console.log("Logged in")
    }
  }, [])


  return (
    <div className="App">
      <Header loggedIn={loginState} />
      <Routes>
        <Route path="signin" element={<SignInPage loginState={loginState} setLoginState={setLoginState} />} />
        <Route path="account" element={<CustomerPage setLoginState={setLoginState} />}>
          <Route path="info" element={<CustomerAccount loginState={loginState} setLoginState={setLoginState} />} />
          <Route path="password" element={<CustomerChangePassword/>} />
        </Route>
        <Route path="search" element={<MovieListPage/>}/>
        <Route path="screening" element={<ScreeningListPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

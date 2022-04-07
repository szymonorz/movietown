import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './components/pages/SignInPage';
import CustomerAccount from './customer_components/CustomerAccount';
import CustomerPage from './customer_components/CustomerPage';
import CustomerChangePassword from './customer_components/CustomerChangePassword';
import MovieListPage from './components/pages/MovieListPage';
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
        <Route path="account" element={<CustomerPage />}>
          <Route path="info" element={<CustomerAccount />} />
          <Route path="password" element={<CustomerChangePassword/>} />
        </Route>
        <Route path="search" element={<MovieListPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

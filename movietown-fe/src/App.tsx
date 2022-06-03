import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './components/pages/SignInPage';
import CustomerAccount from './components/customer_components/CustomerAccount';
import CustomerPage from './components/pages/CustomerPage';
import CustomerChangePassword from './components/customer_components/CustomerChangePassword';
import MovieListPage from './components/pages/MovieListPage';
import ScreeningListPage from './components/pages/ScreeningListPage';
import MakeReservationPage from './components/pages/MakeReservationPage';
import MoviePage from './components/pages//MoviePage';
import CustomerDeleteAccount from './components/customer_components/CustomerDeleteAccount';
import { LoginStateContext } from './api/CustomerApi';
import CustomerReservations from './components/customer_components/CustomerReservations';
import HomePage from './components/pages/HomePage';
function App() {
  const [loginState, setLoginState] = useState<boolean>(true)
  const provider = useMemo(() => ({ loginState, setLoginState }), [loginState, setLoginState])
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setLoginState(false)
    }
  }, [])


  return (
    <div className="App">

      <LoginStateContext.Provider value={provider}>
        <Header/>
        <Routes>
          <Route path="" element={<HomePage />}/>
          <Route path="signin" element={<SignInPage />} />
          <Route path="account" element={<CustomerPage />}>
            <Route path="info" element={<CustomerAccount />} />
            <Route path="password" element={<CustomerChangePassword />} />
            <Route path="delete" element={<CustomerDeleteAccount />} />
            <Route path="reservations" element={<CustomerReservations />} />
          </Route>
          <Route path="reservation" element={<MakeReservationPage />} />

        </Routes>
      </LoginStateContext.Provider>
      <Routes>
        <Route path="search" element={<MovieListPage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="screening" element={<ScreeningListPage />} />

      </Routes>
    </div>
  );
}

export default App;

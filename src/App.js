import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './base/Login';
import AppBase from './base/ApplicationBase';
import { shallowEqual, useSelector } from 'react-redux';
import NotFound from './base/PageNotFound';


function App() {

  const { isAuthComplete } = useSelector(state => ({
    isAuthComplete: state.auth.isAuthComplete
  }),
    shallowEqual
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={isAuthComplete ? <AppBase /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthComplete ? <Navigate to="/" /> : <Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404 from './component/Error404';
import Login from './component/Login';
import Order from './component/Order';
import Singleview from './component/Singleview';
import View from './component/View';

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/user" element={<Order></Order>}></Route>
        <Route path="/singleview" element={<Singleview></Singleview>}></Route>
        <Route path="/user/:id" element={<View></View>}></Route>
        <Route path='*'element={<Error404></Error404>}></Route>
    </Routes>
    </>
  );
}

export default App;

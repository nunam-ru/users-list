import React from 'react';
import { Routes, Route } from "react-router-dom";

import { List } from '../../pages/List';

//Здесь определяем адреса страниц (сейчас пока одна)
export const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<List/>}></Route>
    </Routes>
  );
}
//<Route path='*' element={<NotFound/>}></Route>
export default Main;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/Layout';
import Admin from './pages/Admin';



function App() {

/*
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`https://yesno.wtf/api`);
    setData(data);
  };

  useEffect(()=> {
    getData();
  }, [])
  return (
    <Container>{JSON.stringify(data)}</Container>
  );
}

*/
return (
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='admin' element={<Admin />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

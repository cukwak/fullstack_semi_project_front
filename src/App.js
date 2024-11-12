import { BrowserRouter, redirect, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from './component/pages/Main';
import Search from './component/pages/Search';
import Details from './component/pages/Details';
// import ShopTest from './component/ShopTest';

function App() {


  return (
    <BrowserRouter>
      <h2> Fullstack mid project </h2><hr/>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/specifics/:search" element={<Search />}></Route>
        <Route path="/details/:title" element={<Details />}></Route>
        {/* <Route path="/shoptest" element={<ShopTest />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectAll from './Components/SelectAll';
import Layout from './Components/Layout';
import Insert from './Components/Insert';
import Home from './Components/Home';
import SelectByID from './Components/SelectByID';
import UpdateByID from './Components/UpdateByID';
import UpdateByIDUser from './Components/UpdateByIDUser';
import SelectAllTopic from './Components/SelectAllTopic';
import Login from './Components/Login';
import SelectAllUser from './Components/SelectAllUser';
import InsertUser from './Components/InsertUser';
import SelectByTopicName from './Components/SelectByTopicName';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route index path='/' element={<Home />} />
            <Route path='/SelectAll' element={<SelectAll />} />
            <Route path='/SelectAllTopic' element={<SelectAllTopic />} />
            <Route path='/SelectAllUser' element={<SelectAllUser />} />
            <Route path='/SelectAllTopic/SelectByTopicName/:name' element={<SelectByTopicName />} />
            <Route path='/SelectAll/SelectByID/:id' element={<SelectByID />} ></Route>
            <Route path='/SelectAll/UpdateByID/:id/:topic' element={<UpdateByID />} ></Route>
            <Route path='/SelectAllUser/UpdateByIDUser/:id' element={<UpdateByIDUser />} ></Route>
            <Route path='/Insert' element={<Insert />} />
            <Route path='/InsertUser' element={<InsertUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

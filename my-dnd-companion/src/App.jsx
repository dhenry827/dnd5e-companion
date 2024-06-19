import { useState, createContext, useEffect } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import NavBar from './components/NavBar';

import Register from './routes/Register';
import Login from './routes/Login';
import Home from './routes/Home';
import Footer from './components/Footer';
import Glossary_Ability_Scores from './routes/glossaryRoutes/Glossary_Ability_Scores';
import Glossary_Races from './routes/glossaryRoutes/Glossary_Races';
import Glossary_Classes from './routes/glossaryRoutes/Glossary_Classes';
import Glossary_Spells from './routes/glossaryRoutes/Glossary_Spells';
import Glossary_Features from './routes/glossaryRoutes/Glossary_Features';
import Glossary_Skills from './routes/glossaryRoutes/Glossary_Skills';
import Glossary_Traits from './routes/glossaryRoutes/Glossary_Traits';
import Characters from './components/Characters';
import CharacterSheet from './components/CharacterSheet';

//Context for user information
export const UserDataContext = createContext();

//Context for user(s) character data
export const CharacterDataContext = createContext();


function App() {
  //State for holding pseudo-user information
  const [users, setUsers] = useState([{
    username: 'AgnTurtle',
    email: 'zachnash@gmail.com',
    password: 'ilovebeingaturtle',
    characters: []
  }]);

  //State for holding user(s) character data
  const [characters, setCharacters] = useState([]);


  return (
    <>
      <div id='page'>
        {/* <Banner /> */}
        <NavBar />
        <div id='content'>

          <UserDataContext.Provider value={{ users, setUsers }}>
          <CharacterDataContext.Provider value={{ characters, setCharacters }}>
            <Routes>
              {/* Register and login routes are for future use once user database is connected */}
              {/* Not Yet Implimented
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} /> */}

              {/* Homepage route that gives explanantion of project purpose */}
              <Route path='/' element={<Home />} />

              {/* Characters route where created user characters are listed*/}
              <Route path='/characters' element={<Characters />} />

              {/* Route for viewing detailed information on specific user characters */}
              <Route path='/characters/:currentChar' element={<CharacterSheet />} />

              {/* Routes for viewing details of various charcter/game mechanics */}
              <Route path='/glossary/classes/:class' element={<Glossary_Classes />} />
              <Route path='/glossary/races/:race' element={<Glossary_Races />} />
              <Route path='/glossary/ability-scores' element={<Glossary_Ability_Scores />} />
              <Route path='/glossary/traits/:trait' element={<Glossary_Traits />} />
              <Route path='/glossary/skills' element={<Glossary_Skills />} />
              {/* Not Yet Implimented
              <Route path='/glossary/items' element={'#'} />  */}
              <Route path='/glossary/spells' element={<Glossary_Spells />} />
              <Route path='/glossary/features' element={<Glossary_Features />} />

              {/* Route for users to view account information once user database is connected */}
              {/* Not Yet Implimented
              <Route path='/account' element={'#'} /> */}
            </Routes>
            </CharacterDataContext.Provider>
          </UserDataContext.Provider>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;

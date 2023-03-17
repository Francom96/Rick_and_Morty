import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav.jsx";
import { useState } from "react";
import  style from "react";
import { Route, Routes } from "react-router-dom";



function App () {
  const [characters, setCharacters]=useState([]);

  const onSearch = (id) => {
    const URL_BASE = "https://be-a-rym.up.railway.app/api";
    const KEY = "cefb74a014d1.3a2fcb7c005e52bcffef";

    if(characters.find((char)=>char.id === id)){
      return alert("Repetido Personaje");
    }

    fetch(`${URL_BASE}/character/${id}?key=${KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name && !characters.find((char) => char.id === data.id)) {
          setCharacters((oldChars) => [...oldChars, data]);
          // setCharacters([...characters, data]);
        } else {
          alert("Algo salió mal");
        }
      });
  };
  const onClose = (id) => {
    // porque filter.... no modifica el array original
    setCharacters(characters.filter((char) => char.id !== id));
  };

  return (
    <div className="App" style={{ padding: "25px" }}>
      <div className={style.nav}>
        <Nav onSearch={onSearch} />
      </div>
      <div>
        <Cards characters={characters} onClose={onClose} />
      </div>
    </div>
  );
}


export default App;

//git remote add origin https://github.com/Francom96/rym.git
//git branch -M main
//git push -u origin main
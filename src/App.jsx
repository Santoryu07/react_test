import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";

function App() {
  const URL = "https://rickandmortyapi.com/api/character";
  const [data, setData] = useState([]);
  const [filtered, SetFiltered] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((datos) => {
        setData(datos.results);
        SetFiltered(datos.results);
      });
  }, []);

  const filterData = (text) => {
    return data.filter((element) => 
      element.name.toLowerCase().includes(text.toLowerCase())
    );
  };

  const handleFiltered = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    SetFiltered(filterData(text));
  };

  return (
    <>
      <Nav fnSubmit={handleFiltered} />
      <main>
        {filtered.map((el) => (
          <div key={el.id} className="card">
            <div className="divImg">
              <img src={el.image} alt={el.name} />
            </div>
            <div className="divText">
              <h2>{el.name}</h2>
              <p>Especie: {el.species}</p>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;

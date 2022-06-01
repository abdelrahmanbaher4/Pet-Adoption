import { useState, useEffect, useContext } from "react";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";

const ANIMALS = ["dog", "cat", "rabbit", "bird", "reptile"];
// searching and submitting the API , pets in seatle pets in manhattan
const SearchParams = () => {
  //const location = "Seattle, WA";
  const [location, SetLocation] = useState("");
  const [animal, SetAnimal] = useState("");
  const [breed, SetBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const [pets, SetPets] = useState([]);

  // this is a function that will be called outside the render
  // useEffect : registering a function that will be called later like an event listener , finish rendering function and then call my effect
  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    // $ is a template function
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    SetPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // so you don't submit the form actually
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location {location}
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => {
              // e.target.value ===> target refren ces to parent {input} , value ===> what typed
              SetLocation(e.target.value);
              console.log(e.target.value);
            }}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              SetAnimal(e.target.value);
            }}
            onBlur={(e) => {
              SetAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              SetBreed(e.target.value);
            }}
            onBlur={(e) => {
              SetBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((k) => {
              return (
                <option key={k} value={k}>
                  {k}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Mediumorchid</option>
            <option value="#f06do6">Fog Dog</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

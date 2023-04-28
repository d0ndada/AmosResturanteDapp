import React, { useState } from 'react';
import "./Menu.css";

const Menu = () => {

  const [foodItems, setFoodItems] = useState([
    { name: 'Pizza', price: '120 :-', directions: 'Bästa pizzan i stan!', image: '' },
    { name: 'Burgare', price: '89,90 :-', directions: 'OBS! Meddela personalen angående allergier', image: 'burger.jpg' },
    { name: 'Sushi', price: '139,90 :-', directions: 'Sushi i alla former', image: 'sushi.jpg' },
    { name: 'Kebabtallrik', price: '130,90 :-', directions: 'Kommer med ris/pommes och sallad', image: 'kebabtallrik.jpg' },
    { name: 'Kebabrulle', price: '99,90 :-', directions: 'Vid mer info kontakta oss!', image: 'kebabrulle.jpg' },
  ]);

  const [customIngredients, setCustomIngredients] = useState([]);

  const handleIngredientSubmit = (event) => {
    event.preventDefault();
    const ingredientName = event.target.elements.ingredientName.value;
    setCustomIngredients([...customIngredients, ingredientName]);
    event.target.reset();
    
  };
  const handleClick = (index) => {
    const newCustomIngredients = [...customIngredients];
    newCustomIngredients.splice(index, 1);
    setCustomIngredients(newCustomIngredients);
  }

  return (
    <div className='Menu'>
      <h1>Här är några av våra mest populära rätter!</h1>

      {foodItems.map((food, index) => (
        <div key={index}>
          <img src={food.image} alt={food.name} />
          <h2>{food.name}</h2>
          <p>{food.price}</p>
          <p>{food.directions}</p>
        </div>
      ))}

      <h2>Bygg en egen rätt:</h2>
      <form onSubmit={handleIngredientSubmit}>
        <label htmlFor="ingredientName">Välj kött:</label>
        <select name="ingredientName" id="ingredientName">
          <option value="kyckling">Kyckling</option>
          <option value="Kebab">Kebab</option>
          <option value="Vegetariskt Kött">Vegetariskt Kött</option>

          
          
        </select>
        <button type="submit">Lägg till</button>
      </form>

      <form onSubmit={handleIngredientSubmit}>
        <label htmlFor="ingredientName">Välj ingrediens:</label>
        <select name="ingredientName" id="ingredientName">
          <option value="sallad">Sallad</option>
          <option value="Majs">Majs</option>
          <option value="Oliver">Oliver</option>
          <option value="Jalapenos">Jalapenos</option>
          <option value="gurka">Gurka</option>
          <option value="Tomat">Tomat</option>
          <option value="lök">Lök</option>
          
          
        </select>
        <button type="submit">Lägg till</button>
      </form>

      {customIngredients.length > 0 &&
        <div>
          <h2>Din beställning:</h2>
          <ul>
            {customIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient} <button onClick={handleClick}>Ta bort</button></li>
            ))}
          </ul>
          <button onClick={() => alert("Beställning mottagen!")}>Beställ</button>
        </div>
        
      }
    </div>
  );
}

export default Menu;

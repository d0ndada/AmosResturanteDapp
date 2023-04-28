import React, { useState } from 'react';
import "./Menu.css";

const Menu = () => {

  const [foodItems, setFoodItems] = useState([
    { name: 'Pizza', price: '120 :-', directions: 'Bästa pizzan i stan!', image: 'https://cdn-rdb.arla.com/Files/arla-se/99915790/066e6057-783e-47cb-812f-56a92cfbfca1.jpg?crop=(0,105,0,-135)&w=1200&h=630&mode=crop&ak=f525e733&hm=adbd8175' },
    { name: 'Burgare', price: '89,90 :-', directions: 'OBS! Meddela personalen angående allergier', image: 'https://pngimg.com/d/burger_sandwich_PNG4133.png' },
    { name: 'Sushi', price: '139,90 :-', directions: 'Sushi i alla former', image: 'https://receptfavoriter.se/sites/default/files/styles/recipe_4x3/public/sushi_maki_sushi_sushirullar_1200_1.jpg' },
    { name: 'Kebabtallrik', price: '130,90 :-', directions: 'Kommer med ris/pommes och sallad', image: 'https://snubben.files.wordpress.com/2008/03/kebab.jpg' },
    { name: 'Kebabrulle', price: '99,90 :-', directions: 'Vid mer info kontakta oss!', image: 'https://www.nyaoasen.se/wp-content/uploads/2020/12/rulle-gyros.png' },
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

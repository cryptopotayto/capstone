import React, { useState } from 'react';
import './App.css';
import './categories.styles.scss';
import Directory from './components/directory/directory-component';

const App = () => {

  const categoryList = [
    {
      "id": 1,
      "title": "Hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "Jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "Sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "Womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "Mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    }
  ];
  
  const [categories, setCatergories] = useState(categoryList);

  return (
    <Directory categories={categories} />
  );
}

export default App;

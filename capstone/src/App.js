import React, { useState } from 'react';
import './App.css';

const App = () => {

  const categoryList = ['hats', 'jackets', 'sneakers', 'mens', 'womens'];
  const [categories, setCatergories] = useState(categoryList);

  return (
    <div className='categories-container'>
      {categories.map(category => {
        return (
          <div className='category-container'>
            <h2>{category}</h2>
            <p>Shop Now</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;

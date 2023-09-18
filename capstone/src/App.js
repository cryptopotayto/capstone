
import './App.css';

const App() = () => {

  const [categories, setCatergories] = useState([hats, jackets, sneakers, womens, mens]);

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

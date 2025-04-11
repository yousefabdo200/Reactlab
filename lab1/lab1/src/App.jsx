import { useState, useEffect } from 'react';
import './index.css';
import Cart from './components/Cart';
import Nav from './components/nav';
import Menu from './components/menu';
import Categorie from './components/categorie';
import { BrowserRouter, Routes, Route } from "react-router";
import Search from './components/search';
import Admin from './components/admin';

import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [categores, setCategores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getMenuData = async () => {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/menu?delay=2000");

      let totalCount = 0;
      let totalPrice = 0;

      data.forEach(item => {
        if (item.isInCart) {
          totalCount += 1;
          totalPrice += item.price;
        }
      });

      setCount(totalCount);
      setPrice(totalPrice);
      setItems(data);
      setLoading(false);
    };

    getMenuData();
  }, []);

  useEffect(() => {
    const getCategoriesData = async () => {
      const { data } = await axios.get("http://localhost:5000/categories?delay=2000");
      setCategores(data);
    };

    getCategoriesData();
  }, []);

  const handleIncrement = (id) => {
    const newItems = [...items];
    const i = newItems.findIndex((item) => item.id === id);
    newItems[i] = { ...newItems[i] };
    newItems[i].count = newItems[i].count + 1;
    setCount((c) => c + 1);
    setPrice((p) => p + newItems[i].price);
    setItems(newItems);
  };

  const handleDecrement = (id) => {
    const newItems = [...items];
    const i = newItems.findIndex((item) => item.id === id);
    newItems[i] = { ...newItems[i] };
    if (newItems[i].count > 0) newItems[i].count = newItems[i].count - 1;
    setItems(newItems);
    setCount((c) => c - 1);
    setPrice((p) => p - newItems[i].price);
  };

  const handleReset = () => {
    const newItems = items.map((item) => ({ ...item, count: 0 }));
    setItems(newItems);
    setCount(0);
    setPrice(0);
  };

  const handelAddToCart = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isInCart: !item.isInCart,
          count: item.count + 1,
        };
      }
      return item;
    });

    setItems(newItems);
    setCount((prev) => prev + 1);
    const addedItem = items.find(item => item.id === id);
    setPrice((prev) => prev + (addedItem?.price || 0));
  };

  const handleCategoryClick = (categoryId) => {
    const filtered = items.filter(item => item.categoryId == categoryId);
    setFilteredItems(filtered);
  };

  const handleSearch = (term) => {
    if (!term) {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/menu/${id}`)
      .then(() => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);

        const deletedItem = items.find((item) => item.id === id);
        setCount((prevCount) => prevCount - deletedItem.count);
        setPrice((prevPrice) => prevPrice - deletedItem.count * deletedItem.price);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handelInsert = (newItem) => {
    axios.post("http://localhost:5000/menu", newItem)
      .then(({ data }) => {
        setItems((prevItems) => [...prevItems, data]);
      })
      .catch((error) => {
        console.error("Error inserting item:", error);
      });
  };

  return (
    <>
      <Nav totalCount={count} totalPrice={price} />

      <Routes>
        <Route
          path="/cart"
          element={
            <div className="p-4 space-y-4">
              <Cart
                items={items.filter((item) => item.isInCart)}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
              />
              <button onClick={handleReset} className="bg-stone-400 px-4 py-2 rounded">
                Reset
              </button>
            </div>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Search onSearch={handleSearch} />
              <Categorie items={categores} handleCategoryClick={handleCategoryClick} />
              <Menu items={filteredItems.length > 0 ? filteredItems : items} handelAddToCart={handelAddToCart} />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Admin
                items={items}
                handelDelete={handleDelete}
                handelInsert={handelInsert}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;

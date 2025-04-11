import React, { useState } from 'react';

export default function Admin({ items, handelDelete, handelInsert }) {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      handelInsert(newItem);
      setNewItem({ name: '', price: '' }); // Reset the form
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="mb-6 p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter item name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Item Price</label>
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter item price"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>
        </form>
      </div>

      <table className="table w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">
                <button
                  className="cursor-pointer transition-all hover:scale-105 text-red-500"
                  onClick={() => handelDelete(product.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

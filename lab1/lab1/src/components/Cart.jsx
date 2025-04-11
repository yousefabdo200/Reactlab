function Cart({ items, handleIncrement, handleDecrement, handleDelete }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 p-2">
          <p className="bg-gray-50 w-25 text-center">{item.name}</p>
          <p className="w-10 bg-gray-100 text-center">${item.price}</p>
          <p className="w-10 bg-gray-100 text-center">{item.count}</p>
          <button onClick={() => handleIncrement(item.id)} className="bg-blue-200 w-25">+</button>
          <button onClick={() => handleDecrement(item.id)} className="bg-gray-200 w-25">-</button>
          <button onClick={() => handleDelete(item.id)} className="bg-red-600 w-25">Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;

export default function Categorie({ items, handleCategoryClick }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <table className="table-auto border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">List</th>
          </tr>
        </thead>
        <tbody>
          {items.map((category) => (
            <tr key={category.id}>
              <td
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer hover:bg-gray-100 p-2 border"
              >
                {category.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

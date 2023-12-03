import React, { useState, useEffect } from "react";
import JsonData from "./data.json";

function JsonDataDisplay() {
  const [editablePrices, setEditablePrices] = useState({});
  const [originalData, setOriginalData] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    const savedPrices = localStorage.getItem("editablePrices");
    if (savedPrices) {
      setEditablePrices(JSON.parse(savedPrices));
    } else {
      setEditablePrices({});
    }

    setOriginalData(JsonData);
  }, []);

  const handlePriceChange = (id, event) => {
    const updatedPrices = { ...editablePrices, [id]: event.target.value };
    setEditablePrices(updatedPrices);
  };

  const handleSave = () => {
    localStorage.setItem("editablePrices", JSON.stringify(editablePrices));
  };

  const handleReset = () => {
    setEditablePrices({});
    localStorage.removeItem("editablePrices");
  };

  const handleSortByPrice = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const toggleCategory = (category) => {
    const updatedCategories = expandedCategories.includes(category)
      ? expandedCategories.filter((cat) => cat !== category)
      : [...expandedCategories, category];
    setExpandedCategories(updatedCategories);
  };

  const groupedData = originalData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const DisplayData = Object.entries(groupedData).map(([category, items]) => {
    const sortedItems = expandedCategories.includes(category)
      ? [...items].sort((a, b) => {
          if (sortDirection === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
      : items;

    return (
      <React.Fragment key={category}>
        <tr className="category-row" onClick={() => toggleCategory(category)}>
          <td colSpan="7">
            {category} {expandedCategories.includes(category) ? '[-]' : '[+]'}
          </td>
        </tr>
        {expandedCategories.includes(category) &&
          sortedItems.map((info) => (
            <tr key={info.id} className="table-row">
              <td className="column-val">{info.id}</td>
              <td className="column-val">{info.name}</td>
              <td className="column-val">
                <img className="image" src={info.image} alt={info.name} />
              </td>
              <td className="column-val">{info.category}</td>
              <td className="column-val">{info.label}</td>
              <td className="column-val">
                <input
                  type="number"
                  value={editablePrices[info.id] || info.price}
                  onChange={(e) => handlePriceChange(info.id, e)}
                  className="column-val-price"
                />
              </td>
              <td className="column-val">{info.description}</td>
            </tr>
          ))}
      </React.Fragment>
    );
  });

  return (
    <div className="table-data">
      <div className="sort-by">
        <button onClick={handleSortByPrice} className="sort-button">
          Sort by Price [ {sortDirection === "asc" ? "Ascending" : "Descending"} ]
        </button>
        <div className="parent-button">
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
          {expandedCategories.length > 0 ? (
              <>
                <th className="table-heading">ID</th>
                <th className="table-heading">Name</th>
                <th className="table-heading">Image</th>
                <th className="table-heading">Category</th>
                <th className="table-heading">Label</th>
                <th className="table-heading">Price</th>
                <th className="table-heading">Description</th>
              </>
            ) : (
              <th className="table-heading">Category</th>
            )}
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}

export default JsonDataDisplay;

import React, { useState } from "react";
import JsonData from "./data.json";
function JsonDataDisplay() {
  const [editablePrices, setEditablePrices] = useState({});

  const handlePriceChange = (id, event) => {
    const updatedPrices = { ...editablePrices, [id]: event.target.value };
    setEditablePrices(updatedPrices);
  };
  const DisplayData = JsonData.map((info) => {
    return (
      <tr className="table-row">
        <td className="column-val">{info.id}</td>
        <td className="column-val">{info.name}</td>
        <td className="column-val">
          <img className="image" src={info.image} />
        </td>
        <td className="column-val">{info.category}</td>
        <td className="column-val">{info.label}</td>
        {
		// isEditable ? (
          <input
            type="number"
            value={editablePrices[info.id] || info.price}
            onChange={(e) => handlePriceChange(info.id, e)}
			className="column-val-price"
          />
        // 
	}
        <td className="column-val">{info.description}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Label</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}

export default JsonDataDisplay;

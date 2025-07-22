//Packing List
import { useState } from "react";
import Item from "./Item";
export default function PackingList({ items, onPacked, onClear }) {
  const [sortVal, setSortVal] = useState("input");

  let sortedItems;
  if (sortVal === "input") sortedItems = items;
  if (sortVal === "desc")
    sortedItems = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));
  if (sortVal === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <li key={item.timestamp}>
            <Item item={item} onPacked={onPacked} />
          </li>
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortVal}
          name="sortItem"
          onChange={(e) => setSortVal(e.target.value)}
        >
          <option value="input">Sort by input</option>
          <option value="desc">Sort by Description</option>
          <option value="packed">Sort by packed Items</option>
        </select>

        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}

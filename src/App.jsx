import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const onClear = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all list ?"
    );
    if (confirm) setItems([]);
  };

  const onPacked = (id) => {
    console.log("I got here = ", id);

    const updatedItems = items.map((item) => {
      if (item.timestamp === id) {
        item.packed = !item.packed;
        return item;
      } else {
        return item;
      }
    });
    console.log("filtered = ", updatedItems);

    setItems(updatedItems);
  };

  const deleteItem = (id) => {
    const otherItems = items.filter((item) => item.timestamp !== id);
    setItems(otherItems);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onPacked={onPacked}
        onDelete={deleteItem}
        onClear={onClear}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

//Logo
export function Logo() {
  return <h1 className="logo"> 🧑‍🚀 Far away 💼</h1>;
}

//Form
export function Form({ onAddItem }) {
  const [qty, setQty] = useState(1);
  const [desc, setDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (desc === "") {
      return;
    }
    onAddItem({ qty, desc, timestamp: Date.now(), packed: false });
    setDesc("");
    setQty(1);
  };

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need for your 😍 trip</h3>
      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...Add item"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

//Packing List

export function PackingList({ items, onPacked, onDelete, onClear }) {
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
            <input
              type="checkbox"
              name="packed"
              checked={item.packed}
              onChange={() => onPacked(item.timestamp)}
            />
            <div style={item.packed ? { textDecoration: "line-through" } : {}}>
              <span>{item.qty} </span>
              <span>{item.desc}</span>
            </div>
            <button onClick={() => onDelete(item.timestamp)}>❌</button>
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

//Stats
export function Stats({ items }) {
  const totalItems = items.length;
  const totalPackedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Number(
    Math.round((totalPackedItems / totalItems) * 100),
    2
  );
  return (
    <div className="stats">
      🙉You have {totalItems} items o the list and you have already packed{" "}
      {totalPackedItems} items ({percentagePacked})%
    </div>
  );
}

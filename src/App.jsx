import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((items) => [...items, newItem]);
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
      <PackingList items={items} onPacked={onPacked} onDelete={deleteItem} />
      <Stats />
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
export function PackingList({ items, onPacked, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
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
    </div>
  );
}

//Stats
export function Stats() {
  return (
    <div className="stats">
      🙉You have X items o the list and you have already packed X items
    </div>
  );
}

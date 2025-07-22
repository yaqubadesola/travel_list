import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList items={items} />
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
    <div className="add-form">
      <h3>What do you need for your 😍 trip</h3>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
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
    </div>
  );
}

//Packing List
export function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.timestamp}>
            <span>{item.qty}</span>
            <span>{item.desc}</span>
            <span>❌</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

//Stats
export function Stats() {
  return <div className="stats">Stats</div>;
}

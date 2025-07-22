import { useState } from "react";
export default function Form({ onAddItem }) {
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

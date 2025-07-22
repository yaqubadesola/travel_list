import { useState } from "react";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Form from "./Form";
import Logo from "./Logo";

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

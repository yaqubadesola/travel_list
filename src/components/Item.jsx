function Item({ onPacked, onDelete, item }) {
  return (
    <>
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
    </>
  );
}

export default Item;

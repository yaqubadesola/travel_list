//Stats
export default function Stats({ items }) {
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

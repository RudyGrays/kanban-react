import { useState, type DragEvent } from "react";

import "./App.css";
import {
  items as itemsData,
  types as typesData,
  type Item,
  type TypeItem,
} from "./data";
import KanbanBoard from "./KanbanBoard";
import List from "./List";

function App() {
  const [items, setItems] = useState<Item[]>(itemsData);
  const [types, setTypes] = useState<TypeItem[]>(typesData);
  const [viewType, setViewType] = useState<"kanban" | "list">("list");

  return (
    <div className="max-w-[90vw]">
      <button
        onClick={() =>
          setViewType((prev) => (prev === "kanban" ? "list" : "kanban"))
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {viewType === "kanban" ? "List View" : "Kanban Board"}
      </button>
      <h1 className="mb-5">
        {viewType === "kanban" ? "Kanban Board" : "List View"}
      </h1>
      {viewType === "kanban" ? (
        <KanbanBoard items={items} setItems={setItems} types={types} />
      ) : (
        <List items={items} setItems={setItems} types={types} />
      )}
    </div>
  );
}

export default App;

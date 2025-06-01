import React from "react";
import type { Item, TypeItem } from "./data";

const List = ({
  items,
  types,
  setItems,
}: {
  items: Item[];
  types: TypeItem[];
  setItems: (items: Item[]) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <h3>{item.name}</h3>
          {types.find((type) => type.id === item.type_id)?.name}
        </div>
      ))}
    </div>
  );
};

export default List;

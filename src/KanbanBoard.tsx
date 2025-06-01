import { useState, type Dispatch, type DragEvent } from "react";
import type { Item, TypeItem } from "./data";

const KanbanBoard = ({
  items,
  types,
  setItems,
}: {
  items: Item[];
  types: TypeItem[];
  setItems: Dispatch<React.SetStateAction<Item[]>>;
}) => {
  const [currentDraggedItem, setCurrentDraggedItem] = useState<Item | null>(
    null
  );
  const [currentDraggedItemType, setCurrentDraggedItemType] = useState<
    number | null
  >(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, currentItem: Item) => {
    e.stopPropagation();
    e.currentTarget.classList.add("border-gray-500");
    setCurrentDraggedItem(currentItem);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, currentItem?: Item) => {
    e.preventDefault();
    if (e.currentTarget.dataset.typeid) {
      setCurrentDraggedItemType(Number(e.currentTarget.dataset.typeid));
    } else {
      setCurrentDraggedItemType(null);
    }
    if (currentItem !== currentDraggedItem) return;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, currentItem?: Item) => {
    e.preventDefault();
    setCurrentDraggedItemType(null);
    const typeId = e.currentTarget.dataset.typeid;

    if (typeId) {
      setItems((prev) =>
        prev.map((item) => {
          if (currentDraggedItem && item.id === currentDraggedItem.id)
            item.type_id = Number(typeId);
          return item;
        })
      );
    }
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>, currentItem: Item) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-gray-500");
    e.currentTarget.classList.add("border-blue-500");
    setCurrentDraggedItemType(null);
    setCurrentDraggedItem(null);
  };

  return (
    <div className="w-full  transition-all duration-300 flex gap-2.5 overflow-x-auto">
      {types.map(({ id, name }) => {
        return (
          <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            data-typeid={id}
            key={id}
            className="min-w-40  transition-all duration-300 rounded-md border-blue-500  border-2 flex flex-col gap-2 p-2"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-center">{name}</h2>
              <div className="flex flex-col gap-4">
                {items
                  .filter((item) => item.type_id === id)
                  .sort((a, b) => b.id - a.id)
                  .map((item) => {
                    const { id, name } = item;
                    return (
                      <div
                        onDrop={(e) => handleDrop(e, item)}
                        onDragOver={(e) => handleDragOver(e, item)}
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={(e) => handleDragEnd(e, item)}
                        data-itemid={id}
                        key={id}
                        draggable={true}
                        className="w-full cursor-grab min-h-20 rounded-md border-blue-500 border-dashed border-2"
                      >
                        {name}
                      </div>
                    );
                  })}
              </div>
            </div>
            {currentDraggedItemType && currentDraggedItemType == id && (
              <div className="h-full w-full flex items-center justify-center text-7xl">
                +
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

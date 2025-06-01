export interface Item {
  id: number;
  name: string;
  type_id: number;
}

export interface TypeItem {
  id: number;
  name: string;
}

export const items: Item[] = [
  { id: 1, name: "Item 1", type_id: 1 },
  { id: 2, name: "Item 2", type_id: 2 },
  { id: 3, name: "Item 3", type_id: 1 },
  { id: 4, name: "Item 4", type_id: 4 },
];

export const types: TypeItem[] = [
  { id: 1, name: "Выполнено" },
  { id: 2, name: "В процессе" },
  { id: 3, name: "На паузе" },
  { id: 4, name: "Отложено" },
  { id: 5, name: "Отменено" },
];


import Item, { ItemProps } from "./item";

interface ItemsGrid {
  itemsList: ItemProps[];
}

export default function ItemsGrid({itemsList}: ItemsGrid) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {itemsList.map((item) => {
        return (
          <Item key={item.id} {...item} />
        );
      })}
    </div>
  );
}

import { Item as IItem } from "@/app/ui/components/item"
import Item from "./item";

export default function ItemsGrid({itemsList}:{itemsList: IItem[]}) {
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

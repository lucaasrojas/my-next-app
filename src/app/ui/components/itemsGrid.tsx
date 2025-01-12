import Item from "./item";

export default function ItemsGrid({itemsList}:{itemsList: {id: number, name: string, description: string}[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {itemsList.map((item) => {
        return (
          <Item key={item.id} {...item} />
        );
      })}
    </div>
  );
}

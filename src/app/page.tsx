import Image from "next/image";
import ItemsGrid from "./ui/components/itemsGrid";
import { itemsToSell } from "./lib/mockedData";

export default function Home() {
  return (
      <main>
      <ItemsGrid itemsList={itemsToSell} />
      </main>
  );
}

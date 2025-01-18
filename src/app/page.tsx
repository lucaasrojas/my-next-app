import ItemsGrid from "./ui/components/itemsGrid";
import supabase from "@/app/utils/supabase";
import { ItemProps } from "@/app/ui/components/item"

export default async function Home() {
	const { data } = await supabase.from("products").select();

	return (
		<div className="w-full">
			<ItemsGrid itemsList={data as ItemProps[]} />
		</div>
	);
}

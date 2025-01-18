import { priceFormatter } from "@/app/utils";
import supabase from "@/app/utils/supabase";
import Image from "next/image";
interface ItemProps {
	params: Promise<{ id: string }>;
}
export default async function Item({ params }: ItemProps) {
	const { id } = await params;
	const { data: selectedItem } = await supabase
		.from("products")
		.select()
		.match({ id })
		.single();

	return (
		selectedItem && (
			<div className="flex w-full h-full p-4 gap-4">
				<div className="flex relative w-1/2 rounded-xl overflow-hidden" style={{maxHeight: 800}}>

				<Image src={'https://picsum.photos/200'} alt="random picture" fill  />
				</div>
				<div className="flex flex-col gap-4 w-1/2">
				<div className="w-full">
					<h1 className="text-4xl font-bold ">{selectedItem.title}</h1>

				</div>
				<div className="w-full">
					<h4 className="text-4xl font-extralight text-slate-600">{priceFormatter.format(selectedItem.price)}</h4>

				</div>
				<div className="w-full text-xl">
				<p>{selectedItem.description}</p>

				</div>
				</div>

			</div>
		)
	);
}

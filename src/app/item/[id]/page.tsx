import supabase from "@/app/utils/supabase";
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
			<div>
				<h1>{selectedItem.title}</h1>
				<p>{selectedItem.description}</p>
			</div>
		)
	);
}

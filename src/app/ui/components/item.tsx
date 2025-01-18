import { priceFormatter } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
export interface ItemProps {
	title: string;
	description: string;
	price: number;
	id: string | number;
}
export default function Item({ id, title, price }: ItemProps) {

	return (
		
			<div className="flex font-sans shadow-lg rounded-lg w-full h-36 overflow-hidden">
				<div className="flex-none w-1/4 relative">
					<Image src={'https://picsum.photos/200'} alt="random picture" fill />
				</div>
				<div className="flex flex-col justify-between p-2 w-3/4">
					<div className="flex flex-col">
						<h1 className="flex-auto text-md font-semibold text-slate-900">
							{title}
						</h1>
						<div className="text-md text-slate-500">
							{priceFormatter.format(price)}
						</div>
					</div>

					<div className="flex text-sm font-medium align-between">
						<div className="flex-auto flex space-x-4">
							<button
								className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:bg-gray-600"
								type="submit"
							>
								<Link href={`/item/${id}`}>Ver Mas</Link>
							</button>
							{/* <button
								className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
								type="button"
							>
								Add to bag
							</button> */}
						</div>
						{/* <button
							className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
							type="button"
							aria-label="Like"
						>
							<svg
								width="20"
								height="20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								/>
							</svg>
						</button> */}
					</div>
					{/* <p className="text-sm text-slate-700">
						Free shipping on all continental US orders.
					</p> */}
				</div>
			</div>
	);
}

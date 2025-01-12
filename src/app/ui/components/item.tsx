import Link from "next/link";

export default function Item({
  id,
  name,
  description,
}: {
  id: number;
  name: string;
  description: string;
}) {
  return (
    <Link href={`/item/${id}`}>
    <div key={id} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100">
     <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    </Link>
  );
}

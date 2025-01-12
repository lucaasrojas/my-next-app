import { itemsToSell } from "@/app/lib/mockedData"

export default async function Item({params}: {params: {id: string}}) {
    const { id } = await params
    const item = itemsToSell.find((item) => item.id.toString() === id)
    return item && (
        <div>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
        </div>
    )
}
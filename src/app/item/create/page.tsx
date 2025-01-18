"use client";

import supabase from "@/app/utils/supabase";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface CreateItemFormValue {
	title: string;
	description: string;
	price: number;
	category: string;
}

export default function CreateItem() {
	const route = useRouter();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateItemFormValue>();
	useLayoutEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (session === null) {
				route.push("/login");
			}
		});
	});

	const handleFormSubmit = async (values: CreateItemFormValue) => {
		const newAdded = await supabase
			.from("products")
			.insert([
				{
					title: values.title,
					description: values.description,
					price: values.price,
					category: values.category,
				},
			])
			.select("id")
			.single();

		reset();
		if (newAdded.data?.id) {
			route.push(`/item/${newAdded.data.id}`);
		} else {
			route.push("/");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-4"
			>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="title">Title</label>
							<input
								id="title"
								type="text"
								{...field}
								className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
							/>
						</>
					)}
				/>

				{errors.title && <p>{errors.title.message}</p>}
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="description">Description</label>
							<input
								id="description"
								type="text"
								{...field}
								className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
							/>
						</>
					)}
				/>

				{errors.description && <p>{errors.description.message}</p>}
				<Controller
					name="price"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="price">Price</label>
							<input
								id="price"
								type="number"
								{...field}
								className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
							/>
						</>
					)}
				/>
				{errors.price && <p>{errors.price.message}</p>}

				<Controller
					name="category"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="category">Category</label>
							<select
								id="category"
								{...field}
								className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
							>
								<option value="" label="Select a category">
									Select a category{" "}
								</option>
								<option value="technology" label="technology">
									{" "}
									technology
								</option>
								<option value="decoration" label="decoration">
									decoration
								</option>
								<option value="clothing" label="clothing">
									clothing
								</option>
							</select>
						</>
					)}
				/>
				{errors.category && <p>{errors.category.message}</p>}

				<button type="submit">Submit</button>
			</form>
		</>
	);
}

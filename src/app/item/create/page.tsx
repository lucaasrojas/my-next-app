"use client";

import Input from "@/app/ui/components/Input";
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
		<section className="w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							Sign in to your account
						</h1>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="flex flex-col gap-4"
						>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										id="title"
										label="Title"
										{...field}
									/>
								)}
							/>

							{errors.title && <p>{errors.title.message}</p>}
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<Input
										type="text"
										id="description"
										label="Description"
										{...field}
									/>
								)}
							/>

							{errors.description && (
								<p>{errors.description.message}</p>
							)}
							<Controller
								name="price"
								control={control}
								render={({ field }) => (
									<Input
										type="number"
										id="price"
										label="Price"
										{...field}
									/>
								)}
							/>
							{errors.price && <p>{errors.price.message}</p>}

							<Controller
								name="category"
								control={control}
								render={({ field }) => (
									<>
										<label htmlFor="category" className="block mb-2 text-sm font-medium">
											Category
										</label>
										<select
											id="category"
											{...field}
											className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										>
											{["technology", "decoration", "clothing"].map((category) => (
												<option key={category} value={category} label={category}>
													{category}
												</option>
											))}
											
										</select>
									</>
								)}
							/>
							{errors.category && (
								<p>{errors.category.message}</p>
							)}

							<button
								type="submit"
								className="w-full bg-black hover:bg-slate-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Create
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

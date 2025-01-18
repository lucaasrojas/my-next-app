"use client";

import supabase from "@/app/utils/supabase";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

export default function CreateItem() {
    const route = useRouter()
	return (
		<>
			<Formik
				initialValues={{
					title: "",
					description: "",
					price: 0,
					category: "",
				}}
				validate={(values) => {
					const errors = {};
					if (!values.title) {
						errors.title = "Required";
					}
					if (values.price <= 0) {
						errors.price = "Price must be greater than 0";
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					
                    const newAdded = await supabase.from("products").insert([{
                        title: values.title,
                        description: values.description,
                        price: values.price,
                        category: values.category
                    }]).select();
                    console.log(newAdded);
                    resetForm()
                    route.push('/')
					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.title}
                            className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
						/>
						{errors.title && touched.title && errors.title}
                        <label htmlFor="description">Description</label>
						<input
							type="text"
							name="description"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.description}
                            className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
						/>
						{errors.description &&
							touched.description &&
							errors.description}
                        <label htmlFor="price">Price</label>
						<input
							type="number"
							name="price"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.price}
                            className="border-solid border-2 border-sky-500 rounded-lg w-full p-2"
						/>
						{errors.price && touched.price && errors.price}
                        <label htmlFor="category">Category</label>
						<select
							name="category"
							value={values.category}
							onChange={handleChange}
							onBlur={handleBlur}
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
						{errors.category && touched.category && errors.category}

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</form>
				)}
			</Formik>
		</>
	);
}

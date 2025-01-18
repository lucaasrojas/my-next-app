"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import supabase from "../utils/supabase";
import useUserStore from "@/store/userStore";

interface FormValues {
	email: string;
	password: string;
}

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { handleSubmit, control } = useForm<FormValues>();
	const router = useRouter();
	const userStore = useUserStore((state) => state);

	const handleFormSubmit = async (values: FormValues) => {
		setLoading(true);
		try {
			supabase.auth
				.signInWithPassword({
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					if (res.error) {
						setError(res.error.message);
					} else {
						userStore.setUser(res.data.user);
						router.push("/");
					}
				});
		} catch (error) {
			console.error("An unexpected error occurred:", error);
			setError("An unexpected error occurred");
		}
		setLoading(false);
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	return (
		<section className="bg-gray-50 dark:bg-gray-900 w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="space-y-4 md:space-y-6"
						>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Email
										</label>
										<input
											type="text"
											id="email"
											{...field}
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</>
								)}
							/>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<>
										<label
											htmlFor="password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Password
										</label>
										<input
											type="password"
											id="password"
											{...field}
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</>
								)}
							/>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

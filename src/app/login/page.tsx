"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import supabase from "../utils/supabase";
import useUserStore from "@/store/userStore";
import Input from "../ui/components/Input";

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
		<section className="w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
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
									<Input
                                        type="email"
                                        id="email"
                                        label="Email"
										{...field}
                                    />
								)}
							/>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
                                    <Input
                                        type="password"
                                        id="password"
                                        label="Password"
										{...field}
                                    />
								)}
							/>
							<button
								type="submit"
								className="w-full bg-black hover:bg-slate-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

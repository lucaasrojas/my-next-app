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
			supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			}).then((res) => {
				if (res.error) {
					setError(res.error.message);
				} else {
                    userStore.setUser(res.data.user);
					router.push("/");
				}
			})
		} catch (error) {
			console.error("An unexpected error occurred:", error);
			setError("An unexpected error occurred");
		}
		setLoading(false);
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="email">email</label>
							<input type="text" id="email" {...field} />
						</>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<>
							<label htmlFor="password">Password</label>
							<input type="text" id="password" {...field} />
						</>
					)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

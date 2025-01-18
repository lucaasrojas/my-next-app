import { FC } from "react";

interface InputProps{
	id: string;
	type: HTMLInputElement["type"];
	label: string;
}

const Input: FC<InputProps> = ({ id, type, label, ...rest }) => {
	return (
		<>
			<label htmlFor={id} className="block mb-2 text-sm font-medium">
				{label}
			</label>
			<input
				type={type}
				id={id}
				{...rest}
				className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
			/>
		</>
	);
};

export default Input;

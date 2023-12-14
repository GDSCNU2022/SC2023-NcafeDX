import { useForm } from 'react-hook-form';
import React from 'react';

const options = [
    { value: 'teishoku', label: 'Option 1' },
    { value: 'don', label: 'Option 2' },
    { value: 'noodle', label: 'Option 3' },
    { value: 'curry', label: 'カレー'}
];

const DropdownForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data: any) => {
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-64 mx-auto">
        <label htmlFor="dropdown" className="text-sm font-bold">
            Dropdown Label
        </label>
        <select
            id="dropdown"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            {...register('dropdown', { required: true })}
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        <span className="text-red-500">
            {errors.dropdown && 'Dropdown is required'}
        </span>
        </div>
        <button type="submit" className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Submit
        </button>
    </form>
    );
};

export default DropdownForm;


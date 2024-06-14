"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin, useNotify } from 'react-admin';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const schema = z.object({
    email: z.string().email('Invalid email format').min(5, 'Email must be at least 5 characters'),
    password: z.string().min(3, 'Password must be at least 12 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
    const login = useLogin();
    const notify = useNotify();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data: FormValues) => {
        login({ username: data.email, password: data.password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: "url('/maxhatf6jlfxzehcfuaz.jpg')" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
                <div className="mb-4 p-4">
                    <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`p-2 border rounded-md w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4 p-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`p-2 border rounded-md w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="static inset-y-0 right-0 px-3 py-1"
                    >
                        {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

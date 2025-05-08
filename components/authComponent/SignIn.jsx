"use client"

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin=async (e) => {
        e.preventDefault();
        const response=await signIn("credentials",{
            email:signInData.email,
            password:signInData.password,
            redirect: false,
        })
        if(response.ok){
            toast.success("Login successful")
            setSignInData({
                email: '',
                password: '',
            });
            router.push("/");
        }else{
            toast.error("Invalid credentials");          
        }

    }

    return (
        <>
        <ToastContainer position='top-right'/>
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8" style={{ maxHeight: '600px' }}>
                <h2 className="text-2xl font-bold text-center text-black mb-8">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={signInData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={signInData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="********"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 top-4 right-0 pr-3 flex items-center text-gray-600 hover:text-indigo-600"
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full border bg-white hover:bg-gray-800 text-black font-semibold py-2 rounded-md transition-colors duration-300 hover:text-white"
                    >
                        Sign In
                    </button>
                    <p>Create an Account ?<Link href="/signup"><span className="text-red-500">Sign Up</span></Link></p>
                </form>
            </div>
        </div>
        </>
    );
}

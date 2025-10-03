import { useState } from "react"
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api.js";



export const SignupPage = () => {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const queryClient = useQueryClient();
    const { mutate: signupMutation, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signupMutation(formData);
    }

    return (
        <div className="flex justify-center items-center m-0 h-screen">
            <div className="shadow mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to StreamChamp
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Signup to create your own account and have fun
                </p>
                {error && (
                    <div className="alert alert-error pt-3 ">
                        <span className="text-red-500 text-sm ">{error.response.data.message}</span>
                    </div>
                )}
                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="mb-4 space-y-3">
                        <div>
                            <label htmlFor="Fullname">Fullname</label>
                        </div>
                        <input className="shadow rounded-sm p-2 w-sm bg-gray-50 outline-0"
                            id="Fullname"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullname}
                            onChange={(e) => {
                                setFormData({ ...formData, fullname: e.target.value })
                            }} />
                        <div>

                            <label htmlFor="Email">Email</label>
                        </div>
                        <input className="shadow rounded-sm p-2 w-sm bg-gray-50 outline-0"
                            id="Email"
                            type="text"
                            required
                            placeholder="john@gmail.com"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }} />
                        <div>

                            <label htmlFor="Password">Password</label>
                        </div>
                        <input className="shadow rounded-sm p-2 w-sm bg-gray-50 outline-0"
                            id="Password"
                            type="password"
                            placeholder="************"
                            required
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                            }} />
                        <div className="flex flex-row items-center mt-4">
                            <input
                                id="terms"
                                type="checkbox"
                                className="size-4 cursor-pointer
                                 bg-gray-100 border-gray-300 
                                  dark:border-gray-600 outline-0"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm font-light">
                                I accept all terms and condition
                            </label>
                        </div>
                        <button className="px-8 py-3 w-sm mt-4
                     bg-black text-white text-sm rounded-md 
                     font-semibold hover:bg-black/[0.8] 
                     hover:shadow-lg cursor-pointer"
                        >
                            {isPending ? (
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                            ) : "Create Account"}
                        </button>
                    </div>
                    <div className="flex gap-1 justify-center ">
                        <p className="font-light">Already have an account?</p>
                        <Link to={"/signin"} className="underline font-medium">signin</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
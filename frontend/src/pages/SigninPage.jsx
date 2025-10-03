import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { signin } from "../lib/api.js";
import { Link } from "react-router-dom";


export const SigninPage = () => {

    const [signinData, setSigninData] = useState({
        email: "",
        password: ""
    })


    const queryClient = useQueryClient();
    const { mutate: signinMutation, isPending, error } = useMutation({
        mutationFn: signin,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        signinMutation(signinData);
    }
    return (
        <div className="flex justify-center items-center m-0 h-screen">
            <div className="shadow mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to StreamChamp
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Signin to get all the access
                </p>

                {error && (
                    <div className="alert alert-error pt-3">
                        <span className="text-sm text-red-500">{error.response.data.message}</span>
                    </div>
                )}

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="mb-4 space-y-3">
                        <div>
                            <label htmlFor="Email">Email</label>
                        </div>
                        <input className="shadow rounded-sm p-2 w-sm bg-gray-50 outline-0"
                            id="Email"
                            type="text"
                            required
                            placeholder="john@gmail.com"
                            value={signinData.email}
                            onChange={(e) => {
                                setSigninData({ ...signinData, email: e.target.value })
                            }} />
                        <div>

                            <label htmlFor="Password">Password</label>
                        </div>
                        <input className="shadow rounded-sm p-2 w-sm bg-gray-50 outline-0"
                            id="Password"
                            type="password"
                            placeholder="************"
                            required
                            value={signinData.password}
                            onChange={(e) => {
                                setSigninData({ ...signinData, password: e.target.value })
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
                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                            ) : "signin"}
                        </button>
                    </div>
                    <div className="flex gap-1 justify-center ">
                        <p className="font-light">Don't have an account?</p>
                        <Link to={"/signup"} className="underline font-medium">signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
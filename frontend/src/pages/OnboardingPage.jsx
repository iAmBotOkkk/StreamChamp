import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboard } from "../lib/api.js";
import { Camera, MapPin } from "lucide-react"
import toast from "react-hot-toast"
import { LANGUAGES } from "../constants/index.js";

export const OnboardingPage = () => {
    const { authUser } = useAuthUser();
    const queryClient = useQueryClient()
    const [formState, setFormState] = useState({
        fullname: authUser?.fullname || "",
        bio: authUser?.bio || "",
        nativeLanguage: authUser?.nativeLanguage || "",
        learningLanguage: authUser?.learningLanguage || "",
        location: authUser?.location || "",
        profilePic: authUser?.profilePic || ""
    });

    const { mutate: onboardMutation, isPending, error } = useMutation({
        mutationFn: onboard,
        onSuccess: () => {
            toast.success("You are onboarded succesfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        },
        onError : () => {
            toast.error(error.response.data.missingFields);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault;
        onboardMutation(formState)
    }

    const handleAvatar = () => {
        const idx = Math.floor(Math.random() * 100) + 1;
        const AvatarApi = `https://avatar.iran.liara.run/public/${idx}.png`;
        
        setFormState({...formState , profilePic : AvatarApi});
        toast.success("Profile picture generated")
    }
    return (
        <div className="flex justify-center items-center m-0 h-screen">
            <div className="shadow mx-auto w-full max-w-xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <h1 className="text-center font-semibold text-2xl text-neutral-800 dark:text-neutral-200">Complete your profile</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center gap-4 mt-10">
                        <div className="rounded-full shadow bg-base-300 size-32 overflow-hidden">
                            {formState.profilePic ? (
                                <img src={formState.profilePic}
                                    alt="ProfilePic"
                                    className=" w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <Camera className="size-8 cursor-pointer text-base-content opacity-40" />
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-zinc-400">
                            click the camera icon to upload Photo
                        </p>
                    <div>
                        <button onClick={handleAvatar} className="px-8 py-3 w-full mt-4
                     bg-black text-white text-sm rounded-md 
                     font-semibold hover:bg-black/[0.8] 
                     hover:shadow-lg cursor-pointer">Generate Random Avatar</button>
                    </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullname">Fullname</label>
                        </div>
                        <input type="text"
                            id="fullname"
                            name="fulname"
                            placeholder="fullname"
                            value={formState.fullname}
                            onChange={(e) => {
                                setFormState({ ...formState, fullname: e.target.value })
                            }}
                            className="shadow rounded-sm p-2 w-full bg-gray-50 outline-0" />
                        <div>
                            <label htmlFor="bio">Bio</label>
                        </div>
                        <textarea type="text"
                            id="bio"
                            name="bio"
                            placeholder="bio"
                            value={formState.bio}
                            onChange={(e) => {
                                setFormState({ ...formState, bio: e.target.value })
                            }}
                            className="shadow rounded-sm p-2 w-full bg-gray-50 outline-0" />
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                            <div className="">
                                <label htmlFor="nativeLanguage">Native Language</label>
                                <select id="nativeLanguage"
                                    name="nativeLanguage"
                                    value={formState.nativeLanguage}
                                    onChange={(e) => {
                                        setFormState({ ...formState, nativeLanguage: e.target.value })
                                    }}
                                    className="select select-bordered  mt-3 shadow rounded-sm p-2 w-full  bg-gray-50 outline-0"
                                >
                                    <option value="" className="shadow rounded-sm p-2 cursor-pointer w-sm bg-gray-50 outline-0">Select your Native Language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`native${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="learningLanguage">Learning Language</label>
                                <select id="learningLanguage"
                                    name="learningLanguage"
                                    value={formState.learningLanguage}
                                    onChange={(e) => {
                                        setFormState({ ...formState, learningLanguage: e.target.value })
                                    }}
                                    className="select select-bordered mt-3 w-full shadow rounded-sm p-2 bg-gray-50 outline-0"
                                >
                                    <option value="" className="shadow rounded-sm p-2 cursor-pointer w-sm bg-gray-50 outline-0">Select your Learning Language</option>
                                    {LANGUAGES.map((lang) => (
                                        <option key={`learning${lang}`} value={lang.toLowerCase()}>
                                            {lang}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="location">your location</label>
                        </div>
                        <div className="relative">
                            <MapPin className="size-5 absolute top-1/2 left-1   text-base-content opacity-50 transform -translate-y-1/2" />
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={formState.location}
                                placeholder="City , Country"
                                onChange={(e) => {
                                    setFormState({ ...formState, location: e.target.value })
                                }}
                                className="shadow pl-7 rounded-sm p-2 w-full bg-gray-50 outline-0"
                            />
                        </div>
                        <div>
                        </div>
                    </div>
                    <button className="px-8 py-3 w-full mt-4
                     bg-black text-white text-sm rounded-md 
                     font-semibold hover:bg-black/[0.8] 
                     hover:shadow-lg cursor-pointer">{!isPending ? (
                            <div>
                                Complete Onboarding
                            </div>
                        ) : (
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        )} </button>
                </form>


            </div>
        </div>
    )
}
import zod from "zod";


export const signupValidation = zod.object({
    fullname : zod.string(),
    email : zod.email(),
    password : zod.string().min(6)
});

export const signinValidation = zod.object({
    email : zod.email(),
    password : zod.string().min(6)
});

//fullname, bio, nativeLanguage, learningLanguage, location
export const onboardValidation = zod.object({
    fullname : zod.string(),
    bio : zod.string(),
    nativeLanguage:zod.string(),
    learningLanguage:zod.string(),
    location:zod.string()
})



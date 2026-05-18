"use client"
import { Controller, useForm } from "react-hook-form"
import { Lock, Eye, EyeOff, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/shared/lib/utils"
import { SignInFormType, signInSchema } from "../schema/auth-schema"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export function LoginForm() {
    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const isPending = false


    const onSubmit = async (data: SignInFormType) => {
        const { email, password } = data
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        if (!res?.ok) {
            toast.error(res?.error || "Login failed")
            return
        }
        toast.success("Login successful")
        window.location.href = "/"
    }

    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google `)

    return (
        <>
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold  mb-2">Login</h1>
                <p className="text-muted-foreground text-sm">Enter your account details to login</p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                Username
                            </FieldLabel>
                            <Input
                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                type="text"
                                placeholder="Ahmed"
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                Password
                            </FieldLabel>
                            <Input
                                className="rounded-sm px-4 py-6 border border-[#E5E7EB] font-mono"
                                type="password"
                                placeholder="*********"
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Button type="submit" className='w-full' variant="default" disabled={isPending}>
                    {isPending ?
                        <Loader2 className='size-4 animate-spin transition-all' />
                        :
                        ""
                    }
                    Sign In
                </Button>
                {/* Divider */}
                <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted-foreground"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2  bg-white">or</span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
                    className={cn(buttonVariants(), "w-full")}
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </Link>

                {/* Sign Up Link */}
                <p className="text-center text-slate-400 text-sm">
                    Don&apos;t have an account ? &lsquo;
                    <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                        Sign Up
                    </Link>
                </p>
            </form>
        </>
    )
}
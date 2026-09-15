"use client"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/shared/lib/utils"
import { SignInFormType, signInSchema } from "../schema/auth-schema"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useTransition, useState } from "react"
import { useTranslations } from "next-intl"

// Google Icon — extracted to avoid inline SVG repetition
function GoogleIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    )
}

export function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    const t = useTranslations("auth.login")

    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: SignInFormType) => {
        const { email, password } = data
        startTransition(async () => {
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
        })
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    {t("title")}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {t("subtitle")}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="space-y-1.5">
                            <FieldLabel className="text-sm font-medium text-foreground">
                                {t("emailLabel")}
                            </FieldLabel>
                            <Input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                autoComplete="email"
                                className="h-11 rounded-lg border-border bg-background px-4 transition-shadow focus:ring-2 focus:ring-[#A89989]/40"
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-xs text-destructive"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                {/* Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="space-y-1.5">
                            <FieldLabel className="text-sm font-medium text-foreground">
                                {t("passwordLabel")}
                            </FieldLabel>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("passwordPlaceholder")}
                                    autoComplete="current-password"
                                    className="h-11 rounded-lg border-border bg-background pe-11 px-4 transition-shadow focus:ring-2 focus:ring-[#A89989]/40"
                                    {...field}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 end-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword
                                        ? <EyeOff className="h-4 w-4" />
                                        : <Eye className="h-4 w-4" />
                                    }
                                </button>
                            </div>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-xs text-destructive"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white shadow-md hover:brightness-90 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    disabled={isPending}
                >
                    {isPending
                        ? <><Loader2 className="me-2 h-4 w-4 animate-spin" />{t("loading")}</>
                        : t("submit")
                    }
                </Button>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                    {/* bg-background ensures dark-mode compatibility — no bg-white */}
                    <span className="px-3 bg-background text-muted-foreground">
                        {t("orContinueWith")}
                    </span>
                </div>
            </div>

            {/* Google SSO */}
            <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full h-11 gap-3 border-border hover:bg-muted transition-colors"
                )}
            >
                <GoogleIcon />
                <span>{t("google")}</span>
            </Link>

            {/* Sign-up link */}
            <p className="text-center text-sm text-muted-foreground">
                {t("noAccount")}{" "}
                <Link
                    href="/auth/register"
                    className="font-semibold text-[#7D6D5E] hover:text-[#A89989] transition-colors"
                >
                    {t("signUp")}
                </Link>
            </p>
        </div>
    )
}
'use client'
import {LoginSchema} from '@/schemas'
import {zodResolver} from "@hookform/resolvers/zod"
import {useState, useTransition} from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Login} from "@/lib/auth/auth"

export const LoginPage = () => {
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            login: "",
            password: "",
        }
    })

    const handleLogin = (values: z.infer<typeof LoginSchema>) => {
        setError("")

        startTransition(() => {
            Login(values)
                .then((data) => {
                    setError(data?.error)
                })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="login"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Ваш логин</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Login123"
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}/>
                <Button type="submit" className="w-full" disabled={isPending}>
                    Войти в аккаунт
                </Button>
            </form>
        </Form>
    )
}
"use client"

import React, {useTransition, useState} from "react"
import {Button} from "@/components/ui/button"
import {Mail} from "lucide-react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {emailSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";
import {sendEmail} from "@/lib/data/email";

export default function EmailForm() {
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = React.useState<boolean>()

    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    })

    const handleReSend = (values: z.infer<typeof emailSchema>) => {
        setError("")

        startTransition(() => {
            sendEmail(values)
                .then((data) => {
                    setError(data?.error)
                    if (data?.success) {
                        toast.success(data?.success)
                        setTimeout(() => {
                            setOpen(false)
                        }, 1500)
                    }
                })
        })
    }

    return (
        <div className="justify-self-start self-start relative lg:mt-10 flex">
            <AlertDialog open={open}>
                <AlertDialogTrigger asChild className={"justify-self-start self-start relative mt-10 flex"}>
                    <Button
                        className={"text-[16px] lg:text-2xl z-10 font-light gap-2 lg:gap-3"}
                        variant={"default"}
                        size={"lg"}
                    >
                        <Mail className={'h-5 lg:h-7 w-5 lg:w-7'}/>
                        Связаться с нами
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-80 md:w-1/3 rounded-lg">
                    <AlertDialogTitle>Свяжитесь с нами при помощи электронной почты.</AlertDialogTitle>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Если вы предпочитаете другой вид связи, пожалуйста укажите его в вашем сообщении.
                        </p>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleReSend)}
                                className={"space-y-6"}>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Как к вам обращаться?</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Иван Иванович"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Почта для обратной связи (Необязательно)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="email@mail.com"
                                                        type="text"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Сообщение</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder={"Ваше сообщение. \nТут вы так же можете оставить ваш предпочтильный вид связи."}
                                                        className={"h-24"}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}/>
                                </div>
                                <FormError message={error}/>
                                <Button variant={"default"} type="submit" className="w-full" disabled={isPending}>
                                    Отправить!
                                </Button>
                            </form>
                        </Form>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Закрыть</AlertDialogCancel>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}


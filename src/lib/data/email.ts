'use server'
import {emailSchema} from "@/schemas";
import {z} from "zod";
import {Resend} from "resend";
import {EmailTemplate} from "@/lib/email-template";


export const sendEmail = async (values: z.infer<typeof emailSchema>) => {
    const validatedField = emailSchema.safeParse(values)

    if (validatedField.success) {
        const {name, email, message} = validatedField.data;
        const resend = new Resend(`${process.env.RESEND_KEY}`)

        const {data, error} = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: 'sasha1254370@gmail.com',
            subject: `Сообщение от ${name}`,
            react: EmailTemplate({ name: name, email: email, message: message }),
        })

        if (error) {
            const currentTime = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            console.error(`ERROR SENDING EMAIL AT ${currentTime} : `, error)
            return {error: `Непредвиденная ошибка... ${error}`}
        }

        return {success: "Сообщение успешно отправлено!"}
    }
}
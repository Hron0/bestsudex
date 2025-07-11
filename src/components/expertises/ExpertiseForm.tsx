"use client"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createExpertise, updateExpertise } from "@/lib/data/expertises"
import CardWrapper from "@/components/shared/CardWrapperComps/CardWrapper"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TextFieldArea } from "@/components/shared/text-area"
import type { ExpertiseType } from "@/types/expertise"
import { z as zod } from "zod"

// Simplified schema for the new expertise structure
const ExpertiseFormSchema = zod.object({
    title: zod.string().min(1, "Название обязательно"),
    content: zod.string().min(1, "Содержание обязательно"),
})

interface ExpertiseFormProps {
    initialData?: ExpertiseType & { content?: string }
    isEdit?: boolean
}

export default function ExpertiseForm({ initialData, isEdit = false }: ExpertiseFormProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<z.infer<typeof ExpertiseFormSchema>>({
        resolver: zodResolver(ExpertiseFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            content:
                initialData?.content ||
                `# ${initialData?.title || "Новая экспертиза"}

## Описание услуги

Здесь опишите основные характеристики и преимущества вашей экспертной услуги.

## Наши возможности

- Пункт 1
- Пункт 2
- Пункт 3

## Методология

Опишите подходы и методы, которые вы используете в работе.

## Примеры работ

### Кейс 1
Описание успешного проекта.

### Кейс 2
Описание другого проекта.

## Контактная информация

Для получения консультации свяжитесь с нами:
- Email: info@company.com
- Телефон: +7 (xxx) xxx-xx-xx
`,
        },
    })

    const handleSubmit = (values: z.infer<typeof ExpertiseFormSchema>) => {
        startTransition(async () => {
            try {
                if (isEdit && initialData?.id) {
                    const result = await updateExpertise(initialData.id, values.title, values.content)
                    if (result) {
                        toast.success("Экспертиза успешно обновлена")
                        router.push(`/expertises/${initialData.id}`)
                    } else {
                        toast.error(result || "Ошибка при обновлении")
                    }
                } else {
                    const result = await createExpertise(values.title, values.content)
                    if (result) {
                        toast.success("Экспертиза успешно создана")
                        router.push(`/expertises/${result?.id}`)
                    } else {
                        toast.error(result || "Ошибка при создании")
                    }
                }
            } catch (error) {
                toast.error("Произошла ошибка")
                console.error(error)
            }
        })
    }

    return (
        <CardWrapper label={isEdit ? "Редактирование экспертизы" : "Создание экспертизы"} backBtn={false}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название экспертизы</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Финансово-экономическая экспертиза"
                                            type="text"
                                            onChange={(e) => {
                                                field.onChange(e)
                                                // Update the content title when title changes
                                                const currentContent = form.getValues("content")
                                                const newContent = currentContent.replace(/^# .*/m, `# ${e.target.value || "Новая экспертиза"}`)
                                                form.setValue("content", newContent)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="content"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Содержание (MDX)</FormLabel>
                                    <FormControl>
                                        <TextFieldArea
                                            {...field}
                                            placeholder="Введите содержание в формате MDX..."
                                            className="min-h-[400px] font-mono text-sm"
                                        />
                                    </FormControl>
                                    <div className="text-sm text-muted-foreground">
                                        <p className="mb-2">Поддерживаемые элементы MDX:</p>
                                        <ul className="list-disc list-inside space-y-1 text-xs">
                                            <li>
                                                <code># Заголовок 1</code>, <code>## Заголовок 2</code>, <code>### Заголовок 3</code>
                                            </li>
                                            <li>
                                                <code>**жирный текст**</code>, <code>*курсив*</code>
                                            </li>
                                            <li>
                                                <code>- Список</code> или <code>1. Нумерованный список</code>
                                            </li>
                                            <li>
                                                <code>&gt; Цитата</code>
                                            </li>
                                            <li>
                                                <code>`код`</code> или <code>\`\`\`блок кода\`\`\`</code>
                                            </li>
                                            <li>
                                                <code>[ссылка](url)</code>
                                            </li>
                                            <li>
                                                Таблицы с <code>| Колонка 1 | Колонка 2 |</code>
                                            </li>
                                        </ul>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending
                            ? isEdit
                                ? "Обновление..."
                                : "Создание..."
                            : isEdit
                                ? "Обновить экспертизу"
                                : "Создать экспертизу"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

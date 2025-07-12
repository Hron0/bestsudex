"use client"

import type React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {toast} from "sonner"
import {createExpertise} from "@/lib/data/expertises"
import FormPreviewDialog from "@/components/expertises/FormPreviewDialog";
import FormPopover from "@/components/expertises/FormPopover";

export default function CreateExpertisePage() {
    const [title, setTitle] = useState("")
    const [mdxContent, setMdxContent] = useState(`# ${title || "Заголовок"}

## Обзор

Предоставьте здесь полный обзор ваших экспертных услуг.

## Наш подход

### Методология
- Шаг 1: Первичная оценка и консультация
- Шаг 2: Подробный анализ и исследование
- Шаг 3: Подготовка отчета и рекомендации

### Ключевые особенности
- Профессиональный анализ
- Подробная документация
- Рекомендации экспертов
- Постоянная поддержка

## Примеры из практики

### Пример из практики 1: Пример проекта
Краткое описание успешного проекта или проекта.

**Проблема:** В чем заключалась основная проблема?
**Решение:** Как вы ее решили?
**Результат:** Каков был результат?

## Контактная информация

Для получения дополнительной информации об этой экспертной услуге свяжитесь с нами:

- **Электронная почта:** expertise@company.com
- **Телефон:** +1 (555) 123-4567
- **Веб-сайт:** www.company.com

---

*Эту экспертную услугу предоставляют наши сертифицированные специалисты с обширным опытом работы в данной области.*`)

    const [creating, setCreating] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            toast.error("Укажите заголовок.")
            return
        }

        if (!mdxContent.trim()) {
            toast.error("Введите данные в поле содержания.")
            return
        }

        try {
            setCreating(true)
            const expertise = await createExpertise(
                title.trim(),
                mdxContent,
            )

            toast.success("Экспертиза была успешно создана.")
            router.push(`/expertises/${expertise.id}`)
        } catch (error) {
            console.error("Ошибка при создании:", error)
            toast.error("Ошибка при создании экспертизы.")
        } finally {
            setCreating(false)
        }
    }

    // Update MDX content when title changes
    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle)
        if (mdxContent.startsWith("# ")) {
            const lines = mdxContent.split("\n")
            lines[0] = `# ${newTitle || "Заголовок экспертизы"}`
            setMdxContent(lines.join("\n"))
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-24">
            <Card>
                <CardHeader className={"w-full"}>
                    <div className={"flex flex-row align-center justify-between"}>
                        <CardTitle className="text-2xl font-bold">Создание новой экспертизы</CardTitle>
                        <FormPopover />
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Заголовок</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Судебно-строительная экспертиза..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Содержание</Label>
                            <Textarea
                                id="content"
                                value={mdxContent}
                                onChange={(e) => setMdxContent(e.target.value)}
                                placeholder="Поддерживается формат .mdx/.md"
                                className="min-h-[400px] font-mono text-sm"
                                required
                            />
                            {/*<div className="text-sm text-gray-600 dark:text-gray-400">*/}
                            {/*    <p className="font-medium mb-1">MDX Formatting Tips:</p>*/}
                            {/*    <ul className="list-disc list-inside space-y-1 text-xs">*/}
                            {/*        <li># Heading 1, ## Heading 2, ### Heading 3</li>*/}
                            {/*        <li>**bold text**, *italic text*</li>*/}
                            {/*        <li>- Bullet points, 1. Numbered lists</li>*/}
                            {/*        <li>{"> Blockquotes for important notes"}</li>*/}
                            {/*        <li>```code blocks``` for code examples</li>*/}
                            {/*        <li>[Link text](URL) for links</li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>

                        <div className="flex align-center justify-between">
                            <div className={"flex gap-4"}>
                                <Button type="submit" disabled={creating}>
                                    {creating ? "Идёт создание..." : "Создать"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.push("/expertises")}>
                                    Отмена
                                </Button>
                            </div>
                            <FormPreviewDialog mdx={mdxContent}/>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

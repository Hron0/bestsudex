"use client"
import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Edit, Trash2, Loader2, ArrowLeft} from "lucide-react"
import Link from "next/link"
import {deleteExpertise, getMDXContent} from "@/lib/data/expertises"
import {useMDXComponents} from "@/lib/mdx-components"
import {MDXRemote} from "next-mdx-remote"
import {serialize} from "next-mdx-remote/serialize"
import type {MDXRemoteSerializeResult} from "next-mdx-remote"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useSessionContext} from "@/components/providers/session-provider";
import {ExpertiseSkeleton} from "@/components/skeletons/ExpertiseSkeleton";

interface ExpertiseDetailedProps {
    expertise: any
}

function AdminActions({expertiseId}: { expertiseId: number }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteExpertise(expertiseId)
            toast.success("Экспертиза успешно удалена.")
            router.push("/expertises")
        } catch (error) {
            console.error("Ошибка при удалении:", error)
            toast.error("Ошибка при удалении экспертизы.")
        } finally {
            setIsDeleting(false)
            setIsOpen(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href={`/expertises/edit/${expertiseId}`}>
                    <Edit className="w-4 h-4 mr-2"/>
                    Редактировать
                </Link>
            </Button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2"/>
                        Удалить
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Восстановить данные этой экспертизы будет невозможно.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}
                                           className="bg-red-600 hover:bg-red-700">
                            {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export function ExpertiseDetailed({expertise}: ExpertiseDetailedProps) {
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const components = useMDXComponents({})
    const {session} = useSessionContext()

    useEffect(() => {
        async function loadMDXContent() {
            try {
                setIsLoading(true)
                setError(null)

                const mdxContent = await getMDXContent(expertise.mdxFile)
                const mdxSource = await serialize(mdxContent)
                setMdxSource(mdxSource)
            } catch (err) {
                console.error("Ошибка при загрузке контента:", err)
                setError("Неудалось загрузить контент.")
            } finally {
                setIsLoading(false)
            }
        }

        void loadMDXContent()
    }, [expertise.mdxFile])

    return (
        <div className="container w-full mx-auto p-6">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/expertises">
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Список экспертиз
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                {expertise.title}
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Создано:{" "}
                                {new Date(expertise.createdAt).toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                {expertise.updatedAt && expertise.updatedAt.getTime() !== expertise.createdAt.getTime() && (
                                    <span className="ml-4">
                                Updated:{" "}
                                        {new Date(expertise.updatedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                )}
                            </p>
                        </div>

                        {session?.user.role === "ADMIN" && <AdminActions expertiseId={expertise.id}/>}
                    </div>
                </CardHeader>

                <CardContent>
                    <Separator className="mb-8"/>

                    <div className="prose prose-lg max-w-none">
                        {isLoading ? (
                           <ExpertiseSkeleton />
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Не удалось загрузить контент этой экспертизы.
                                </p>
                            </div>
                        ) : mdxSource ? (
                            <div className="mdx-content">
                                <MDXRemote {...mdxSource} components={components}/>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400">Описание этой экспертизы не было
                                    найдено.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

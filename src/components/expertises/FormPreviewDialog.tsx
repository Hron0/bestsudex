"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useMDXComponents} from "@/lib/mdx-components";
import {useEffect, useState} from "react";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";
import {serialize} from "next-mdx-remote/serialize";
import {ExpertiseSkeleton} from "@/components/skeletons/ExpertiseSkeleton";
import {ScrollArea} from "@/components/ui/scroll-area";

const FormPreviewDialog = ({mdx}: { mdx: string }) => {
    const components = useMDXComponents({})
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadMDXContent() {
            try {
                setIsLoading(true)
                setError(null)

                const mdxSource = await serialize(mdx)
                setMdxSource(mdxSource)
            } catch (err) {
                console.error("Ошибка при загрузке контента:", err)
                setError("Неудалось загрузить контент.")
            } finally {
                setIsLoading(false)
            }
        }

        void loadMDXContent()
    }, [mdx])

    return (
        <div className={""}>
            <Dialog>
                <DialogTrigger>Предпросмотр</DialogTrigger>
                <DialogContent className={"h-3/4"}>

                    {isLoading ? (
                        <ExpertiseSkeleton/>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Не удалось загрузить предпросмотр.
                            </p>
                        </div>
                    ) : mdxSource && (
                        <div className="mdx-content">
                            <ScrollArea className={"h-3/4"}>
                                <MDXRemote {...mdxSource} components={components}/>
                            </ScrollArea>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormPreviewDialog;

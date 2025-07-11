import type { MDXComponents } from "mdx/types"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children, className, ...props }) => (
            <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-6", className)} {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, className, ...props }) => (
            <h2
                className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4", className)}
                {...props}
            >
                {children}
            </h2>
        ),
        h3: ({ children, className, ...props }) => (
            <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight mb-3", className)} {...props}>
                {children}
            </h3>
        ),
        h4: ({ children, className, ...props }) => (
            <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight mb-2", className)} {...props}>
                {children}
            </h4>
        ),
        p: ({ children, className, ...props }) => (
            <p className={cn("leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground", className)} {...props}>
                {children}
            </p>
        ),
        ul: ({ children, className, ...props }) => (
            <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
                {children}
            </ul>
        ),
        ol: ({ children, className, ...props }) => (
            <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props}>
                {children}
            </ol>
        ),
        li: ({ children, className, ...props }) => (
            <li className={cn("text-muted-foreground", className)} {...props}>
                {children}
            </li>
        ),
        blockquote: ({ children, className, ...props }) => (
            <blockquote
                className={cn("mt-6 border-l-2 pl-6 italic border-primary/20 bg-muted/50 py-4 rounded-r-lg", className)}
                {...props}
            >
                {children}
            </blockquote>
        ),
        code: ({ children, className, ...props }) => (
            <code
                className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}
                {...props}
            >
                {children}
            </code>
        ),
        pre: ({ children, className, ...props }) => (
            <pre
                className={cn(
                    "mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 px-6 text-sm text-zinc-50",
                    className,
                )}
                {...props}
            >
        {children}
      </pre>
        ),
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg border shadow-sm"
                {...(props as ImageProps)}
            />
        ),
        hr: ({ className, ...props }) => <hr className={cn("my-8 border-border", className)} {...props} />,
        table: ({ children, className, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
                <table className={cn("w-full border-collapse border border-border", className)} {...props}>
                    {children}
                </table>
            </div>
        ),
        th: ({ children, className, ...props }) => (
            <th className={cn("border border-border px-4 py-2 text-left font-bold bg-muted/50", className)} {...props}>
                {children}
            </th>
        ),
        td: ({ children, className, ...props }) => (
            <td className={cn("border border-border px-4 py-2", className)} {...props}>
                {children}
            </td>
        ),
        ...components,
    }
}

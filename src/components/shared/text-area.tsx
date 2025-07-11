import {
    forwardRef,
    type ForwardedRef,
    type TextareaHTMLAttributes,
} from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type TextFieldAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
}

export const TextFieldArea = forwardRef(function MyInput(
    { className, ...rest }: TextFieldAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Textarea ref={ref} {...rest} />
        </div>
    )
})

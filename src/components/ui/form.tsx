"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import {Slot} from "@radix-ui/react-slot"
import {
    Controller,
    FormProvider,
    useFormContext,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form"

import {cn} from "@/lib/utils"
import {Label} from "@/components/ui/label"
import {CheckCircledIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
      ...props
  }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{name: props.name}}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const {getFieldState} = useFormContext()
    const formState = useFormState({name: fieldContext.name})
    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    const {id} = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
)

function FormItem({className, ...props}: React.ComponentProps<"div">) {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{id}}>
            <div
                data-slot="form-item"
                className={cn("grid gap-2", className)}
                {...props}
            />
        </FormItemContext.Provider>
    )
}

function FormLabel({
                       className,
                       ...props
                   }: React.ComponentProps<typeof LabelPrimitive.Root>) {
    const {error, formItemId} = useFormField()

    return (
        <Label
            data-slot="form-label"
            data-error={!!error}
            className={cn("data-[error=true]:text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
}

function FormControl({...props}: React.ComponentProps<typeof Slot>) {
    const {error, formItemId, formDescriptionId, formMessageId} = useFormField()

    return (
        <Slot
            data-slot="form-control"
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
}

function FormDescription({className, ...props}: React.ComponentProps<"p">) {
    const {formDescriptionId} = useFormField()

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

function FormMessage({className, ...props}: React.ComponentProps<"p">) {
    const {error, formMessageId} = useFormField()
    const body = error ? String(error?.message ?? "") : props.children

    if (!body) {
        return null
    }

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn("text-destructive text-sm", className)}
            {...props}
        >
            {body}
        </p>
    )
}

interface FormErrorProps {
    message?: string;
}

const FormError = ({message}: FormErrorProps) => {
    if (!message) return null

    return (
        <div className="bg-destructive/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}

const FormSuccess = ({message}: FormErrorProps) => {
    if (!message) return null

    return (
        <div className="bg-emerald-500/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600">
            <CheckCircledIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
    FormSuccess,
    FormError
}

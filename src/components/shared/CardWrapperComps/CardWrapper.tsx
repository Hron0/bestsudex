import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import BackButton from "./BackButton"
import React from "react";

interface CardWrapperProps {
    children: React.ReactNode,
    label: string,
    backBtn: boolean,
}

const CardWrapper = ({
                         children,
                         label,
                         backBtn,
                     }: CardWrapperProps) => {
    return (
        <Card className="w-[600px] px-12 shadow-md">
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {backBtn
                    ? <BackButton/>
                    : null}
            </CardFooter>
        </Card>
    )
}

export default CardWrapper
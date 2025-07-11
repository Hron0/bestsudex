import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

export function TitleHeader({title, color, cClass, isHidden}: { title: string, color?: string, cClass?: string, isHidden?: boolean }) {
    return (
        <div
            className={cn(color == 'orange' ? 'bg-black/40' : 'bg-black/50',"flex flex-row items-center justify-start z-10 relative h-16 lg:h-[100px] w-full md:w-[480px]", cClass, isHidden && "min-h-16 h-min px-1 py-0.5 lg:py-0")}>
            <div className={cn(isHidden && "hidden lg:block", "relative h-full w-[40px] lg:w-[50px] z-20 right-4 lg:right-6 px-4") }>
                <Image src={'/img/mainPage/column.png'}
                       alt={'Pic'}
                       fill={true}
                />
            </div>

            <h1 className={"text-white text-xl md:text-3xl font-extralight text-wrap"}>{title}</h1>
        </div>
    );
}

// Тот же самый только без Колонны
export function TitleHeaderSimple({title}: {title: string}) {
    return (
        <div
            className={cn("flex flex-row items-center justify-start z-10 relative lg:h-[100px] w-full md:w-[480px] min-h-16 h-min px-1 py-0.5 lg:py-0")}>
            <div
                className={cn("hidden lg:block", "relative h-full w-[40px] lg:w-[50px] z-20 right-4 lg:right-6 px-4")}>
                <Image src={'/img/mainPage/column.png'}
                       alt={'Pic'}
                       fill={true}
                />
            </div>

            <h1 className={"text-white text-xl md:text-3xl font-extralight text-wrap"}>{title}</h1>
        </div>
    )
}
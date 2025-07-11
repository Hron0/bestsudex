"use server"
import React from 'react';
import {TitleHeader} from "@/components/shared/TitleHeader";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {isEmptyArray} from "is-what";
import {db} from "@/backend/db";
import {Expertises} from "@/backend/db/schema";
import {eq} from "drizzle-orm";
import {getIds} from "@/app/(pages)/expertises/(Expertises)/[id]/getId";
import {getItem} from "@/app/(pages)/expertises/(Expertises)/[id]/getItem";
import {ExpertiseDetailed} from "@/app/(pages)/expertises/(Expertises)/[id]/ExpertiseDetailed";

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{
        id: string
    }>
}): Promise<Metadata> {
    const {id} = await params
    const item: any = await getItem(id)

    if (isEmptyArray(item)) {
        return {}
    }

    return {
        title: `${item[0].title}`,
        description: `Ознакомптесь с ифнормацией`,
        keywords: ["экспертизы", "оценка", "профессиональная экспертиза", "Лучшее решение"],
        authors: [{name: "АНО Лучшее Решение"}],
        openGraph: {
            title: `${item[0].title}`,
            description: ``,
            type: "website",
            locale: "ru_RU",
        },
    }
}

export async function generateStaticParams() {
    const expertises = await getIds()

    return expertises.map((item: any) => ({
        id: item.id.toString()
    }))
}

async function Page({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params;

    const data = await db.query.Expertises.findFirst({
        where: eq(Expertises.id, id),
        with: {
            documents: true,
        },
    });

    if (!data) {
        notFound()
    }

    return (
        <div className={"flex flex-col w-full relative overflow-hidden"}>
            <section className="mx-auto w-full bg-secondary relative">
                <div className={'container grid grid-rows-2 lg:pt-16 pb-6 px-6'}>
                    <TitleHeader title={'Экспертизы'} color={''} cClass={"row-start-2"}/>
                </div>
            </section>

            <ExpertiseDetailed expertise={data}/>
        </div>
    )
}

export default Page;
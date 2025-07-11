import React from 'react';
import {TitleHeader} from "@/components/shared/TitleHeader";
import {Metadata} from "next";
import {ExpertisesTable} from "@/components/expertises/ExpertisesTable";

export const metadata: Metadata = {
    title: {
        default: "Экспертизы",
        template: "%s - Экспертизы",
    },
    description: "Ознакомьтесь с нашими экспертизами и профессиональными оценками в различных областях",
    keywords: ["экспертизы", "оценка", "профессиональная экспертиза", "Лучшее решение"],
    authors: [{name: "АНО Лучшее Решение"}],
    openGraph: {
        title: "Экспертизы",
        description: "Ознакомьтесь с нашими экспертизами и профессиональными оценками в различных областях",
        type: "website",
        locale: "ru_RU",
    },
}

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <div className={"flex flex-col w-full relative overflow-hidden"}>
                <section className="mx-auto w-full bg-secondary relative">
                    <div className={'container grid lg:grid-rows-2 py-2 lg:pt-16 lg:pb-6 px-6'}>
                        <TitleHeader title={'Все файлы'} color={''} cClass={"lg:row-start-2"}/>
                    </div>
                </section>
                <section className={'relative'}>
                    <ExpertisesTable/>
                </section>
            </div>
        </>
    );
}

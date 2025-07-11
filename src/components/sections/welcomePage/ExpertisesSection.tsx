'use server'
import React from 'react';
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {db} from "@/backend/db";
import {Expertises} from "@/backend/db/schema";
import Link from "next/link";

async function ExpertisesSection() {
    let expertises = await db
        .select({
            id: Expertises.id,
            title: Expertises.title,
        })
        .from(Expertises);


    const list = [
        {name: 'Почерковедческая экспертиза'},
        {name: 'Техническая экспертиза документов'},
        {name: 'Пожарно-техническая экспертиза'},
        {name: 'Финансово-экономическая экспертиза'},
        {name: 'Бухгалтерская экспертиза'},
        {name: 'Товароведческая экспертиза'},
        {name: 'Лингвистическая экспертиза'},
        {name: 'Землеустроительная экспертиза'},
        {name: 'Рецензирование заключений экспертов'},
    ]

    return (
        <section
            className="mx-auto w-full container relative flex flex-row justify-start md:justify-center items-start gap-2 py-5 md:py-11 px-3 md:px-10">
            <div className={"relative flex items-start justify-start bg-romb bg-center bg-cover w-full md:w-auto"}>

                <ScrollArea
                    className={"text-black text-2xl lg:text-3xl font-light md:px-6 text-start w-full h-[434px] mr-[4px]"}>
                    {expertises.map((item, index) => (
                        <div key={index}>
                            <Link key={index} className={""} href={`/expertises/${item.id}`}>- {item.title};</Link>
                            <Separator className={"my-2"}/>
                        </div>
                    ))}
                    {list.map((item, index) => (
                        <div key={index}>
                            <p key={index} className={""}>- {item.name};</p>
                            <Separator className={"my-2"}/>
                        </div>
                    ))}
                </ScrollArea>

            </div>
            <div className={"relative w-[330px] hidden md:block"}>
                <AspectRatio ratio={33 / 43} className={"mr-10 relative"}>
                    <Image src={"/img/mainPage/img2.png"}
                           alt={'Pic'}
                           fill={true}
                           className={"object-cover"}
                    />
                </AspectRatio>
            </div>
        </section>
    );
}

export default ExpertisesSection;
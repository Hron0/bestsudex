"use server"
import React from 'react';
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {TitleHeader} from "@/components/shared/TitleHeader";
import fs from "node:fs/promises";

export default async function DocsSection() {
    const fileImages = await fs.readdir("public/Docs/img/");
    const fileDocument = await fs.readdir("public/Docs/mainPage/");
    const docsImg = fileDocument
        .map((item, index) => {
            return {
                doc: `/Docs/mainPage/${item}`,
                img: `/Docs/img/${fileImages[index]}`,
                altImg: `${item}`,
            }
        });


    return (
        <section
            className="mx-auto w-full container relative flex flex-col items-start gap-2 px-6 md:px-10 py-4 md:py-8">
            <TitleHeader title={'Официальные документы'} color={'orange'}/>
            <div className={"relative w-full px-12"}>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent className={""}>
                        {docsImg.map((doc, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                <div className="p-1">
                                    <a href={doc.doc} target="_blank">
                                        <Image src={doc.img}
                                               alt={doc.altImg}
                                               width={262}
                                               height={354}/>
                                    </a>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </section>
    );
}


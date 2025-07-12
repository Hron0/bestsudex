'use client'
import * as React from 'react';
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {TitleHeader} from "@/components/shared/TitleHeader";
import Autoplay from "embla-carousel-autoplay";

export const CarouselCommunitySection = () => {
    const items = [
        {title: 'Членство в профессиональном сообществе', img: '/img/mainPage/group.svg'},
        {title: 'Повышение личной компетенции и уровня профессиональной деятельности', img: '/img/mainPage/files.svg'},
        {title: 'Защиту от недовольных клиентов внесудебных исследований', img: '/img/mainPage/suitcase.svg'},
    ]

    return (
        <section
            className="w-full bg-secondary relative ">
            <div className={'container relative flex flex-col items-start gap-6 md:gap-16 px-6 lg:px-16 py-4 lg:py-8 text-wite aspect-video'}>
                <TitleHeader title={'ЧТО МЫ ПРЕДЛАГАЕМ:'} color={''} cClass={"self-start"}/>

                {/* Lol */}
                <div
                    className={"flex lg:px-8 gap-36 relative w-full z-10"}>

                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {items.map((item, index) => (
                                <CarouselItem key={index} className="pl-12 md:basis-1/3">
                                    <div
                                        className={"bg-black/40 w-min border-accent border-2 px-4 lg:px-6 py-6 lg:py-10 flex flex-col items-center gap-6 lg:gap-12 md:justify-evenly"}>
                                        <div className={"relative aspect-square w-[72%] md:w-1/2"}>
                                            <Image src={item.img}
                                                   alt={'Pic'}
                                                   fill={true}/>
                                        </div>
                                        <h1 className={"text-white font-light text-xl md:text-2xl lg:text-3xl text-center w-min"}>
                                            {item.title}
                                        </h1>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                </div>

            </div>
            <Image
                src="/img/Community/img2.png"
                fill
                alt="Picture of the author"
                className={"opacity-95 z-0 object-cover"}
            />
        </section>
    );
};
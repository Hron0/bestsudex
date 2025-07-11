'use client'
import * as React from 'react';
import Image from "next/image";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export const CarouselSection = () => {
    const items = [
        {title: 'Производство внесудебных исследований', img: '/img/mainPage/group.svg'},
        {title: 'Производство судебных экспертиз', img: '/img/mainPage/suitcase.svg'},
        {title: 'Консультация и подготовка к процессу', img: '/img/mainPage/files.svg'},
    ]

    return (
        <section
            className="w-full bg-secondary relative ">
            <div className={'container relative flex flex-col items-start gap-6 md:gap-16 px-6 lg:px-16 py-4 lg:py-8 text-white aspect-video'}>
                <TitleHeader title={'Чем мы можем помочь?'} color={''} cClass={"self-start"}/>

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
                                <CarouselItem key={index} className="md:basis-1/3">
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


                {/* Background image Fill */
                }
            </div>
            <Image
                src="/img/mainPage/bg22.png"
                fill={true}
                alt="Picture of the author"
                className={"opacity-80 z-0 object-cover"}
            />
        </section>
    )
        ;
};
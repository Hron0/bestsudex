"use server"
import * as React from 'react';
import Image from "next/image";

export const InformationSection = async () => {
    return (
        <>
            <section
                className="mx-auto w-full bg-secondary relative">
                <div
                    className={'container relative flex flex-col lg:grid lg:grid-rows-4 md:justify-start lg:justify-center items-center justify-items-center text-white aspect-video gap-2 lg:gap-16 pt-4 pb-8 px-4 md:px-24'}>

                    <div
                        className={"aspect-square w-1/3 relative z-40 bg-background rounded-full lg:hidden mb-2 md:mb-6"}>
                        <Image
                            src={'/img/logo.png'}
                            fill={true}
                            alt={"Логотип"}
                            className={'p-2'}
                        />
                    </div>

                    <div className={"flex flex-col gap-2 lg:gap-16 lg:row-span-3 lg:self-end"}>
                        <h1 className={"text-3xl lg:text-5xl font-bold z-10 text-center"}>Честная
                            судебная
                            экспертиза</h1>
                        <h3 className={"md:text-xl lg:text-2xl text-center font-light z-10 whitespace-pre-line break-words self-center"}>
                            АНО «Межрегиональный центр независимых исследований, экспертиз и права «Лучшее решение»
                            предлагает
                            услуги по проведению внесудебных исследований,
                            судебных экспертиз и рецензированию судебных экспертиз.</h3>
                    </div>

                    {/*<EmailForm />*/}

                </div>
                <Image
                    src="/img/mainPage/bg1.png"
                    fill
                    alt="Picture of the author"
                    className={"opacity-80 z-0 object-cover"}
                />
            </section>

            <section
                className="mx-auto container w-full relative grid lg:grid-cols-2 items-start gap-12 lg:px-24 py-12">
                <Image src={"/img/mainPage/img1.png"}
                       alt={'Pic'}
                       width={578}
                       height={334}
                       className={"hidden lg:block"}/>

                <div
                    className={"relative flex items-start justify-start h-full lg:pl-20 bg-romb bg-contain md:px-24 lg:px-0 bg-center bg-repeat-x"}>

                    <h3 className={"text-black text-lg md:text-2xl font-light break-words text-center px-2 lg:px-0"}>Мы
                        профессионально выполняем свою работу и с
                        уверенностью можем отстоять свою
                        экспертную позицию в суде!
                        Кроме того, мы готовы представлять ваши интересы в суде в качестве
                        представителей или стать вашим консультантом при подготовке к процессу.</h3>
                </div>

            </section>
        </>
    );
};
import Image from "next/image";
import * as React from "react";
import {TitleHeader} from "@/components/shared/TitleHeader";

export default function ConsSections() {
    return (
        <>
            <section
                className={'container relative px-2 lg:px-6 lg:px-16 py-4 lg:py-8  h-min text-black'}>
                <div
                    className={"flex flex-col items-start relative w-full h-full"}>
                    <TitleHeader title={'Членство в профессиональном сообществе'} color={'orange'}
                                 cClass={'md:w-fit lg:pr-8 h-fit min-h-12'} isHidden/>

                    <div
                        className={"relative w-full flex flex-col gap-6 lg:gap-16 py-6 md:py-16 md:pr-24 lg:pr-[22%] items-start justify-start text-black text-xl lg:text-4xl font-extralight"}>

                        <h1>Быть участником сообщества, в котором
                            состоят лучшие юристы, врачи, учителя,
                            строители и другие профессионалы – это
                            привилегия!
                        </h1>
                        <h1>Это реальный обмен опытом, расширение
                            партнерской и клиентской базы, появление
                            новых деловых связей, участие в деловых и
                            учебных мероприятиях
                        </h1>

                        <Image src={'/img/mainPage/rectangle.png'} alt={'.'} fill className={'object-contain'}/>
                    </div>
                </div>
            </section>
            <section
                className={'mx-auto w-full bg-secondary relative'}>
                <div
                    className={"container px-2 md:px-6 lg:px-16 py-4 lg:py-8 text-white h-min aspect-video flex flex-col items-start gap-6 md:gap-32 relative w-full"}>
                    <TitleHeader title={'Повышение личной компетенции и уровня профессиональной деятельности'}
                                 color={'orange'} cClass={'md:w-[700px]'} isHidden/>

                    <div
                        className={"relative flex flex-col gap-8 lg:gap-24 md:pr-24 lg:pr-[22%] items-start justify-start text-xl lg:text-4xl font-extralight"}>
                        <h1>
                            Неформальное общение и обмен
                            опытом между участниками
                            профессионального сообщества – это
                            путь к приобретению новых навыков.
                        </h1>
                        <h1>
                            А повышение квалификации под
                            руководством именитых специалистов
                            – это путь к профессиональной
                            грамотности!
                        </h1>
                    </div>
                </div>
            </section>
            <section
                className={'container relative px-2 md:px-6 lg:px-16 py-4 lg:py-8  h-min text-black'}>
                <div
                    className={"flex flex-col items-start relative w-full h-full"}>
                    <TitleHeader title={'Защита от недовольных клиентов'} color={'orange'}
                                 cClass={'md:w-fit lg:pr-8 h-fit min-h-12'} isHidden/>

                    <div
                        className={"relative w-full flex flex-col gap-16 py-6 md:py-16 md:pr-24 lg:pr-[28%] items-start justify-start text-black text-xl lg:text-4xl font-extralight"}>

                        <h1>Становясь участником профессионального
                            сообщества вы получаете право на защиту
                            в спорной ситуации с вашими клиентами.
                            Пропишите оговорку в вашем договоре о том,
                            что все спорные вопросы решаются путем
                            обязательной подачи претензии в Правление
                            системы добровольной сертификации,
                            членом которой вы являетесь, а мы
                            приложим все усилия, чтобы урегулировать
                            данный вопрос с вашим недовольным
                            клиентом.
                        </h1>


                        <Image src={'/img/mainPage/rectangle.png'} alt={'.'} fill className={'object-contain'}/>
                    </div>
                </div>
            </section>
            <section
                className={'mx-auto w-full bg-secondary relative'}>
                <div
                    className={"container px-4 lg:px-16 py-4 lg:py-8 pt-8 lg:pt-14 text-white h-min flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-32 relative w-full"}>

                    <div
                        className={"relative bg-background w-[80vw] lg:w-[1000px] aspect-square px-1 py-2 rounded-md flex flex-col items-center justify-start gap-2 shadow-xl text-black"}>
                        <div className={'relative w-[60%] aspect-square'}>
                            <Image
                                src={'/img/logo.png'}
                                fill
                                alt={"Логотип"}
                            />
                        </div>
                        <div className={"flex flex-col items-center text-center pb-3 absolute bottom-1"}>
                            <h1 className={"text-xl"}>ЛУЧШЕЕ РЕШЕНИЕ</h1>
                            <h3 className={"text-center text-base font-extralight"}>Центр независимых исследований.</h3>
                        </div>
                    </div>

                    <h1 className={'text-xl lg:text-4xl font-normal text-white text-center'}>
                        Достижение целей Системы обеспечивается
                        за счет объективности и достоверности
                        результатов сертификации участников
                        системы, оформляемых органами по
                        добровольной сертификации
                    </h1>
                </div>
            </section>
        </>
    );
}
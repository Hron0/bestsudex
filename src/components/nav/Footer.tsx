import React from 'react';
import {Separator} from "@/components/ui/separator";
import {MobileLink} from "@/components/nav/MobileDrawer";

function Footer() {
    return (
        <section
            className="w-full mx-auto bg-[#545454] relative">
            <div className={'relative container flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-6 lg:gap-20 text-white px-3 md:px-10 py-4 md:py-8'}>

                <h2 className={"text-start text-base font-extralight w-full md:w-1/3"}>
                    141508,Московская область, г. Солнечногорск, мкр. Рекинцо-2, д.3 п.54
                    <Separator className={"my-2 bg-white/25"}/>
                    197101, г.Санкт-Петербург, ул.Чапаева, д.15 БЦ «Сенатор», 4 этаж, пом.423
                    <Separator className={"my-2 bg-white/25"}/>
                    <MobileLink href={"/auth"}>
                        Авторизация
                    </MobileLink>
                </h2>

                <h2 className={"text-start md:text-center text-base font-extralight break-words w-full md:w-1/3"}>
                    АНО «Межрегиональный центр независимых исследований, экспертиз и права «Лучшее решение»
                    предлагает услуги по проведению внесудебных исследований, судебных экспертиз и
                    рецензированию судебных экспертиз.
                </h2>

                <h2 className={"text-start md:text-end text-base font-extralight w-full md:w-1/3"}>
                    тел. +7-926-388-80-70(общий);
                    <Separator className={"my-1 bg-white/25"}/>
                    +7-991-037-43-17 - отдел финансово-экономической (бухгалтерской) экспертизы;
                    <Separator className={"my-1 bg-white/25"}/>
                    +7-905-481-20-82- отдел землеустройства, кадастра и мониторинга земель;
                    <Separator className={"my-1 bg-white/25"}/>
                    e-mail: anosudex-bestsolution@mail.ru
                </h2>
            </div>
        </section>
    );
}

export default Footer;
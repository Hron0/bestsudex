import {Metadata} from "next";
import {BasicInfoSectios} from "@/components/sections/communityPage/BasicInfoSectios";
import {CarouselCommunitySection} from "@/components/sections/communityPage/CarouselCommunitySection";
import ConsSections from "@/components/sections/communityPage/ConsSections";

export const metadata: Metadata = {
    title: "Сообщество",
    description: "Присоединяйтесь к нашему сообществу профессионалов и экспертов",
    keywords: ["сообщество", "профессионалы", "эксперты", "Лучшее решение"],
    authors: [{ name: "АНО Лучшее Решение" }],
    openGraph: {
        title: "Сообщество",
        description: "Присоединяйтесь к нашему сообществу профессионалов и экспертов",
        type: "website",
        locale: "ru_RU",
    },
}

export default function Page() {
    return (
        <div className={"flex flex-col w-full overflow-hidden"}>
            <BasicInfoSectios />
            <CarouselCommunitySection />
            <ConsSections />
        </div>
    );
}
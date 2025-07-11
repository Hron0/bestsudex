import {InformationSection} from "@/components/sections/welcomePage/InformationSections";
import {CarouselSection} from "@/components/sections/welcomePage/CarouselSection";
import ExpertisesSection from "@/components/sections/welcomePage/ExpertisesSection";
import MapSection from "@/components/sections/welcomePage/MapSection";
import DocsSection from "@/components/sections/welcomePage/DocsSection";
import CourtsSection from "@/components/sections/welcomePage/CourtsSection";

export default function Home() {
    return (
        <div className={"flex flex-col w-full overflow-hidden"}>
            <InformationSection />
            <CarouselSection />
            <ExpertisesSection />
            {/*<MapSection />*/}
            <DocsSection />
            <CourtsSection />
        </div>
    );
}

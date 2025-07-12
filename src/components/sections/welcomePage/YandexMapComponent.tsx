'use client'
import React, {Suspense} from "react";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import MapSkeleton from "@/components/skeletons/MapSkeleton";

const YandexMapComponent = () => {
    const position = [59.961161, 30.331355];

    return (
        <Suspense fallback={<MapSkeleton/>}>
            <YMaps>
                <div className={'w-full h-full'}>
                    <Map defaultState={{center: position, zoom: 17}} className="w-full h-full">
                        <Placemark geometry={position}/>
                    </Map>
                </div>
            </YMaps>
        </Suspense>
    )
}

export default YandexMapComponent;
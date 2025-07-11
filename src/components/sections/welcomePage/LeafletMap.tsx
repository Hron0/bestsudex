'use client'
import React from "react";
import {MapContainer, Marker, Popup} from "react-leaflet";

const YMapComp = () => {
    const position = [59.961161, 30.331355];

    return (
        <>
            {/*<YMaps>*/}
            {/*    <div className={'w-full h-full'}>*/}
            {/*        <Map defaultState={{center: [59.961161, 30.331355], zoom: 17}} className="w-full h-full">*/}
            {/*            <Placemark geometry={[59.961161, 30.331355]}/>*/}
            {/*        </Map>*/}
            {/*    </div>*/}
            {/*</YMaps>*/}

            <MapContainer>
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default YMapComp;
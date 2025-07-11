import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function MapSkeleton() {
    return (
        <div className={`w-full h-full bg-gray-100/50 rounded-lg overflow-hidden relative`}>
            <Skeleton className="w-full h-full"/>

            <div className="absolute top-4 left-4 right-4 flex items-center">
                <Skeleton className="h-10 w-full max-w-md rounded-full"/>
            </div>

            <div className="absolute top-20 right-4 flex flex-col space-y-2">
                <Skeleton className="h-8 w-8 rounded"/>
                <Skeleton className="h-8 w-8 rounded"/>
            </div>

            <Skeleton className="absolute bottom-1/2 right-1/2 h-6 w-6 rounded-full"/>

            <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded-lg">
                <Skeleton className="h-4 w-24 mb-2"/>
                <Skeleton className="h-3 w-32 mb-1"/>
                <Skeleton className="h-3 w-28"/>
            </div>
        </div>
    );
}

export default MapSkeleton;
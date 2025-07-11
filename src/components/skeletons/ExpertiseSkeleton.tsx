import {Skeleton} from "@/components/ui/skeleton"

export function ExpertiseSkeleton() {
    return (
        <div className="container w-full mx-auto">
            <div className="prose prose-lg max-w-none mdx-content flex flex-col gap-4">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-56"/>
                    <Skeleton className="h-4 w-32"/>
                    <Skeleton className="h-4 w-1/4"/>
                </div>


                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-48"/>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-2/3"/>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-56"/>
                        <div className="space-y-3">
                            {Array.from({length: 4}).map((_, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Skeleton className="h-2 w-2 rounded-full mt-2"/>
                                    <Skeleton className="h-4 w-full"/>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-40"/>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-4/5"/>
                            <Skeleton className="h-4 w-3/5"/>
                        </div>
                    </div>

                    {/* Table skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64"/>
                        <div className="border rounded-lg">
                            {/* Table header */}
                            <div className="grid grid-cols-3 gap-4 p-4 border-b bg-gray-50/50">
                                <Skeleton className="h-4 w-20"/>
                                <Skeleton className="h-4 w-24"/>
                                <Skeleton className="h-4 w-16"/>
                            </div>
                            {/* Table rows */}
                            {Array.from({length: 3}).map((_, index) => (
                                <div key={index}
                                     className="grid grid-cols-3 gap-4 p-4 border-b last:border-b-0">
                                    <Skeleton className="h-4 w-32"/>
                                    <Skeleton className="h-4 w-28"/>
                                    <Skeleton className="h-4 w-20"/>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-32"/>
                        <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-5 w-5"/>
                                <Skeleton className="h-4 w-48"/>
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-5 w-5"/>
                                <Skeleton className="h-4 w-36"/>
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-5 w-5"/>
                                <Skeleton className="h-4 w-52"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

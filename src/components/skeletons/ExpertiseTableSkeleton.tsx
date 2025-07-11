import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image";
import * as React from "react";

export default function ExpertiseTableSkeleton() {
    // Sample data for 5 expertise entries
    const sampleExpertises = [
        { id: 1, name: "Финансовая экспертиза", date: "15.01.2024" },
        { id: 2, name: "Техническая экспертиза", date: "12.01.2024" },
        { id: 3, name: "Юридическая экспертиза", date: "10.01.2024" },
        { id: 4, name: "Строительная экспертиза", date: "08.01.2024" },
        { id: 5, name: "Медицинская экспертиза", date: "05.01.2024" },
    ]

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-1 rounded-xl border py-6 shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 max-w-sm">
                        <Skeleton className={"w-56 h-6"}/>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200">
                    <div className="font-medium text-gray-900">Название</div>
                    <div className="font-medium text-gray-900 text-right mr-10">Дата</div>
                </div>

                <div className="space-y-0">
                    {sampleExpertises.map((expertise, index) => (
                        <div
                            key={expertise.id}
                            className={`grid grid-cols-3 gap-4 py-3 ${
                                index !== sampleExpertises.length - 1 ? "border-b border-gray-100" : ""
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <Image src={'/img/folder.svg'} alt={'.'} width={30} height={30}
                                       className={'text-black'}/>
                                <Skeleton className="h-4 w-38" />
                            </div>

                            <div className="text-right">
                                <Skeleton className="h-4 w-20 ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-gray-100">
                    <Button variant="ghost" size="sm" disabled className="text-gray-500">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Предыдущая
                    </Button>

                    <Button variant="ghost" size="sm" disabled className="text-gray-500">
                        Следующая
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </CardContent>
        </div>
    )
}

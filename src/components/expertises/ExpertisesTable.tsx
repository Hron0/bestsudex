'use client'

import {useExpertisesList} from "@/lib/hooks/useExpertises";
import {columns} from "@/components/expertises/DataTableComps/columns";
import {DataTable} from "@/components/expertises/DataTableComps/DataTable";
import ExpertiseTableSkeleton from "@/components/skeletons/ExpertiseTableSkeleton";


export function ExpertisesTable() {
    const {data, isLoading, isError} = useExpertisesList()

    return (
        <div className="container h-full py-4 lg:py-10">
            {isLoading ? (
                    <ExpertiseTableSkeleton/>)
                : isError ? (
                        <h1 className={'font-bold text-black text-lg text-center'}>Ошибка загрузки...</h1>
                    )
                    : (<DataTable columns={columns} data={data}/>)
            }

        </div>
    );
}
import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const FormPopover = () => {
    return (
        <div>
            <Popover>
                <PopoverTrigger className={"underline"}>Поддерживает формат разметки .mdx</PopoverTrigger>
                <PopoverContent className={"flex flex-col align-start gap-2"}>
                    <p>Изначально в качестве примера показано базовое использование разметки.</p>
                    <p>Используйте кнопку "Предпросмотр" в нижнем-правом углу.</p>
                    Использовать этот формат разметки - необязательно. Можно писать обычный текст.
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FormPopover;

import * as React from 'react';
import {Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Tailwind, Text} from "@react-email/components"

interface EmailTemplateProps {
    name: string
    email: string | undefined;
    message: string
}

export const EmailTemplate = ({name, email, message}: EmailTemplateProps) => (
    <Html>
        <Head/>
    <Preview>Новое сообщение от {name}</Preview>
<Tailwind>
<Body className="bg-gray-100">
<Container className="bg-white border border-gray-200 rounded my-10 px-10 py-8 shadow-md">
<Img src={`https://best-solution.vercel.app/img/logo.png`}
alt="Логотип"
width="92"
height="92"/>
<Heading className="text-2xl font-bold text-gray-800 mb-4">Новое сообщение от {name}</Heading>
{email ?
    <Section className="mb-4">
    <Text className="font-bold text-gray-800">Почта:</Text>
    <Text className="text-gray-700">{email}</Text>
    </Section>
: <Text>{name} не указал почту.</Text>}
<Hr className="border-gray-300 my-2"/>
<Section>
    <Text className="font-bold text-gray-800 mb-2">Сообщение:</Text>
<Section style={section} className={"px-4 py-2"}>
<Text className="text-gray-700 whitespace-pre-wrap">{message}</Text>
    </Section>
    </Section>
    </Container>
    </Body>
    </Tailwind>
    </Html>
);

    const section = {
        border: 'solid 1px #dedede',
        borderRadius: '5px',
        textAlign: 'start' as const,
    };
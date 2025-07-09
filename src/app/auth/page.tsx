"use client"
import {NextPage} from 'next'
import {LoginPage} from './Login'
import {RegisterPage} from './Register'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";


const Page: NextPage = () => {
    const [val, setVal] = useState<string>("login");
    return (
        <Tabs defaultValue="login" className={"overflow-hidden absolute top-1/4 flex flex-col items-center gap-2"}>
            <TabsList className="">
                <TabsTrigger value={"login"} onClick={() => setVal("login")}>Авторизация</TabsTrigger>
                <TabsTrigger value={"registration"} onClick={() => setVal("registration")}>Регистрация</TabsTrigger>
            </TabsList>
            <Card className="w-[95%] lg:w-[600px] shadow-md p-1">
                <CardHeader>
                    <CardTitle>
                        {val === "login" ? "Авторизация" : "Регистрация"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <TabsContent value={"login"}>
                        <LoginPage/>
                    </TabsContent>
                    <TabsContent value={"registration"}>
                        <RegisterPage/>
                    </TabsContent>
                </CardContent>
            </Card>

        </Tabs>
    )
}

export default Page
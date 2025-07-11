export type User =
    {
        id: string;
        login: string | null;
        password: string | null;
        email: string | null;
        role: "USER" | "ADMIN" | null;
    }
    | undefined
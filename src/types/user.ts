export type User =
    {
        id: string;
        login: string | null;
        password: string | null;
        email: string | null;
        emailVerified: Date | null;
        role: "USER" | "ADMIN" | null;
        image: string | null;
    }
    | undefined
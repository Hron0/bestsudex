import {db} from "@/backend/db";
import {User} from "@/types/user";

export class GetUser {

    static async byEmail(email: string): Promise<User | null> {
        try {
            return await db.query.Users.findFirst({
                where: (User, {eq}) => eq(User.email, email),
            });
        } catch {
            return null;
        }
    }

    static async byId(id: string): Promise<User | null> {
        try {
            return await db.query.Users.findFirst({
                where: (User, {eq}) => eq(User.id, id)
            });
        } catch {
            return null;
        }
    }

    static async byLogin(login: string): Promise<User | null> {
        try {
            return await db.query.Users.findFirst({
                where: (User, {eq}) => eq(User.login, login),
            });
        } catch {
            return null;
        }
    }
}
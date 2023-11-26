import prisma from "@/lib/prismadb";
import { error } from "console";

export const GetUserFromEmail = async (uEmail: string) => {
    try {
        const user = prisma.user.findUnique({
            where: {
                email: uEmail
            }
        })

        if (user) {
            return user;
        } else {
            throw error("Invalid User");
        }
    } catch (error) {
        return null;
    }
};

export const GetUserFromId = async (uId: string) => {
    try {
        const user = prisma.user.findUnique({
            where: {
                id: uId
            }
        })

        if (user) {
            return user;
        } else {
            throw error("Invalid User");
        }
    } catch (error) {
        return null;
    }
};
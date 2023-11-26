import { TProject } from "@/app/types";

export const GetAuthor = async (email: string): Promise<TProject | null> => {
    try {
        const res = await fetch(`/api/authors/${email}`, {
            cache: "no-store",
        });

        if (res.ok) {
            const post = await res.json();
            return post;
        }

    } catch (error) {
        console.log(error);
    }
    return null;
};
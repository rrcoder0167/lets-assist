import { TProject } from "@/app/types";

export const GetProject = async (id: string): Promise<TProject | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/projects/${id}`, {
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
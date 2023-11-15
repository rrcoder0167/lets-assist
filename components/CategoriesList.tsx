import { categoriesData } from "@/data";
import Link from "next/link";
import "./CategoriesList.css";

export default function CategoriesList() {
    return (
    <div className="categories-section">
    {categoriesData &&
        categoriesData.map((category) => (
        <Link
            key={category.id}
            className="category"
            href={`/categories/${category.catName}`}
        >
            {category.catName}
        </Link>
        ))}
    </div>
    );
}

/* need to fix this later
import Link from "next/link";
import "./CategoriesList.css";
import { TCategory } from "@/app/types";

const getCategories = async (): Promise<TCategory[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);

        if (res.ok) {
            const categories = await res.json();
            return categories;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
    return null;
}

export default async function CategoriesList() {
    const categories = await getCategories();
    return (
    <div className="categories-section">
    {categories &&
        categories.map((category) => (
        <Link
            key={category.id}
            className="category"
            href={`/categories/${category.catName}`}
        >
            {category.catName}
        </Link>
        ))}
    </div>
    );
}*/
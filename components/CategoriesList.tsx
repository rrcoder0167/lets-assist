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
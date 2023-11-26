import { useEffect, useState } from 'react';
import Link from 'next/link';
import './CategoriesList.css';
import { TCategory } from '@/app/types';

export default function CategoriesList() {
  const [categories, setCategories] = useState<TCategory[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // should be like this not working: const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
        const res = await fetch(`/api/categories`);
        if (res.ok) {
          const categories = await res.json();
          setCategories(categories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="categories-section text-center">
      <h4>Sort By</h4>
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
}
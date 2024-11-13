import React, { useEffect } from "react";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useRecoilState } from "recoil";
import { categoryState } from "../state/CategoryState";
import { errorNotification } from "../config/notification";
import PrimeMenu from "./PrimeMenu";
import { MenuItem } from "primereact/menuitem";
import { Category } from "../types/Category";


const NavbarComp: React.FC = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const fetchCategoryQuery = useFetchCategories();

  useEffect(() => {
    if (category.length === 0 && fetchCategoryQuery.isSuccess) {
      setCategory(fetchCategoryQuery.data.data);
    }
  }, [
    category,
    fetchCategoryQuery.isSuccess,
    fetchCategoryQuery.data?.data,
    setCategory,
  ]);

  if (fetchCategoryQuery.isError) {
    errorNotification(
      "An error occurred",
      "An error occurred while fetching categories"
    );
  }

  interface CategoryNode extends Category {
    subcategories: CategoryNode[];
  }

  function buildCategoryTree(categories: Category[]): CategoryNode[] {
    const categoryMap: { [key: number]: CategoryNode } = {};
    categories.forEach((category) => {
      categoryMap[category.categoryID] = { ...category, subcategories: [] };
    });

    const categoryTree: CategoryNode[] = [];
    categories.forEach((category) => {
      if (category.parent_ID === null) {
        categoryTree.push(categoryMap[category.categoryID]);
      } else {
        categoryMap[category.parent_ID!].subcategories.push(categoryMap[category.categoryID]);
      }
    });

    return categoryTree;
  }

  function convertToMegaMenuItems(categories: CategoryNode[]): MenuItem[] {
    return categories.map((category) => ({
      label: category.name,
      items: convertToMegaMenuItems(category.subcategories),
      command: category.parent_ID === null ? () => {} : () => window.location.replace(`/category/${category.slug}`),
    }));
  }
  const item = buildCategoryTree(category);
  const items = convertToMegaMenuItems(item);
  return <PrimeMenu model={items} />;
};

export default NavbarComp;

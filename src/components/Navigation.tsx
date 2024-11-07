import React, { useEffect } from "react";
import { Card, Layout, Menu, Space } from "antd";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useRecoilState } from "recoil";
import { categoryState } from "../state/CategoryState";
import { errorNotification } from "../config/notification";
import MegaMenu from "./MegaMenu";

const { Header } = Layout;

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

  return (
 
    <MegaMenu category={category} />
  );
};



export default NavbarComp;

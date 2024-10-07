import { Card } from "antd"
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { Category } from "../../types/Category";

const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const categoriesQuery = useFetchCategories();
    
    useEffect(() => {
        console.log(categoriesQuery);
        if (categoriesQuery.status === "success") {
            setCategories(categoriesQuery.data.data);
        }
    }, [categoriesQuery, categoriesQuery.status]);


    return (
    <Card title="Categories">
        {categories.map((category) => (
            <Card key={category.categoryID} style={{margin:'10px'}}>
                {category.categoryName}
            </Card>
        ))}
    </Card>

    );
}

export default AdminCategories;
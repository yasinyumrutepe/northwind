import { Row, Col, Card, Checkbox,  Rate, Button, Input } from "antd";
import { useRecoilValue } from "recoil";
import { categoryState } from "../state/CategoryState";
import { useFetchVariants } from "../hooks/useFetchColor";
import { useEffect, useState } from "react";
import { FilterType, VariantType } from "../types/Variant";

type FilterProps = {
  filters: FilterType;
  setFilters: any;
  handleFilter: any;
};

const FilterComponent: React.FC<FilterProps> = ({
  filters,
  setFilters,
  handleFilter,
}) => {
  const categories = useRecoilValue(categoryState);
  const [colors, setColors] = useState<VariantType[]>([]);
  const [sizes, setSizes] = useState<VariantType[]>([]);
  const variants = useFetchVariants();
  const [tempFilters, setTempFilters] = useState<FilterType>(filters);

  if (variants.isLoading) {
    <p>Loading...</p>;
  }

  useEffect(() => {
    const colorVariants = variants.data
      ?.filter((variant) => variant.variantGroupName === "Color")
      .map((variant) => variant);
    const sizeVariants = variants.data
      ?.filter((variant) => variant.variantGroupName === "Size")
      .map((variant) => variant);
    setColors(colorVariants ?? []);
    setSizes(sizeVariants ?? []);
  }, [variants.isSuccess, variants.data]);

  const handlerCategoryChange = (categoryID: number) => {
    const currentCategories = tempFilters.productFilterKeys.categories || [];
    if (currentCategories.includes(categoryID)) {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          categories: currentCategories.filter(
            (category) => category !== categoryID
          ),
        },
      });
    } else {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          categories: [...currentCategories, categoryID],
        },
      });
    }
  };

  const handleColorChange = (variantID: number) => {
    const currentColors = tempFilters.productFilterKeys.colors || [];

    if (currentColors.includes(variantID)) {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          colors: currentColors.filter((color) => color !== variantID),
        },
      });
    } else {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          colors: [...currentColors, variantID],
        },
      });
    }
  };

  const handleSizeChange = (variantID: number) => {
    const currentSizes = tempFilters.productFilterKeys.sizes || [];

    if (currentSizes.includes(variantID)) {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          sizes: currentSizes.filter((size) => size !== variantID),
        },
      });
    } else {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          sizes: [...currentSizes, variantID],
        },
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    const currentRatings = tempFilters.productFilterKeys.ratings || [];

    if (currentRatings.includes(rating)) {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          ratings: currentRatings.filter((rate) => rate !== rating),
        },
      });
    } else {
      setTempFilters({
        ...tempFilters,
        productFilterKeys: {
          ...tempFilters.productFilterKeys,
          ratings: [...currentRatings, rating],
        },
      });
    }
  };

  const handleChangeMinPrice = (value: any) => {
    setTempFilters({
      ...tempFilters,
      productFilterKeys: {
        ...tempFilters.productFilterKeys,
        minPrice: value.target.value,
      },
    });
  };

  const handleChangeMaxPrice = (value: any) => {
    setTempFilters({
      ...tempFilters,
      productFilterKeys: {
        ...tempFilters.productFilterKeys,
        maxPrice: value.target.value,
      },
    });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    handleFilter();
  };

  return (
    <Col span={6} flex={"auto"}>
      <Card title="Filters">
        <Card title="Categories" style={{ marginBottom: "16px" }}>
          {categories.map((category) => (
            <Col key={category.categoryID}>
              <Checkbox
                onChange={() => handlerCategoryChange(category.categoryID)}
                checked={
                  tempFilters.productFilterKeys.categories?.includes(
                    category.categoryID
                  ) || false
                }
              >
                {category.categoryName}
              </Checkbox>
            </Col>
          ))}
        </Card>
        <Card title="Price" style={{ marginBottom: "16px" }}>
          <Row>
            <Col span={12} style={{ padding: "10px" }}>
              <Input
                onChange={(value) => handleChangeMinPrice(value)}
                type="number"
                placeholder="Min"
              />
            </Col>
            <Col span={12} style={{ padding: "10px" }}>
              <Input
                onChange={(value) => handleChangeMaxPrice(value)}
                type="number"
                placeholder="Max"
              />
            </Col>
          </Row>
        </Card>
        <Card title="Color" style={{ marginBottom: "16px" }}>
          <Col>
            {colors.map((color) => (
              <Checkbox
                onChange={() => handleColorChange(color.variantID)}
                checked={
                  tempFilters.productFilterKeys.colors?.includes(
                    color.variantID
                  ) || false
                }
                key={color.variantID}
              >
                {color.variantName}
              </Checkbox>
            ))}
          </Col>
        </Card>
        <Card title="Size" style={{ marginBottom: "16px" }}>
          <Col>
            {sizes.map((size) => (
              <Checkbox
                onChange={() => handleSizeChange(size.variantID)}
                checked={
                  tempFilters.productFilterKeys.sizes?.includes(size.variantID) ||
                  false
                }
                key={size.variantID}
              >
                {size.variantName}
              </Checkbox>
            ))}
          </Col>
        </Card>
        <Card title="Rating" style={{ marginBottom: "16px" }}>
          <Col>
            <Checkbox onChange={() => handleRatingChange(5)}>
              <Rate value={5} disabled />
            </Checkbox>
            <Checkbox onChange={() => handleRatingChange(4)}>
              <Rate value={4} disabled />
            </Checkbox>
            <Checkbox onChange={() => handleRatingChange(3)}>
              <Rate value={3} disabled />
            </Checkbox>
            <Checkbox onChange={() => handleRatingChange(2)}>
              <Rate value={2} disabled />
            </Checkbox>
            <Checkbox onChange={() => handleRatingChange(1)}>
              <Rate value={1} disabled />
            </Checkbox>
          </Col>
        </Card>
        <Button type="primary" style={{ width: "100%" }} onClick={applyFilters}>
          Apply Filters
        </Button>
      </Card>
    </Col>
  );
};

export default FilterComponent;

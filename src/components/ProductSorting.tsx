import { Button, Card } from "antd";

interface ProductSortingProps {
    sorting: {
        handleSort: (key: string) => void;
    };
    }


export const ProductSorting:React.FC<ProductSortingProps> = ({sorting}) => {

   



    return (
        <Card>
        <Button
          style={{ margin: "5px" }}
          onClick={() => sorting.handleSort("priceAsc")}
        >
          Price Ascending
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => sorting.handleSort("priceDesc")}
        >
          Price Descending
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => sorting.handleSort("newest")}
        >
          Newest
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => sorting.handleSort("bestSelling")}
        >
          Best Selling
        </Button>
      </Card>
    );
    }


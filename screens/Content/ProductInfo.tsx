import { Button, Input, Text } from "@rneui/base";
import OpenFoodFactsApi from "openfoodfac-ts";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import { useState } from "react";
import { ScrollView } from "react-native";
import ProductDetails from "../../components/ProductDetails";

enum Status {
    Init,
    Searching,
    ProductsFound,
    ProductsNotFound
}

export default function ProductInfo() {
    const [status, setStatus] = useState(Status.Init);
    const [value, setValue] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    const searchProduct = async () => {
        if (value.trim()) {
            const openFoodFactsApi = new OpenFoodFactsApi();

            setStatus(Status.Searching);
            setProducts([]);

            const result = await openFoodFactsApi.findProductsBySearchTerm(value);

            if (result.count <= 0) {
                return setStatus(Status.ProductsNotFound);
            }

            setProducts(result.products);
            setStatus(Status.ProductsFound)
        }
    }

    const firstProducts = products.sort((a, b) => (b.completeness || 0) - (a.completeness || 0)).slice(0, 3);

    return <ScrollView>
        <Input value={value} onChangeText={setValue} />
        <Button onPress={searchProduct} title="search" />

        {status === Status.Searching && <Text>Loading...</Text>}
        {status === Status.ProductsNotFound && <Text>Products not found</Text>}
        {status === Status.ProductsFound && firstProducts.map((x, i) => <ProductDetails key={`x._id-${i}`} data={x} />)}
    </ScrollView>
}
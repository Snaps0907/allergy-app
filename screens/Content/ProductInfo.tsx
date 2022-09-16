import { Button, Input, Text } from "@rneui/base";
import OpenFoodFactsApi from "openfoodfac-ts";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ProductDetails from "../../components/ProductDetails";
import { LinearGradient } from 'expo-linear-gradient';

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

    return <ScrollView style={{backgroundColor:"#fff"}}>
        <View style={{position:"relative", zIndex:2}}>
        <Input inputContainerStyle={{borderBottomWidth:0}} value={value} style={{borderWidth:2,padding:5,marginTop:20, borderColor:"gray", borderRadius:10}} onChangeText={setValue} placeholder="Type product name here..."></Input>
        <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180}}><Button color="transparent" onPress={searchProduct} title="search" /></LinearGradient>
        </View>
        {status === Status.Searching && <Text style={{justifyContent:"center",alignSelf:"center", marginTop:40}}>Loading...</Text>}
        {status === Status.ProductsNotFound && <Text>Products not found</Text>}
        {status === Status.ProductsFound && firstProducts.map((x, i) => <ProductDetails key={`x._id-${i}`} data={x} />)}
    </ScrollView>
}
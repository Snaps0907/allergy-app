import { Button, Text } from "@rneui/base";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import ProductDetails from "../../components/ProductDetails";
import { OpenFoodFactsApi } from 'openfoodfac-ts';
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import { LinearGradient } from 'expo-linear-gradient';

enum Status {
    WaitingForPermissions,
    Scanning,
    ScanningCompleted,
    ProductFound,
    ProductNotFound,
    PermissionsNotGranted
}

export default function ScannerScreen() {
    const [status, setStatus] = useState(Status.WaitingForPermissions);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setStatus(status === 'granted' ? Status.Scanning : Status.PermissionsNotGranted);
        })();
    }, []);

    const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
        setStatus(Status.ScanningCompleted);
        getProductData(data);
    };

    const getProductData = async (barcode: string) => {
        const openFoodFactsApi = new OpenFoodFactsApi();

        setProduct(null);

        try {
            const response = await openFoodFactsApi.findProductByBarcode(barcode);

            if (!response) {
                setStatus(Status.ProductNotFound);
                return;
            }

            setProduct(response);
            setStatus(Status.ProductFound);
        } catch (error) {
            setStatus(Status.ProductNotFound);
        }
    };

    if (status === Status.WaitingForPermissions) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (status === Status.PermissionsNotGranted) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            {status === Status.Scanning && <View style={{ flex: 1,marginTop:130 }}><Text style={{textAlign:"center",fontSize:22}} >Scan the barcode here</Text><BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={[StyleSheet.absoluteFillObject,styles.scanner]} /></View>}
            {status === Status.ProductFound && product && <ProductDetails data={product} />}
            {status === Status.ProductNotFound && <Text style={{textAlign:"center",fontSize:22, marginVertical:100}}>Product not found</Text>}
            {(status === Status.ProductFound || status === Status.ProductNotFound) && <LinearGradient colors={['#27AE60', '#85D454']} style={{alignSelf:"center",borderRadius:10, width:180}}><Button color="transparent" title="Scan new product" onPress={() => setStatus(Status.Scanning)} /></LinearGradient>}
        </View>
    );
}
const styles = StyleSheet.create({
    scanner: {
        flex: 1,
         marginTop:40,
        marginBottom:170,
        marginLeft:50,
        marginRight:50,
    }
})
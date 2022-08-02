import { Button, Text } from "@rneui/base";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import ProductDetails from "../../components/ProductDetails";
import { OpenFoodFactsApi } from 'openfoodfac-ts';
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";

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
            {status === Status.Scanning && <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />}
            {status === Status.ProductFound && product && <ProductDetails data={product} />}
            {status === Status.ProductNotFound && <Text>Product not found</Text>}
            {(status === Status.ProductFound || status === Status.ProductNotFound) && <Button title="Scan new product" onPress={() => setStatus(Status.Scanning)} />}
        </View>
    );
}
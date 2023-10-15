import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const OrderFormPDF = () => {
	return (
		<Document>
			<Page>
				<Text style={tw("text-xl")}>WEBSITE DESIGN & MAINTENANCE ORDER FORM (Front)</Text>
			</Page>
		</Document>
	);
};

export default OrderFormPDF;

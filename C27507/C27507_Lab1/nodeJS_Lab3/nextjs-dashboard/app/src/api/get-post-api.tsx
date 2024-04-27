//Interfaces
import { RegisteredSaleAPI } from "../models-data/RegisteredSale";

    //POST Sale
    export async function sendDataAPI(directionAPI:string, data:any): Promise<string | null> {

        //Especificacion POST
        let postConfig = {
            method: "POST",
            //pasamos un objeto como atributo de otro
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        try {
    
                //A las peticiones POST se les debe agregar parametro de configuracion para diferenciarlas de las
            //GET            
            let responsePost = await fetch(directionAPI,postConfig);
            //await solo se puede usar dentro de funciones asincronas
    
            if(!responsePost.ok){
                //Obtenemos el mensaje de error de CartController
                const errorMessage = await responsePost.text();
                return errorMessage;
            }
            // Obtener los datos de la respuesta en formato JSON                        
            const responseData = await responsePost.json();        
            const purchaseNum = responseData.purchaseNum;        
            return purchaseNum;
            
        } catch (error) {
            throw new Error('Failed to POST data: '+ error);
        }        
    }


    export async function getRegisteredSalesFromAPI(directionAPI: string, data: any): Promise<string | RegisteredSaleAPI[] | null> {


        //Especificacion POST
        let postConfig = {
            method: "POST",
            //pasamos un objeto como atributo de otro
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        try {         
            let responsePost = await fetch(directionAPI,postConfig);
            if(!responsePost.ok){                
                const errorMessage = await responsePost.text();
                console.log("Error: " + errorMessage);
                return errorMessage;
            }        
            const jsonRegisteredSales = await responsePost.json();
            console.log("Respuesta JSON: " + jsonRegisteredSales);
            console.log(jsonRegisteredSales.specificListOfRegisteredSales);
            // console.log(typeof jsonRegisteredSales.specificListOfRegisteredSales);
            console.log("Respuesta formateada:", JSON.stringify(jsonRegisteredSales.specificListOfRegisteredSales, null, 2));            

            // jsonRegisteredSales.specificListOfRegisteredSales.forEach((sale: any, index: number) => {
            //     console.log(`Venta ${index + 1}:`);
            //     console.log("IdSale:", sale.idSale);
            //     console.log("PurchaseNum:", sale.purchaseNum);
            //     console.log("SubTotal:", sale.subTotal);
            
            // });            
            return jsonRegisteredSales.specificListOfRegisteredSales;
            
        } catch (error) {
            throw new Error('Failed to POST data: '+ error);
        }        
    }

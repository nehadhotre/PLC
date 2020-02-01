/// <reference path="../Lib/jquery-3.4.1.min.js"/>

function salesInvoiceController(localStorageKeyName = undefined) {

    let localStorageKeyNameStr = localStorageKeyName; // Encpsulation
    let salesModelObj = null; // Object

    // Private Method
    let getSalesModelDataFromLocalStorageAsync = async function () {
        let salesModelJson = undefined; // String
        try {
            return await new Promise((resolve) => {

                salesModelJson = localStorage.getItem(localStorageKeyNameStr);
                localStorage.clear();

                return resolve(salesModelJson);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let convertSalesModelJsonIntoObjectAsync = async function (salesModelJson) {
        try {
            return await new Promise((resolve) => {

                salesModelObj = JSON.parse(salesModelJson);

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    // UI
    let bindCustomerModelAsync = async function () {
        try {
            return await new Promise((resolve) => {


                $("#lblCustomerName").html(salesModelObj.customerModel.fullName);
                $("#lblCustomerType").html(salesModelObj.customerModel.customerType);
                $("#lblCustomerState").html(salesModelObj.customerModel.state);

                return resolve(true);
            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let bindProductModelAsync = async function () {
        try {
            return await new Promise((resolve) => {


                $("#lblProductName").html(salesModelObj.productModel.productName);
                $("#lblProductPrice").html(salesModelObj.productModel.productPrice);
                $("#lblProductQuantity").html(salesModelObj.quantity);

                return resolve(true);
            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let bindPriceandDiscountModelAsync = async function () {
        try {
            return await new Promise((resolve) => {


                $("#lblTotalPrice").html(salesModelObj.totalProductPrice);
                $("#lblDiscountRate").html(salesModelObj.discountModel.discountRate);
                $("#lblDiscountPrice").html(salesModelObj.discountModel.discountPrice);
                $("#lblGrossPrice").html(salesModelObj.grandTotal);
                $("#lblNetPrice").html(salesModelObj.netPrice);


                return resolve(true);
            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let bindGstModelAsync = async function () {
        try {
            return await new Promise((resolve) => {


                $("#lblCgst").html(salesModelObj.gstModel.cgst);
                $("#lblSgst").html(salesModelObj.gstModel.sgst);
                $("#lblIgst").html(salesModelObj.gstModel.igst);


                return resolve(true);
            });
        }
        catch (ex) {
            throw ex;
        }
    }


    // Public Method
    this.onLoadAsync = async function () {
        let salesModelJson = undefined; // String
        try {
            return await new Promise(async (resolve) => {

                // get sales Model Json Data from Local Storage
                salesModelJson = await getSalesModelDataFromLocalStorageAsync();

                // parse sales Model Json into Sales Model Object
                await convertSalesModelJsonIntoObjectAsync(salesModelJson);

                // Bind Customer Model
                await bindCustomerModelAsync();

                // Bind Product Model
                await bindProductModelAsync();

                // Bind Discount and Prices
                await bindPriceandDiscountModelAsync();

                // Bind Gst
                await bindGstModelAsync();

                return resolve(true);

            });
        }
        catch (ex) {
            console.log(ex.message);
            console.log(ex.stack);
        }

    }

}



function onSalesInvoicePageLoadEvent() {
    let salesInvoiceControllerObj = null; // Object
    let localStorageKeyName = undefined; // String 
    try {

        localStorageKeyName = "salesModelKey";

        // Create an instance of Sales invoice Controller
        salesInvoiceControllerObj = new salesInvoiceController(localStorageKeyName);
        salesInvoiceControllerObj
            .onLoadAsync()
            .then((resolve) => console.log(resolve));

    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
    }
}

onSalesInvoicePageLoadEvent();
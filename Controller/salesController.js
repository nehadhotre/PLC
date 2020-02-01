///<reference path="../Lib/jquery-3.4.1.min.js"/>
///<reference path="../Model/customerModel.js"/>
///<reference path="../Model/productModel.js"/>
///<reference path="../Model/discountModel.js"/>
///<reference path="../Model/gstModel.js"/>
///<reference path="../Model/salesModel.js"/>
///<reference path="../BL/salesBL.js"/>





function salesController(salesModel = undefined, salesBl = undefined) {

    let salesModelObj = salesModel; // Encapsulation
    let salesBlObj = salesBl; // Encapsulation

    // Private Method
    let getCustomerDataAsync = async function () {
        try {

            return await new Promise((resolve) => {

                salesModelObj
                    .customerModel
                    .fullName = $("#txtCustomerName").val();

                salesModelObj
                    .customerModel
                    .customerType = $("#ddlCustomerType option:selected").val();

                salesModelObj
                    .customerModel
                    .state = $("#txtState").val();

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let getProductDataAsync = async function () {
        try {
            return await new Promise((resolve) => {

                salesModelObj
                    .productModel
                    .productName = $("#txtProductName").val();

                salesModelObj
                    .productModel
                    .productPrice = $("#txtProductPrice").val();

                salesModelObj
                    .quantity = $("#txtQuantity").val();

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let salesModelJsonConvertAsync = async function () {
        try {
            return await new Promise((resolve) => {

                return resolve(JSON.stringify(salesModelObj));

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let storeSalesModelJsonAsync = async function (salesModelJson) {
        try {
            return await new Promise((resolve) => {

                localStorage.setItem("salesModelKey", salesModelJson);

                return resolve(true);

            })
        }
        catch (ex) {
            throw ex;
        }
    }

    let redirectToSalesInvoicePageAsync = async function () {

        try {
            return await new Promise((resolve) => {

                window.location.pathname = "../../../Day18/PLC/View/salesInvoice.html";

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }


    }
    // Public Method
    this.onSubmit = async function () {
        let salesModelJson = undefined; // String
        try {

            return await new Promise(async (resolve) => {

                // get Customer Information
                await getCustomerDataAsync();
                // Get Product Information
                await getProductDataAsync();

                // Calculate Sales Operation
                salesModelObj = await salesBlObj.salesCalculationAsync();

                // Convert Sales Model Object into JSon
                salesModelJson = await salesModelJsonConvertAsync();

                // Store Sales Model Json
                await storeSalesModelJsonAsync(salesModelJson);

                // redirect to sales Invoice page
                await redirectToSalesInvoicePageAsync();


                return resolve();

            });
        }
        catch (ex) {
            console.log(ex.message);
            console.log(ex.stack);
        }
    }

    this.onCancel = async function () {
        try {

            return await new Promise((resolve) => {

                $("#txtCustomerName").val("");
                $("#ddlCustomerType").val("Select Customer Type");
                $("#txtState").val("");

                $("#txtProductName").val("");
                $("#txtProductPrice").val("");
                $("#txtQuantity").val("");

                $("#txtCustomerName").focus();

                return resolve(true);

            })

        }
        catch (ex) {
            console.log(ex.message);
            console.log(ex.stack);
        }

    }
}

function onSubmitButtonClickEvent() {
    let salesControllerObj = null;
    let salesModelObj = null;
    let customerModelObj = null;
    let productModelObj = null;
    let discountModelObj = null;
    let gstModelObj = null;

    let salesBlObj = null;
    try {

        // Create an Instance of CustomerProduct Model
        customerModelObj = new customerModel();

        // Create an instance of Product Model.
        productModelObj = new productModel();

        // Create an instance of Discount Model.
        discountModelObj = new discountModel();

        // Create an instance of Gst Model
        gstModelObj = new gstModel();

        // Create an insatnce of Sales Model Object
        salesModelObj = new salesModel();
        salesModelObj.customerModel = customerModelObj; // Bind Customer Model Object
        salesModelObj.productModel = productModelObj; // Bind Product Model Obejct
        salesModelObj.discountModel = discountModelObj; // Bind discount Model Obejct
        salesModelObj.gstModel = gstModelObj; // Bind gst Model Object    

        // Create an instance of Sales BLogic;
        salesBlObj = new salesBl(salesModelObj);


        // Create an instance of Sales Controller Object
        salesControllerObj = new salesController(salesModelObj, salesBlObj);
        salesControllerObj
            .onSubmit()
            .then((resolve) => console.log(resolve));

    }
    catch (exception) {
        console.log(exception.message);
        console.log(exception.stack);
    }
}

function onCancelButtonClickEvent() {
    let salesControllerObj = null;
    try {

        salesControllerObj = new salesController();
        salesControllerObj
            .onCancel()
            .then((resolve) => console.log(resolve));

    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);


    }

}
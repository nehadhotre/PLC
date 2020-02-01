function salesBl(salesModel) {

    let salesModelObj = salesModel; // Encapsulation

    // private Method
    let calculationTotalPriceBasedOnQuantityAsync = async function () {
        let result = undefined; // Number
        try {
            return await new Promise((resolve) => {

                result =
                    salesModelObj
                        .productModel
                        .productPrice
                    *
                    salesModelObj
                        .quantity;

                salesModelObj
                    .totalProductPrice = result;

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

    let calculateDiscountPriceAsPerCustomerTypeAsync = async function () {
        let customerType = undefined; // String
        try {

            return await new Promise((resolve) => {

                customerType =
                    salesModelObj
                        .customerModel
                        .customerType;

                if (customerType === "Silver") {

                    salesModelObj
                        .discountModel
                        .discountRate = 5;

                }
                else if (customerType === "Gold") {
                    salesModelObj
                        .discountModel
                        .discountRate = 10;
                }
                else if (customerType === "Platinum") {
                    salesModelObj
                        .discountModel
                        .discountRate = 15;
                }
                else if (customerType === "Diamond") {
                    salesModelObj
                        .discountModel
                        .discountRate = 20;
                }

                // Calculate discount Price
                salesModel
                    .discountModel
                    .discountPrice =
                    (salesModelObj
                        .totalProductPrice
                        *
                        salesModelObj
                            .discountModel
                            .discountRate / 100);


                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }

    }

    let calculateGrandTotalAsync = async function () {
        try {
            return await new Promise((resolve) => {

                salesModelObj
                    .grandTotal =
                    (
                        salesModelObj
                            .totalProductPrice
                        -
                        salesModelObj
                            .discountModel
                            .discountPrice

                    );

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }

    }

    let calculateGSTAsync = async function () {
        let customerState = undefined; // String
        let gst = undefined; // Number
        try {
            return await new Promise((resolve) => {

                customerState =
                    salesModelObj
                        .customerModel
                        .state;

                // Set Default Value as 0
                salesModelObj
                    .gstModel
                    .cgst = 0;

                salesModelObj
                    .gstModel
                    .sgst = 0;

                salesModelObj
                    .gstModel
                    .igst = 0;



                gst =
                    salesModelObj
                        .grandTotal
                    *
                    18 / 100;

                if (customerState === "Maharashtra") {
                    // CGST & SGST

                    salesModelObj
                        .gstModel
                        .cgst = gst / 2;

                    salesModelObj
                        .gstModel
                        .sgst = gst / 2;



                }
                else {
                    // IGST
                    salesModelObj
                        .gstModel
                        .igst = gst;
                }

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }


    }

    let calculateNetPriceAsync = async function () {
        try {
            return await new Promise((resolve) => {

                salesModelObj
                    .netPrice =
                    (
                        salesModelObj
                            .grandTotal
                    )
                    +
                    (
                        salesModelObj
                            .gstModel
                            .cgst
                        +
                        salesModelObj
                            .gstModel
                            .sgst
                        +
                        salesModelObj
                            .gstModel
                            .igst
                    );

                return resolve(true);

            });
        }
        catch (ex) {
            throw ex;
        }

    }

    // Public Method
    this.salesCalculationAsync = async function () {
        try {
            return await new Promise(async (resolve) => {
                // Calulcate Price based on Quantity
                await calculationTotalPriceBasedOnQuantityAsync();

                // calculate discount price as per the customer type
                await calculateDiscountPriceAsPerCustomerTypeAsync();

                // calculate grand total
                await calculateGrandTotalAsync();

                // calculate GST
                await calculateGSTAsync();

                // Calculate Net Price
                await calculateNetPriceAsync();

                return resolve(salesModelObj);

            });
        }
        catch (ex) {
            throw ex;
        }
    }

}
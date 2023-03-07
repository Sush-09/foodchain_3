const routes = require('next-routes')();

routes
    .add('/viewStatus/:id','/viewStatus')
    .add('/QRCode','/QRCode')
    .add('/statusTable','/statusTable')
    .add('/Manager/signInOrSignUp', '/Manager/signInOrSignUp')
    .add('/Manager/signIn','/Manager/signIn')
    .add('/Manager/:address/viewItems','/Manager/viewItems')
    .add('/Manager/:address/viewPurchasedItems','/Manager/viewPurchasedItems')
    .add('/Manager/:address/:id/addFinalProduct','/Manager/addFinalProduct')
    .add('/Manager/:address/viewProducts','/Manager/viewProducts')
    .add('/Manager/signUp','/Manager/signUp')
    .add("/Manager/:address/:id", "/Manager/item")
    .add('/Farmer/signInOrSignUp', '/Farmer/signInOrSignUp')
    .add('/Farmer/signIn','/Farmer/signIn')
    .add('/Farmer/signUp','/Farmer/signUp')
    .add("/Farmer/:address", "/Farmer/viewItems")
    .add("/Farmer/:address/new","/Farmer/new")
    .add('/Retailer/signIn','/Retailer/signIn')
    .add('/Retailer/signUp','/Retailer/signUp')
    .add("/Retailer/:address/viewItems","/Retailer/viewItems")
    .add("/Retailer/:address/viewPurchasedProducts","/Retailer/viewPurchasedProducts")
    .add("/Retailer/:address/:id","/Retailer/item")
    .add('/Distributer/signIn','/Distributer/signIn')
    .add('/Distributer/signUp','/Distributer/signUp')
    .add("/Distributer/:address/viewItems","/Distributer/viewItems")
    .add("/Distributer/:address/viewPurchasedProducts","/Distributer/viewPurchasedProducts")
    .add("/Distributer/:address/:id","/Distributer/item")
    .add("/Status/ProduceByFarmer/:id","/Status/ProduceByFarmer")
    .add("/Status/:id/:address/PurchasedByManufacturer","/Status/PurchasedByManufacturer")
    .add("/Status/ProducedByManufacturer/:id/:address","/Status/ProducedByManufacturer")
    .add("/Status/PurchasedByDistributor/:id/:address","/Status/PurchasedByDistributor")
    .add("/Status/PurchasedByRetailer/:id/:address","/Status/PurchasedByRetailer");


module.exports = routes;
const routes = require('next-routes')();

routes
    .add('/viewStatus','/viewStatus')
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
    .add("/Retailer/:address/:id","/Retailer/item");


module.exports = routes;
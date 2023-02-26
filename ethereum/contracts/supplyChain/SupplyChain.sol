pragma solidity ^0.4.17;

contract FoodSupplyChain {

    address admin;
    uint256 item_id=0;
    uint256 finalItemId = 0;
    uint256 itemsPurchasedId = 0;
    uint256 productsPurchasedId = 0;

    struct Item {
        uint256 id; 
        //address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address originFarmerID; // Metamask-Ethereum address of the Farmer // ADDED PAYABLE
        string originFarmName; // Farmer Name
        string productName; // Product Notes
        uint256 quantity;
        uint256 pricePerUnit; // Product Price per unit
        uint256 quantityAvailable;
        //State itemState; // Product State as represented in the enum above
        // address manufacturerID;
        // uint256 FinalProductId;
    }

    struct ItemPurchasedByManufacturer {
        uint256 id; 
        address ownerID;
        address originFarmerID; // Metamask-Ethereum address of the Farmer // ADDED PAYABLE
        address manufacturerID;
        string productName; // Product Notes
        uint256 quantity;
        uint256 pricePerUnit; // Product Price per unit
        //State itemState; // Product State as represented in the enum above
        uint256 FinalProductId;
    }

    struct FinalProduct {
        uint256 f_id; 
        uint256 originalId;
        //address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address originManufacturerID; // Metamask-Ethereum address of the Farmer // ADDED PAYABLE
        string originFactory; // Farmer Name
        string productName; // Product Notes
        uint256 quantity;
        uint256 pricePerUnit; // Product Price
        uint256 quantityAvailable;
        //State itemState; // Product State as represented in the enum above
        // address distributerID;
        // address retailerID;
    }

    struct ProductPurchasedByRetailer {
        uint256 f_id; 
        uint256 originalId;
        address ownerID; // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address originManufacturerID; // Metamask-Ethereum address of the Farmer // ADDED PAYABLE
        address retailerId;
        string originFactory; // Farmer Name
        string productName; // Product Notes
        uint256 quantity;
        uint256 pricePerUnit; // Product Price
        //State itemState; // Product State as represented in the enum above
        // address distributerID;
        // address retailerID;
    }
    

    enum State {
        ProduceByFarmer, // 0
        RequestByManufacturer, // 1
        AcceptRequestByFarmer,
        RejectRequestByFarmer,
        PurchasedByManufacturer,
        ProducedByManufacturer,
        PurchasedByDistributor, // 2
        ShippedByFarmer, // 3
        ReceivedByDistributor, // 4
        ProcessedByDistributor, // 5
        PackageByDistributor, // 6
        ForSaleByDistributor, // 7
        PurchasedByRetailer, // 8
        ShippedByDistributor, // 9
        ReceivedByRetailer, // 10
        ForSaleByRetailer, // 11
        PurchasedByConsumer // 12
    }

    State constant defaultState = State.ProduceByFarmer;


    Item[] public item_list;
    ItemPurchasedByManufacturer[] public itemsPurchased_list;
    FinalProduct[] public product_list;
    ProductPurchasedByRetailer[] public productsPurchased_list;


    mapping(address => bool) public Farmers;
    mapping(address => bool) public Manufacturers;
    mapping(address => bool) public Distributers;
    mapping(address => bool) public Retailers;
    mapping (uint256 => Item) public items;
    mapping (uint256 => ItemPurchasedByManufacturer) public itemsPurchased;
    mapping(uint256 => FinalProduct) public products;
    mapping (uint256 => ProductPurchasedByRetailer) public productsPurchased;
    mapping(address => uint[]) public itemsByManufacturer;
    mapping(address => uint[]) public itemsByRetailer; 

    function FoodSupplyChain() public {
        admin = msg.sender;
    }
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyFarmer() {
        require(Farmers[msg.sender]);
        _;
    }

    modifier onlyManufacturer() {
        require(Manufacturers[msg.sender]);
        _;
    }

    modifier onlyDistributer() {
        require(Distributers[msg.sender]);
        _;
    }

    modifier onlyRetailer() {
        require(Retailers[msg.sender]);
        _;
    }


    
    function addFarmer(address accAdd) public restricted{
        Farmers[accAdd] = true;
    } 

    function addManufacturer(address accAdd) public restricted{
        Manufacturers[accAdd] = true;
    }

    function addDistributer(address accAdd) public restricted{
        Distributers[accAdd] = true;
    } 

    function addRetailer(address accAdd) public restricted{
        Retailers[accAdd] = true;
    } 

    function addItem(
      string originFarmName,
      string productName,
      uint256 quantity,
      uint256 pricePerUnit

    ) public onlyFarmer {
        // address manufacturerID;
        // uint256 FinalProductId;
        Item memory new_item = Item(item_id,msg.sender,originFarmName,productName,quantity,pricePerUnit,quantity);
        items[item_id]=(new_item);
        item_list.push(new_item);
        item_id++;
    }

     

    function purchasedByManufacturer(uint256 id, uint256 quantity) public onlyManufacturer{
        //require(items[id].itemState == State.ProduceByFarmer);
        uint256 FinalProductId;
        items[id].quantityAvailable = items[id].quantityAvailable - quantity;
        //items[id].itemState = State.PurchasedByManufacturer;
        //items[id].manufacturerID = msg.sender;
        //items[id].ownerID = msg.sender;
        itemsByManufacturer[msg.sender].push(itemsPurchasedId);

        ItemPurchasedByManufacturer memory new_item = ItemPurchasedByManufacturer(id,msg.sender,items[id].originFarmerID,msg.sender,items[id].productName,quantity,items[id].pricePerUnit,FinalProductId);
        itemsPurchased[itemsPurchasedId] = (new_item);
        itemsPurchased_list.push(new_item);
        itemsPurchasedId++;
    }

    function getItemsLength() public view returns(uint){
        return item_list.length;
    }

    function getItemsPurchasedLength() public view returns(uint){
        return itemsPurchased_list.length;
    }

    function getProductsLength() public view returns(uint){
        return product_list.length;
    }

    function getProductsPurchasedLength() public view returns(uint){
        return productsPurchased_list.length;
    }

    function addProductByManufacturer( 
        uint256 originalId, 
        string originFactory, 
        string productName,
        uint256 quantity,
        uint256 productPrice
        ) public onlyManufacturer {
            // address distrbuterID;
            // address retailerID;
            FinalProduct memory new_product = FinalProduct(finalItemId,originalId,msg.sender,originFactory,productName,quantity,productPrice,quantity);
            products[finalItemId]=(new_product);
            product_list.push(new_product);
            //items[originalId].FinalProductId = finalItemId;
            finalItemId++;
    }



    function purchasedByRetailer(uint256 f_id, uint256 quantity) public onlyRetailer{
        //require(products[f_id].itemState == State.ProducedByManufacturer);

        products[f_id].quantityAvailable = products[f_id].quantityAvailable - quantity;
        //products[f_id].itemState = State.PurchasedByRetailer;
       // products[f_id].retailerID = msg.sender;
        //products[f_id].ownerID = msg.sender;
        itemsByRetailer[msg.sender].push(productsPurchasedId);

        ProductPurchasedByRetailer memory new_product = ProductPurchasedByRetailer(f_id,products[f_id].originalId,msg.sender,products[f_id].originManufacturerID,msg.sender,products[f_id].originFactory,products[f_id].productName,quantity,products[f_id].pricePerUnit);
        productsPurchased[productsPurchasedId] = (new_product);
        productsPurchased_list.push(new_product);
        productsPurchasedId++;
        
    }

    
    



}
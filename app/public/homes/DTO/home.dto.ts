import { Home, HomeStatus, Property } from "@prisma/client";
class CreateHome  {
    thumbnail:String
    imagesOfHouse: Array<String>
    status:HomeStatus
    rent_price : Number
    discount_rent_price: Number
    discount_rate:Number
    rating:Float64Array
    address:String
    city:String
    state:String
    pincode:String
    description:String
    depositAmount:String
    bedrooms:Number
    bathrooms:Number
    areaSize:Float64Array
    propertyType:Property
    availableFrom:Date
    lessDurationMonth:Number
    furnitureAvailable:Boolean
    
    constructor(data:Home){
        
    }
}
export class SearchRequestDTO {
   q: string;
   price:string;
   rooms:string;
   propertyType:string;
   rating:string;
   constructor(q: string, price?: string, rooms?: string,propertyType?: string, rating?: string) {
      this.q = q;
      this.price = price;
      this.rooms = rooms;
      this.propertyType = propertyType;
      this.rating = rating;
   }
   validator() {
      if (!this.q) {
         return "Required Parameter Not Here '?q'";
      }
      return this.q;
   }
}

export class SearchResponseDTO {
   id: string;
   thumbnail: String;
   propertyType: String;
   BHK: string;
   rating: string;
   address: String;
   city: String;
   country: string;
   rent_price: string;
   status: string;

   constructor(
      id: string,
      thumbnail: string,
      propertyType: string,
      BHK: string,
      rating: string,
      address: string,
      city: string,
      country: string,
      rent_price: string,
      status: string
   ) {
      this.id = id;
      this.thumbnail = thumbnail;
      this.propertyType = propertyType;
      this.BHK = BHK;
      this.rating = rating;
      this.address = address;
      this.city = city;
      this.country = country;
      this.rent_price = rent_price;
      this.status = status;
   }
}

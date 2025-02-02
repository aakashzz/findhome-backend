import { prisma } from "../../../config/config";


class SearchDOA {
    async searchingHomeQuery(query:string){
        return await prisma.home.findMany({
            where:{
                OR:[
                    {
                        city:{contains:query, mode:"insensitive"},
                    },
                    {
                        state:{contains:query, mode:"insensitive"},
                    },
                    {
                        address:{contains:query, mode:"insensitive"}
                    }
                ]
            },
            select:{
                id:true,
                thumbnail:true,
                address:true,
                city:true,
                BHK:true,
                propertyType:true,
                country:true,
                rating:true,
                rent_price:true,
                status:true
            }
        })
    }
}

export const searchDOA = new SearchDOA();
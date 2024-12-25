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
            }
        })
    }
}

export const searchDOA = new SearchDOA();
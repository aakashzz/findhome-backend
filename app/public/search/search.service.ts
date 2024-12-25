import { ApiError } from "../../utils/ApiError";
import { searchDOA } from "./DAO/search.dao";
import { SearchRequestDTO } from "./DTO/search.dto";

async function searchHome(query) {
   const response = await searchDOA.searchingHomeQuery(query);
   if (!response) {
      throw new ApiError(502, "Something Wrong Query Not Work");
   }
   return response;
}

export { searchHome };

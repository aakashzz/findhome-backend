import { Requests } from "../../types/request.type";
import { ApiError } from "../../utils/ApiError";
import { Response } from "express";
import { searchHome } from "./search.service";
import { SearchRequestDTO, SearchResponseDTO } from "./DTO/search.dto";

async function searchLocation(req: Requests, res: Response) {
   try {
      const { q } = req.query;
      const searchQuery = new SearchRequestDTO(
         typeof q === "string" ? q : ""
      ).validator();
      const result = await searchHome(searchQuery);
      if (!result) {
         throw new ApiError(404, "Not Found");
      }

      const rearrangeResult = result.map(
         (value) =>
            new SearchResponseDTO(
               value.id,
               value.thumbnail,
               value.propertyType,
               value.BHK,
               value.rating,
               value.address,
               value.city,
               value.country,
               value.rent_price,
               value.status
            )
      );
      res.status(200).json(rearrangeResult);
   } catch (error: any) {
      res.status(error.statusCode).json(new ApiError(error.statusCode || error.status, error.message));
   }
}



export { searchLocation };

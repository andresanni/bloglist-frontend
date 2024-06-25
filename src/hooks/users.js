import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const useFetchUsers = (id)=>{
    return useQuery({
        queryKey: id ? ["user", id] : ["users"],
        queryFn: id ? ()=> userService.getById(id) : userService.getAll
    })
}
export { useFetchUsers }

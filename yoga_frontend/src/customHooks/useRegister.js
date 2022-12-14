import  {useMutation} from 'react-query'
import axios from 'axios'
export default function useRegister(){
    async function queryAPI(body){
        try{
        let data = await axios.post("/api/register",body,{ withCredentials: true })
        return data
        }catch(err){
            return err
        }
    }
    
    const {mutate:register , isError, isLoading,isSuccess} = useMutation(queryAPI);
    
    return {
        register,
        isError,
        isLoading,
        isSuccess
    }
}

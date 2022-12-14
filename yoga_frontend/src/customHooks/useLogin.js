import  {useMutation} from 'react-query'
import axios from 'axios'
export default function useLogin(){
    async function queryAPI(body){

        let data = await axios.post("/api/login",body,{ withCredentials: true })
        return data
    }
    
    const {mutate:login , isError, isLoading,isSuccess} = useMutation(queryAPI);
    
    return {
        login,
        isError,
        isLoading,
        isSuccess
    }
}

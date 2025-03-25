import axios from "axios";

const T_API_KEY = import.meta.env.VITE_THESAURUS_API_KEY;
const T_API_URL = import.meta.env.VITE_THESAURUS_API_URL;

const fetchWordData = async(word) => {
    try{
        const responseData = await axios.get(`${T_API_URL}/${word}?key=${T_API_KEY}`);
        return responseData.data;
    }catch(error){
        alert("Error fetching data", error);
        return null;
    }

}
export default fetchWordData;

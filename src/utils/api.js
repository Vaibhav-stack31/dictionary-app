import axios from "axios";

const VITE_THESAURUS_API_KEY = import.meta.env.VITE_THESAURUS_API_KEY;
const VITE_THESAURUS_API_URL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json";

const fetchWordData = async(word) => {
    try{
        const responseData = await axios.get(`${VITE_THESAURUS_API_URL}/${word}?key=${VITE_THESAURUS_API_KEY}`);
        return responseData.data;
    }catch(error){
        alert("Error fetching data", error);
        return null;
    }

}
export default fetchWordData;

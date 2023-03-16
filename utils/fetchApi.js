import axios from "axios";
export const baseUrl = 'https://bayut.p.rapidapi.com';







  export const fetchApi = async (url) => {
    const {data} = await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': '1291be3fdemshdcd77ce5b25c8c5p199394jsn65dfda105ce1',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    });
    return data;
  }
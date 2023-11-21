import axios from "axios";
import { useEffect, useState } from "react"

export const useCategory = () => {
    const [categories, setCategories] = useState([]);

    // get all categories
    const getCategories =async () => {
        try{
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.category)
        }catch(err){
            console.log(err.message)
        }
    }
    // life cycle hook
    useEffect(() => {
        getCategories()
    }, [])
    return categories
}
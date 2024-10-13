import axios from "axios"
import { useEffect, useState } from "react";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        // add loader.
        let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        console.log(data.categories);
        setCategories(data.categories);
    }
    useEffect(() => {
        getCategories();
    }, [])
    return (
        <>
            <h2>Categories</h2>
            <div className="row">
                {
                    categories.map(category =>
                        <div className="category col-2" key={category._id}>
                            <img src={category.image.secure_url} />
                            <p>{category.name}</p>
                        </div>)
                }
            </div>
        </>
    )
}

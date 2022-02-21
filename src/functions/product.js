import axios from 'axios'



export const getProductsByCount = async (count) =>  await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

export const createProduct = async (userId, product, authtoken) =>  await axios.post(`${process.env.REACT_APP_API}/product/create/${userId}`,product, {
    headers: {
        authtoken
    }
})

export const productsByUser = async (userId) => await axios.get(`${process.env.REACT_APP_API}/products/by/${userId}`)

export const getProduct = async (id) =>  await axios.get(`${process.env.REACT_APP_API}/product/${id}`)

export const updateProduct = async (id, product, authtoken) =>  await axios.put(`${process.env.REACT_APP_API}/product/edit/${id}`,product, {
    headers: {
        authtoken
    }
})


export const removeProduct = async (id, authtoken) =>     await axios.delete(`${process.env.REACT_APP_API}/product/${id}`, {
    headers: {
        authtoken
    }
})

export const removeProductByAdmin = async (id, authtoken) =>  await axios.delete(`${process.env.REACT_APP_API}/admin-product/${id}`,{
    headers: {
        authtoken
    }
})

export const getProductsCount = async (arg) => {
   return await axios.post(`${process.env.REACT_APP_API}/products/total`,arg)

}

export const getProducts = async (sort, order, page, num) =>  await axios.post(`${process.env.REACT_APP_API}/products`,{sort, order, page, num})

export const filterProducts = async (arg, sort, order, page, num) => 
await axios.post(`${process.env.REACT_APP_API}/filter-products`, {arg, sort, order, page, num})



// add category

import { baseURL } from "./baseURL"
import { commonAPI } from "./commonAPI"


// admin cred
export const login = async(adminData)=>{
   return await commonAPI("POST",`${baseURL}admin/login`,adminData,"")
}

// add category
export const addCategory = async (reqBody,reqHeader) => {
   return await commonAPI("POST",`${baseURL}categories`,reqBody,reqHeader)
}

// get all categories

export const getAllCategories = async(reqBody)=>{
   return await commonAPI("GET",`${baseURL}categories`,"",reqBody)
}

//  delete category by id
export const deleteById = async(_id,reqHeader)=>{
   return await commonAPI("DELETE",`${baseURL}categories/delete/${_id}`,"",reqHeader)
}

// edit category

export const editCategory = async(id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${baseURL}categories/edit/${id}`,reqBody,reqHeader)
}


// add Product

export const addProduct = async(reqBody,reqHeader)=>{
   return await commonAPI("POST",`${baseURL}products`,reqBody,reqHeader)
}

// get all products
export const getAllProducts = async(searchKey,reqHeader)=>{
   return await commonAPI("GET",`${baseURL}products?search=${searchKey}`,"",reqHeader)
}

//delete product by Id
export const deleteProductById = async(_id,reqHeader)=>{
   return await commonAPI("DELETE",`${baseURL}products/delete/${_id}`,"",reqHeader)
}
// get pruct by category

export const getProductsByCategory = async(category,reqHeader)=>{
   return await commonAPI("GET",`${baseURL}products/category/${category}`,"",reqHeader)
}

// edit product
export const editProduct = async(id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${baseURL}products/edit/${id}`,reqBody,reqHeader)
}


// get all users details
export const getAllUsersDetails = async()=>{
   return await commonAPI("GET",`${baseURL}user/getallusers`,"","")
}

// all orders

export const getAllOrders = async(reqHeader)=>{
   return await commonAPI("GET",`${baseURL}orders/all`,"",reqHeader)
}
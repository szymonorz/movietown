import axios from 'axios';
import { SignUpValues } from '../components/forms/SignUpForm';
import { SignInValues } from '../components/forms/SignInForm';
import { AccountValues } from '../components/customer_components/CustomerAccount';
import { ChangePasswordValues } from '../components/customer_components/CustomerChangePassword';

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1/customer"
})


export const loginCustomer = async (values: SignInValues) => {
  return instance.post("/login", values)
}

export const registerCustomer = async (values: SignUpValues) => {
  return await instance.post("/register", values)
}

export const getCustomerInfo = async (token: string) => {
  return await instance.get("/info", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateCustomerInfo = (token: string, values: AccountValues) => {
  return instance.put("/info", values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

}

export const changeCustomersPassword = (token: string, values: ChangePasswordValues) => {
  return instance.put("/password", values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const deleteCustomerAccount = (token: string) => {
  return instance.delete("/delete", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
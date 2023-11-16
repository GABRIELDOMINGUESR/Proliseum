import axios from "axios";

export const axiosPerfil = axios.create({
    baseURL: 'https://alive-dog-parka.cyclic.app/',
    headers: {
        'Content-Type': "application/json",
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
})

//axios.defaults.baseURL = 'https://proliseum-back.cyclic.app/'
//https://alive-dog-parka.cyclic.app
//https://proliseum-back.cyclic.app/
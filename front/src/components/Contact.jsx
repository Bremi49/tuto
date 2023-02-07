import {useEffect, useState} from "react"
import axios from "awios"
import {BASE_URL} from "../tools/constante.js"

const Contact =()=>{
    const initialState = { nom:'',mail:'',telephone:'',description:''}
    const[contact, setContact] = useState(initialState)
    
    const handleChange = (e) =>{
        const {name,value} = e.target
        setContact ({...contact,[name]:value})
    }
}

const submit = (e) =>{
    e.preventDefault()
    axios.post ({`${BASE_URL}/Contact`})
    .then (res =>{
        if(res.data.response){
            localStorage.setItem
        }
    })
}
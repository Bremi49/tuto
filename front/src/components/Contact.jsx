import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"

const Contact = () => {
    const initialState = { name:'',  mail: '', telephone: '', description: '' }
    const [contact, setContact] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setContact({ ...contact, [name]: value })
    }

    const submit = (e) => {

        e.preventDefault()
        axios.post(`${BASE_URL}/contact`, contact)
            .then(res => {
                        console.log(res.data)
                if (res.data.response) {
                    const localStorage = (data) => {
                        localStorage.setItem('response', JSON.stringify(res.data.response));
                    }
            
                }
            })
    }

    return (
        <form onSubmit={submit}>
            <input type="text" name="name" onChange={handleChange} value={contact.name}placeholder='nom' maxLength='127'/>
            <input type="email" name="mail" onChange={handleChange}  value={contact.mail} placeholder='mail'
            maxLength='170'/>
            <input type="tel" name="telephone" onChange={handleChange} value={contact.telelphone} placeholder='telephone' maxLength='15'/>
            <input type="text" name="description" onChange={handleChange} value={contact.description} placeholder='description' maxLength='1000'/>
            <input type="submit" />
        </form>
    )
}
export default Contact

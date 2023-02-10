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
            <input type="text" name="name" onChange={handleChange} value={contact.name} />
            <input type="email" name="mail" onChange={handleChange}  value={contact.prenom} />
            <input type="tel" name="telephone" onChange={handleChange} value={contact.telelphone} />
            <input type="text" name="description" onChange={handleChange} value={contact.email} />
            <input type="submit" />
        </form>
    )
}
export default Contact

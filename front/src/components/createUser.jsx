import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"

const CreateUser = () => {
    const initialState = {role:'' , mail:'',  mdp: ''}
    const [createUser, setCreateUser] = useState(initialState)
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setCreateUser({ ...createUser, [name]: value })
    }

    const submit = (e) => {

        e.preventDefault()
        axios.post(`${BASE_URL}/createUser`, createUser)
            .then(res => {
                if (res.data.response) {
                    const localStorage = (data) => {
                        localStorage.setItem('response', JSON.stringify(res.data.response));
                    }
                }
            })
    }
    return (
        <form onSubmit={submit}>
            <input type="email" name="mail" onChange={handleChange}  value={createUser.mail} />
            <input type="text" name="mdp" onChange={handleChange} value={createUser.mdp} />
            <select name="role" onChange={handleChange} value={createUser.role}>
                <option value="">Sélectionnez un rôle</option>
                <option value="superadmin">Admin+</option>
                <option value="admin">Admin</option>
            </select>
            <input type="submit" />
        </form>
    )
}
export default CreateUser
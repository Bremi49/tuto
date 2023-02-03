import {Fragment, useState, useEffect} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const submit = (e) => {
        e.preventDefault();
        const username = "Pseudo";
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        dataFile.append('username', username);
        dataFile.append('files', files[0], files[0].name);
        
        axios.post(`${BASE_URL}/uploadFile`, dataFile)
        .then((res) => {
            setSuccess(true);
        })
        .catch((err) => {
            setError(err);
        });
    };
    
    useEffect(() => {
        if (success) {
            console.log("Uploaded Successfully");
        }
    }, [success]);
    
    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);
    
    return (
        <Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar' onChange={(e) => setFile(e.target.files[0])} />
                    <input type='submit' value='Submit' />
                </label>
            </form>
        </Fragment>
    );
};

export default UploadFile;

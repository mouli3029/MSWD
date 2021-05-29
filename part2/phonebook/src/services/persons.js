import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(res => res.data)
}

const create = (newEntry) => {
    const req = axios.post(`${baseUrl}`,newEntry);
    return req.then((res)=> res.data)
}

const deleteEntry = (id) =>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)
}

const updateEntry = (id,newEntry) => {
    const req = axios.put(`${baseUrl}/${id}`,newEntry)
    return req.then(response => response.data)
}

export default {getAll, create,deleteEntry,updateEntry}
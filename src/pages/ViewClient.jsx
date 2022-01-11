import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Spinner from "../components/Spinner";
const ViewClient = () => {
    
    const [client, setClient]= useState({});
    const [loading, setLoading]= useState(true);
    const {id} = useParams();

    useEffect(()=>{
        const getClient = async() =>{
            try{
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const answer = await fetch(url);
                const consult = await answer.json();
                setClient(consult);
            }catch(e){
                console.log(e);
            }
            setLoading(false);
        }
        getClient();
    },[])

    return (
        loading ? <Spinner/> :
        Object.keys(client).length === 0 ? <p className="text-3xl text-gray-700 ">There is no results...</p> : (
        <div>
            <h2 className='font-black text-4xl text-blue-900 '>View Client</h2>
            <p className='mt-3 text-lg text-gray-600'>Client Information</p>
            
            <p className="text-3xl text-gray-600 mt-10">
                <span className="font-bold text-gray-700 ">Name: </span>
                {client.nameValue}
            </p>

            <p className="text-xl text-gray-600 pl-10 mt-4">
                <span className="font-bold text-gray-700 ">Email: </span>
                {client.email}
            </p>

            {client.phone && (
                <p className="text-xl text-gray-600 pl-10 mt-4">
                <span className="font-bold text-gray-700 ">Phone: </span>
                {client.phone}
            </p>
            )}
            
            <p className="text-xl text-gray-600 pl-10 mt-4">
                <span className="font-bold text-gray-700 ">Company: </span>
                {client.company}
            </p>

            {client.notes && (
                <p className="text-xl text-gray-600 pl-10 mt-4">
                <span className="font-bold text-gray-700 ">Notes: </span>
                {client.notes}
            </p>
            )}
        </div>
    ))
}

export default ViewClient

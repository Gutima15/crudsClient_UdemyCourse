import FormSection from '../components/FormSection'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const EditClient = () => {
    
    const [client,setClient] = useState({});
    const [loading,setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        const getClient = async() =>{
            try{
                const url = `http://localhost:4000/clients/${id}`;
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
        <>
            {client?.nameValue ? (
                <>
                    <h2 className='font-black text-4xl text-blue-900 '>Edit Client</h2>
                    <p className='mt-3'>Change the information to modify the client</p>
                    <FormSection client={client} loading={loading}/>
                </>
            ) : (
                <p className=' text-xl text-gray-600 '>Invalid Client ID</p>
            )
            
            }

            
        </>
    )
}

export default EditClient

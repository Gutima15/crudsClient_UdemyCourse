import {useEffect, useState} from 'react'
import Client from '../components/Client'
const Home = () => {

    const [clients, setClients] = useState([])

    useEffect(() =>{
        const getClients = async () =>{
            try{
                const url = import.meta.env.VITE_API_URL;
                const answer = await fetch(url);// get 
                const consult = await answer.json();
                setClients(consult);
            } catch(e){
                console.log(e);
            }
        }
        getClients();
    },[])

    const handleDelete = async id => {
        const uSure = confirm('Are you sure to delete the client? ');
        if(uSure){
            try{
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const answer = await fetch(url, {
                    method: 'DELETE'
                })
                await answer.json();
                const arrayClients = clients.filter(client => client.id !== id)
                setClients(arrayClients);
            } catch(e) {
                console.log(e )
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Clients</h1>
            <p className='mt-3'>Manage your Clients</p>
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Name</th>
                        <th className='p-2'>Contact</th>
                        <th className='p-2'>Company</th>
                        <th className='p-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <Client
                            key={client.id}
                            client={client}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Home

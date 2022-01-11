import {useNavigate} from 'react-router-dom';

const Client = ({client, handleDelete}) => {

    const {nameValue, company, email, phone, notes, id} = client;
    const navigate = useNavigate();
    return (
        
            <tr className='border hover:bg-stone-100'>
                <td className='p-3'>{nameValue}</td>
                <td className='p-3'>
                    <p><span className='text=gray-800 font-bold'>Email: </span>{email}</p>
                    <p><span className='text=gray-800 font-bold'>Phone: </span>{phone}</p>
                </td>
                <td className='p-3'>{company}</td>
                <td className='p-3'>
                    <button type='button'
                        className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 font-bold text-sm'
                        onClick={()=> navigate(`/clients/${id}`)}
                    >Inspect</button>
                    <button type='button'
                        className=' bg-teal-600 hover:bg-teal-700 block w-full text-white p-2 font-bold text-sm mt-2'
                        onClick={()=> navigate(`/clients/edit/${id}`)}
                    >Edit</button>        
                    <button type='button'
                        className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 font-bold text-sm mt-2'
                        onClick={()=> handleDelete(id)}
                    >Delete</button>
                </td>
            </tr>
        
    )
}

export default Client

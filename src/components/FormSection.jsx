import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner';


const FormSection = ({client, loading}) => {
    
    const navigate = useNavigate();

    const newClientSchema = Yup.object().shape({
        nameValue: Yup.string().required('The name of the client is required')
        .min(3,'Name is too short'),
        company: Yup.string().required('The name of the company is required'),
        email: Yup.string().email('Email must be a valid Email').required('The client email is required'), 
        phone: Yup.number().positive('Invalid number').integer('Invalid number')
        .typeError('Invalid data: value must be a number'),
    })

    const handleSubmit = async (values) =>{
        try{  
            let answer;
            if(client.id){ //Edit
                const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
                answer = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            } else { //Create
                const url = import.meta.env.VITE_API_URL;
                answer = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            }
            await answer.json();
            navigate('/clients');

        } catch (error) {
            console.log(error)
        }
    };
    
    return (
        loading ? <Spinner/> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4
                mx-auto">
                <h2 
                    className="text-gray-600 font-bold text-xl text-center"
                >{client?.nameValue ? 'Edit Client': 'Add Client'}</h2>
                <p className='px-10 pt-5 text-gray-600 font-bold'>The fields marked with * are required</p>
                <Formik
                    initialValues={{
                        nameValue: client?.nameValue ?? '',
                        company: client?.company ?? '',
                        email: client?.email ?? '', 
                        phone: client?.phone ?? '',
                        notes: client?.notes ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) =>{
                        await handleSubmit(values);
                        resetForm();
                    } }
                    
                    validationSchema={newClientSchema}
                >
                    {({errors, touched}) =>{
                        return(
                        <Form className='px-10 py-5'>
                            <div className='mb-4'>
                                <label htmlFor="name"
                                    className='text-gray-800'
                                >Name*</label>
                                <Field type="text" id="name" 
                                    className="mt-2 block w-full p-3 bg-gray-100"
                                    placeholder="White the name of the client"
                                    name='nameValue'
                                />
                                {errors.nameValue && touched.nameValue ? (
                                    <Alert>{errors.nameValue}</Alert>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="company"
                                    className='text-gray-800'
                                >Company*</label>
                                <Field type="text" id="company" 
                                    className="mt-2 block w-full p-3 bg-gray-100"
                                    placeholder="White the name of the company "
                                    name='company'
                                />
                                {errors.company && touched.company ? (
                                    <Alert>{errors.company}</Alert>
                                ) : null}
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="email"
                                    className='text-gray-800'
                                >Email*</label>
                                <Field type="email" id="email" 
                                    className="mt-2 block w-full p-3 bg-gray-100"
                                    placeholder="White the email"
                                    name='email'
                                />
                                {errors.email && touched.email ? (
                                    <Alert>{errors.email}</Alert>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="phone"
                                    className='text-gray-800'
                                >Phone</label>
                                <Field type="tel" id="phone" 
                                    className="mt-2 block w-full p-3 bg-gray-100"
                                    placeholder="Client phone"
                                    name='phone'
                                />
                                {errors.phone && touched.phone ? (
                                    <Alert>{errors.phone}</Alert>
                                ) : null}
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="note"
                                    className='text-gray-800'
                                >Notes</label>
                                <Field as="textarea"
                                    type="text" id="note" 
                                    className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                    placeholder="Client note"
                                    name='notes'
                                />
                            </div>

                            <button type='submit'
                                className='mt-5 w-full p-3 bg-blue-800 text-white font-bold
                                text-lg'
                            >{client?.nameValue ? 'Update': 'Add your Client'}</button>
                        </Form>
                    )}
                    }
                </Formik>
            </div>
        )
    )
}

FormSection.defaultProps = {
    client: {} ,
    loading: false
}

export default FormSection

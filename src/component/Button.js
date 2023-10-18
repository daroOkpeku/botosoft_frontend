import React,{useState} from 'react'
import {AiOutlineClear} from "react-icons/ai";
import axios from 'axios';
import {FaSpinner} from 'react-icons/fa'
export default function Button(props) {
    const { allTodos, SetallTodos} = props
    const [istrue, Setistrue] = useState(false)
    const apiClient = axios.create({
        baseURL: "http://127.0.0.1:8000",
        withCredentials: true
      });

 const  handleDelete =(e)=>{
      e.preventDefault();
      Setistrue(true)
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('status',  'complete')
    formData.append('_method', 'delete')
    let urltwo = `/api/clearcomplete`;
    apiClient.get('/sanctum/csrf-cookie',{}).then(()=>{
        apiClient.post(urltwo, formData, headers).then(res=>{
            if(res.data.success){
                Setistrue(false)
                SetallTodos(res.data.success)
                // let all = allTodos.filter((item)=>item.status !== 'complete')
                // SetallTodos(all)
            }
        })
    })
  

    }

    return (
        <div className='w-full flex flex-row items-center justify-center p-1'>
            <article className=' w-10/12 sm:w-10/12 md:w-10/12 lg:w-3/4 m-auto  flex flex-row items-center justify-center'>
                     <button onClick={(e)=>handleDelete(e)} className='text-sm sm:text-base md:text-lg lg:text-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/3 rounded-sm text-white bg-blue-600 m-auto p-2 flex flex-row items-center justify-center'>
                         {istrue? 
                         <FaSpinner  className='motion-safe:animate-spin' />
                         :
                         <span className='flex flex-row items-center'>
                        <i className='md:text-base lg:text-lg'>Clear all completed todos</i> 
                        <AiOutlineClear className=' md:text-lg lg:text-lg'/>
                         </span>
                         }
                         
                     </button>
                </article>  
        </div>
    )
}

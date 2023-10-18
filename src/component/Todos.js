import React from 'react'
import {AiFillDelete} from "react-icons/ai";
import {VscVmActive} from "react-icons/vsc";
import {MdIncompleteCircle} from "react-icons/md";
import axios from 'axios';
export default function Todos(props) {
   const {allTodos, SetallTodos, Setstatus, status}    = props
   const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });
  
    const handleDelete = (e, id)=>{
      e.preventDefault();
      
      let formData = new FormData();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      formData.append('id',  id)
      formData.append('_method', 'delete')
      let urltwo = `/api/deletetodo`;
      apiClient.get('/sanctum/csrf-cookie',{}).then(()=>{
        apiClient.post(urltwo, formData, headers).then(res=>{
               if(res.data.success){
 let ansallTodos = allTodos.filter((item)=>item.id !== id)
      SetallTodos(ansallTodos)
               }

        })
      })


     
    }

   const handleStatus =(e, id)=>{
     e.preventDefault();
   let allTodosfind =  allTodos.find((item)=>item.id == id)
   if(allTodosfind.status == 'active'){

    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('status',  'complete')
    formData.append('id',  id)
    formData.append('_method', 'put')
    let urltwo = `/api/updatetodo`;
    apiClient.get('/sanctum/csrf-cookie',{}).then(()=>{
      apiClient.post(urltwo, formData, headers).then(res=>{
           if(res.data.success){
         let  allTodoedit = allTodos.map((item)=>item.id == id? { ...item, status:'complete'}:item)
        SetallTodos(allTodoedit)
           }
      })
    })

  
   }else if(allTodosfind.status == 'complete'){

    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('status',  'active')
    formData.append('id',  id)
    formData.append('_method', 'put')
    let urltwo = `/api/updatetodo`;
    apiClient.get('/sanctum/csrf-cookie',{}).then(()=>{
      apiClient.post(urltwo, formData, headers).then(res=>{
           if(res.data.success){
         let  allTodoedit = allTodos.map((item)=>item.id == id? { ...item, status:'active'}:item)
          SetallTodos(allTodoedit)
           }
      })
    })


   }
   //console.log(allTodosfind)
   }
    return (
        <div className='w-full p-3'>
           <section className='w-10/12 m-auto'>
            <ul className='w-full flex flex-col items-center m-5'>
            {allTodos.map((item)=>{
              return  <li className='w-full flex flex-row items-center p-2' key={item.id}>
              <div className='w-10/12 sm:w-10/12 md:w-3/4 lg:w-3/4 text-left font-normal italic text-lg space-x-5'>
                <span className='text-sm sm:text-base md:text-lg lg:text-lg'>Todo:{item.word}</span>  
                <span className='text-sm sm:text-base md:text-lg lg:text-lg'>status:{item.status}</span>
              </div>
              <section className='w-1/5 flex flex-row items-center sm:space-x-8 md:space-x-5 lg:space-x-3'>
                 <span className='w-24 sm:w-24 md:w-1/12 lg:w-1/12'>
                    {item.status == "active"?
                   <VscVmActive onClick={(e)=>handleStatus(e, item.id)}  className='text-green-500 text-2xl'/> 
                    :
                    <MdIncompleteCircle onClick={(e)=>handleStatus(e, item.id)}  className='text-green-500 text-2xl'/>
                    }
                    

                     
                 </span>
                   <span className='w-24 sm:w-24 md:w-1/12 lg:w-1/12'>
                       <AiFillDelete onClick={(e)=>handleDelete(e, item.id)} className='text-red-500 text-2xl'/>
                   </span>
              </section>
             </li>

            })}
                
                

            </ul>
            </section>   
        </div>
    )
}

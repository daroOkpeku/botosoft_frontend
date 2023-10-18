import React, {useEffect, useState} from "react";
import "./index.css"
import Todos from "./component/Todos";
import Button from "./component/Button";
import axios from "axios";
import {FaSpinner} from 'react-icons/fa'
function App() {
  const [allTodos, SetallTodos] = useState([])
   const [word, Setword] = useState('')
   const [status, Setstatus] = useState(false)
   const [message, Setmessage] = useState("")
   const [istrue, Setistrue] = useState(false)
   const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });





  const handleSubmit =()=>{
    Setistrue(true)
    if(allTodos.length == 0 && word.length > 0){

      let ansstatus = status == false?'active':'complete'

      let formData = new FormData();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      formData.append('word',  word)
      formData.append('status',  ansstatus)
      let urltwo = `/api/createtodo`;
      apiClient.get('/sanctum/csrf-cookie',{
      }).then(()=>{
    
        apiClient.post(urltwo, formData, headers).then(res=>{
           if(res.data.success){
            Setistrue(false)
          let obj = {id:1, word:word, status:ansstatus};
           SetallTodos([...allTodos, obj])
           }
        }).catch(err=>{
                  let error = err.response.data.errors
                  if(error.word){
                    Setistrue(false)
                    Setmessage(error.word[0])
                  }
                  else if(error.status){
                    Setistrue(false)
                    Setmessage(error.status[0])
                  }
        })
    
      })

    }else{
      if(allTodos.length > 0){

       let ansallTodos = allTodos.map((item)=>item.word  == '') 
       let founded =   ansallTodos.includes(true);

       if(founded == true){
        Setmessage('you can not enter the same input that already exist');
       }else{

        let ansstatus = status == false?'active':'complete'
        let formData = new FormData();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        formData.append('word',  word)
        formData.append('status',  ansstatus)
        let urltwo = `/api/createtodo`;
        apiClient.get('/sanctum/csrf-cookie',{
        }).then(()=>{
      
          apiClient.post(urltwo, formData, headers).then(res=>{
             if(res.data.success){
              Setistrue(false)
                let newid =  allTodos.length + 1
                let obj = {id:newid, word:word, status:ansstatus};
                  SetallTodos([...allTodos, obj])
             }
          }).catch(err=>{
                    let error = err.response.data.errors
                    if(error.word){
                      Setistrue(false)
                      Setmessage(error.word[0])
                    }
                    else if(error.status){
                      Setistrue(false)
                      Setmessage(error.status[0])
                    }
          })
      
        })


   


       }
      }
    }
  }


  useEffect(()=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let urltwo = `/api/alltodo`;
    apiClient.get('/sanctum/csrf-cookie').then( ()=> {
      apiClient.get(urltwo, headers).then(res=>{
          console.log(res)
          if(res.data.success){
            SetallTodos(res.data.success)
            // res.data.success.map((item)=>{

            //   let obj = {id:item.id, word:item.word, status:item.status};
            //   SetallTodos([...allTodos, obj])

            // })

          }

      })
  
    })
  },[])

  const handleSearch =(e)=>{
     e.preventDefault();
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let urltwo = `/api/searchstatus/${e.target.value}`;
    apiClient.get('/sanctum/csrf-cookie').then( ()=> {
      apiClient.get(urltwo, headers).then(res=>{
        if(res.data.success){
          SetallTodos(res.data.success)
        }
      }).catch(err=>{
        let error = err.response.data.errors
        if(error.status){
          Setmessage(error.status[0])
        }
      })
    })
  }


  
  return (
    <div className="w-full h-full rounded-md flex flex-row justify-center">

      <article className="w-11/12 sm:w-10/12 md:w-4/5 lg:w-3/4 rounded-md shadow-md  mt-36 px-2 ">
       <div className="w-full p-2">
          <article className="w-1/5 float-right">
              <select onChange={(e)=>handleSearch(e)} className="w-full outline-0">
                <option value="all" className=" capitalize">All</option>
                <option value="active" className=" capitalize">active</option>
                <option value="complete" className=" capitalize">complete</option>
              </select>
          </article>
       </div>
       <article className="w-full flex flex-row items-center justify-center space-x-1  mt-10">
        <div className="w-3/4 sm:w-3/4 md:w-4/5 lg:w-4/5">
        <input type="text" onChange={(e)=>Setword(e.target.value)} className="w-full p-1 sm:p-1 md:p-2 lg:p-2 border rounded-tl-lg rounded-bl-lg" />
        </div>
        <div className="w-28 sm:w-1/12 md:w-1/6 lg:w-1/6">
         <button className="w-full h-full text-center bg-blue-500 text-white p-1 sm:p-1 md:p-2 lg:p-2 flex items-center justify-center" onClick={handleSubmit}>
          {istrue?<FaSpinner  className='motion-safe:animate-spin' />:"submit"}
          
          </button>
        </div>
       </article>
       <Todos SetallTodos={SetallTodos}  status={status}  Setstatus={Setstatus} allTodos={allTodos}/>
       <Button  allTodos={allTodos} SetallTodos={SetallTodos}/>
      </article>
     
    </div>
  );
}

export default App;

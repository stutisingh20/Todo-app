import React, { useState, useEffect } from 'react'
import "./style.css"

// get local storage data back
const getLocalData=()=>{
   const Lists=localStorage.getItem("mytodolist")

   if(Lists){
    return JSON.parse(Lists);
   }else{
     return [];
   }
}

const Todo = () => {

    const [Inputdata, setInputdata]= useState("");
    const [Items, setItems]=useState(getLocalData());
    const[isEditItem, setisEditItem]= useState("");
    const [toggleButton, settoggleButton]=useState(false)

    // add the item function
    const addItem=()=>{
        if(!Inputdata){
            alert("plz fill the data")
        }else if(Inputdata && toggleButton){
           setItems(
            Items.map((curElem)=>{
                if(curElem.id===isEditItem){
                    return{...curElem,name:Inputdata};
                }
                return curElem;
            })
           );
           setInputdata("");
           setisEditItem(null);
           settoggleButton(false)
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:Inputdata,
            };
            setItems([...Items, myNewInputData])
            setInputdata("");
        }
    };


    // edit the items
    const editItem=(index)=>{
        const item_todo_edited=Items.find((curElem)=>{
           return curElem.id===index
        });
        setInputdata(item_todo_edited.name);
        setisEditItem(index);
        settoggleButton(true)
    }

    // how to delete items section
    const deleteItem=(index)=>{
        const updatedItems= Items.filter((curElem)=>{
            return curElem.id !== index;
        }
        )
        setItems(updatedItems);
    }

    // remove all the items
    const removeAll=()=>{
        setItems([])
    }

    // storing data in local storage
    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(Items));
    },[Items]); 

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItem'>
                <input 
                   type="text"
                   placeholder="✍ Add Item"
                   className='form-control'
                   value={Inputdata}
                   onChange={ (event)=> setInputdata(event.target.value)}
                   />
                   {toggleButton?(<i className="fa fa-edit add-btn" onClick={addItem}></i>)
                   :(<i className="fa fa-plus add-btn" onClick={addItem}></i>)};
            </div>
                
            {/* show our items */}
            <div className='showItems'>
            {Items.map((curElem)=>{
                return(
                    <div className='eachItem' key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i> 
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                    </div>

                    </div>
                    );
            })}
            
            </div>
            {/* remove all button */}
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
      </div>
    </>
  )

}


export default Todo

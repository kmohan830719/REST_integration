let totalPrice=0;

document.getElementById('btn').addEventListener('click',function(event){
    event.preventDefault();

    let price=document.getElementById('price').value;
    let productName=document.getElementById('product').value;
    
    let obj={
        Price:price,
        ProductName:productName
    }

    doPost(obj);

    //incrementing the total price
    totalPrice += parseFloat(obj.Price); 
    incrementTotal();

})

//doing a post request
async function doPost(obj){
    try{
    const response=await axios.post("https://crudcrud.com/api/22881041879445e7ab2084fb0426f1fd/products",obj)
    console.log(response);
    showOnScreen(response.data);
    }catch(err){
        console.log(err);
    }
}

 //delete request to delte the item from cloud
 async function deletePost(id){
    try{
    const promise=await axios.delete(`https://crudcrud.com/api/22881041879445e7ab2084fb0426f1fd/products/${id}`)
    console.log(promise);
    }catch(err){
        console.log(err);
    }
}

//get request
window.addEventListener("DOMContentLoaded", async()=>{
    try{
   const promise=await axios.get("https://crudcrud.com/api/22881041879445e7ab2084fb0426f1fd/products")
   for(let i=0;i<promise.data.length;i++){
    showOnScreen(promise.data[i]);
    
    totalPrice += parseFloat(promise.data[i].Price); 
    incrementTotal();
    } 
   }catch(err){
    console.log(err);
   }
})

function showOnScreen(obj){
    //creating an li
    let li=document.createElement("li");
    li.id="item";
    li.textContent=obj.ProductName+"-"+obj.Price;

    //adding a delete button to the item
    let deleteBtn=document.createElement("button");
    deleteBtn.id=obj._id;
    deleteBtn.textContent="Delete Item";
    li.appendChild(deleteBtn);

    //appending the li 
    let ul=document.getElementById('userItems');
    ul.appendChild(li);

    //calling the delete function
    deletingItems(obj);
}

function deletingItems(obj){
document.getElementById(obj._id).addEventListener('click',(e)=>{
    e.preventDefault();

    deletePost(obj._id)
   
    //decrementing the total product value
    if(totalPrice>0){
    totalPrice -= parseFloat(obj.Price);
    } 
    incrementTotal(); 

    //removing the item on screen
    let li=document.getElementById("item");
    li.remove();
})
}

//function to show the total product value
function incrementTotal(){
    let value=document.getElementById('worth');
    value.innerText=totalPrice;
}
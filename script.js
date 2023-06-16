let totalPrice=0;

document.getElementById('btn').addEventListener('click',function(event){
    event.preventDefault();

    let price=document.getElementById('price').value;
    let productName=document.getElementById('product').value;
    
    let obj={
        Price:price,
        ProductName:productName
    }

    //doing a post request
    axios.post("https://crudcrud.com/api/c71a3cecf9834cbb9ba82f41dc977d66/products",obj)
    .then((responce)=>{
        console.log(responce);
        showOnScreen(responce.data);
    }).catch((err)=>{
        console.log(err);
    })

    //incrementing the total price
    totalPrice += parseFloat(obj.Price); 
    incrementTotal();

    //storing data in local storage
    let myobj=JSON.stringify(obj);
    localStorage.setItem(productName,myobj);

    //showing on the screen
    //showOnScreen(obj);

    
})

//get request
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/c71a3cecf9834cbb9ba82f41dc977d66/products")
    .then((promise)=>{
        for(var i=0;i<promise.data.length;i++){
           showOnScreen(promise.data[i]);
        } 
    }).catch((err)=>{
        console.log(err);
    })
})

function showOnScreen(obj){
    //creating an li
    let li=document.createElement("li");
    li.id="item";
    li.textContent=obj.ProductName+"-"+obj.Price;

    //adding a delete button to the item
    let deleteBtn=document.createElement("button");
    deleteBtn.id="delete";
    deleteBtn.textContent="Delete Item";
    li.appendChild(deleteBtn);

    //appending the li 
    let ul=document.getElementById('userItems');
    ul.appendChild(li);

    //calling the delete function
    deletingItems(obj);
}

function deletingItems(obj){
document.getElementById('delete').addEventListener('click',(e)=>{
    e.preventDefault();
    //delete request to delte the item from cloud
    axios.delete(`https://crudcrud.com/api/c71a3cecf9834cbb9ba82f41dc977d66/products/${obj._id}`)
    .then((promise)=>{
        console.log(promise);
    }).catch((error)=>{
        console.log(error);
    })

    //decrementing the total product value
    totalPrice -= parseFloat(obj.Price); // Decrement totalPrice
    incrementTotal(); 

    //removing item from local storage
    localStorage.removeItem(obj.ProductName);

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
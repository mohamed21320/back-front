var productName=document.getElementById("inputName");
var productPrice=document.getElementById("inputPrice");
var productCount=document.getElementById("inputCount");
var productCategory=document.getElementById("category");
var productDiscription=document.getElementById("discription");

var addBtn=document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");
var Search=document.getElementById("inputSearch");



var postsData=[];


function getData() {
    fetch('https://backfront-mohamed-elsayeds-projects-2d7e8d45.vercel.app/product')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        postsData = data
        displayData()
        
    });
}
getData() 


function api(method,data) {
    fetch("https://backfront-mohamed-elsayeds-projects-2d7e8d45.vercel.app/product", {
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  body: JSON.stringify(data)
})
.then( (response) => { 
   response.json()
   getData()
});
}

function addProduct(){
    var data={
        name:productName.value ,
        Price:productPrice.value,
        Count:productCount.value,
        Category:productCategory.value,
        discription:productDiscription.value,
    }
api("POST", data)
deleteItem()
}

function deleteItem(){
    productName.value="";
    productPrice.value="";
    productCount.value="";
    productCategory.value="";
    productDiscription.value="";

}

let globalId=''
function returnProduct(i){
    console.log(postsData[i]);
    globalId=postsData[i].id
    productName.value=postsData[i].name ,
    productPrice.value=postsData[i].Price ,
    productCount.value=postsData[i].Count ,
    productCategory.value=postsData[i].Category ,
    productDiscription.value=postsData[i].discription 
    
document.getElementById('addBtn').className="d-none"
document.getElementById('updateBtn').className="d-block btn btn-primary mt-3 btn-lg px-4 "
}

function updateProduct() {
    var data={
        id:globalId,
        name:productName.value ,
        Price:productPrice.value,
        Count:productCount.value,
        Category:productCategory.value,
        discription:productDiscription.value,
    }
    api("PUT", data)
    deleteItem()
 document.getElementById('addBtn').className="d-block btn btn-primary mt-3 btn-lg px-4"
document.getElementById('updateBtn').className="d-none"
}


function deleteProduct(i) {
    let data={
        id:postsData[i].id
    }

    api("DELETE",data)
}

function displayData(){
    let content=``;
for(let i=0;i<postsData.length;i++){
    content+=`<tr>
    <td>${i+1}</td>
    <td>${postsData[i].name}</td>
    <td>${postsData[i].Price}</td>
    <td>${postsData[i].Count}</td>
    <td>${postsData[i].Category}</td>
    <td>${postsData[i].discription}</td>
    <td>
    <button onclick="returnProduct(${i})" class="btn btn-info mx-1">Update</button>
    <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
</tr>`
}
document.getElementById("bodyData").innerHTML=content;
}



function search() {
   let search= Search.value;


   let content=``;
for(let i=0;i<postsData.length;i++){
    if (postsData[i].name.toLowerCase().includes(search.toLowerCase()) ) {
        content+=`<tr>
    <td>${i+1}</td>
    <td>${postsData[i].name}</td>
    <td>${postsData[i].Price}</td>
    <td>${postsData[i].Count}</td>
    <td>${postsData[i].Category}</td>
    <td>${postsData[i].discription}</td>
    <td>
    <button onclick="returnProduct(${i})" class="btn btn-info ">Update</button>
    <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
</tr>`
    }
    
}
document.getElementById("bodyData").innerHTML=content;

}








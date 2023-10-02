var editLoopCount=0;
var deleteLoopCount=0;
 function callApi(){
    fetch('https://dummyjson.com/products')
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the response data as JSON
    } else {
      throw new Error('API request failed');
    }
  })
  .then(data => {
    var maintable = 
            `<tr>
              <td class="column">ID</td>
              <td class="column">Title</td>
              <td class="column">Price</td>
              <td class="column">Stock</td>
              <td class="column">Rating</td>
              <td class="column">Action</td> 
            </tr>`;
    // Process the response data here
    for (result=0; result<data.products.length; result++){
        maintable = maintable + `<tr>
            <td>${data.products[result].id}</td>
            <td>${data.products[result].title}</td>
            <td>${data.products[result].price}</td>
            <td>${data.products[result].stock}</td>
            <td>${data.products[result].rating}</td>
            <td><img src='./images/edit.png' alt='Edit' title='Edit-task' style='width: 20px ; height: 20px;' onclick='editEmployee(${data.products[result].id}); return false;'><img src='./images/trash-bin.png' alt='Delete' title='Delete-task' style='width: 20px ; height: 20px;' onclick='deleteEmployee(${data.products[result].id}); return false;'> </td>
        </tr>`
        }
        document.getElementById("tableContainer").innerHTML =maintable;
    //console.log(data); // Example: Logging the data to the console
  })
  .catch(error => {
    // Handle any errors here
    console.error(error); // Example: Logging the error to the console
  });
}

// Modal Window
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function showModal() 
{
    //alert("x");
    document.getElementById("employeeModal").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal()
{
    //alert("x");
    document.getElementById("employeeModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event)
{
    var modal = document.getElementById("employeeModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createData(){
  
  var productTitle = document.forms["new-task-form"]["newProductTitle"].value;
  var productPrice = document.forms["new-task-form"]["newProductPrice"].value; 
  var productStock = document.forms["new-task-form"]["newProductStock"].value;
  var productRating = document.forms["new-task-form"]["newproductRating"].value;

  fetch("https://dummyjson.com/products/add", {
  method: "POST",
  body: JSON.stringify({
    title: productTitle,
    price: productPrice,
    stock: productStock,
    rating: productRating
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
.then((response) => response.json())
.then((json) => console.log(json));

alert("Your product added sucessfully");
closeModal()
}
//Edit employee details
function editEmployee(count){
  confirm("Are you sure to edit task no : "+(count)+" ?");
  showModal()

  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    }
   }

  var url = "https://dummyjson.com/products/"+count;
    fetch(url, putMethod)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(updatedData => {
    console.log('Data updated:', updatedData);
    document.forms["new-task-form"]["newProductTitle"].value=updatedData.title;
    alert(updatedData.title);

  })
  .catch(error => {
    console.error('Error updating data:', error);
  });

    closeModal()

    editStatus= true;
    editLoopCount=count;

    }

function deleteEmployee(count){
  const delMethod = {
    method: 'DELETE', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    }
   }
  var url = "https://dummyjson.com/products/"+count;
    fetch(url, delMethod)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(updatedData => {
    console.log('Data updated:', updatedData);
    document.forms["new-task-form"]["newProductTitle"].value=updatedData.title;
    alert(updatedData.title);
  })
  .catch(error => {
    console.error('Error updating data:', error);
  });
    deleteLoopCount=count;
}
  callApi()

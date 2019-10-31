import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
addEventListener('DOMContentLoaded', getPosts);

// Listen for Get form Data
document.querySelector(".post-submit").addEventListener('click', submitData);

// Listen for Delete Post
document.querySelector("#posts").addEventListener('click', deletePost);

// Listen for Enable edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


function getPosts(){
  http.get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitData(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // validate input
  if (title === '' || body === '') {
    ui.showAlert("All fields are required", "alert alert-danger");
  } else {
    // Check for ID
    if (id === '') {
      // Create Post
      http.post("http://localhost:3000/posts", data)
      .then(data => {
        ui.showAlert("Post added", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert("Post updated", "alert alert-success");
        ui.changeFormState();
        getPosts();
      })

    }
  
  }

}

function deletePost(e){
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you Sure?")) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function enableEdit(e){
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }
    
    // FIll form with current post
    ui.fillForm(data);
  }
}

// Cancel Edit state
function cancelEdit(e){
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState("add");
  }
}



import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
addEventListener('DOMContentLoaded', getPosts);

// Get form Data
document.querySelector(".post-submit").addEventListener('click', submitData);

// Delete Post
document.querySelector("#posts").addEventListener('click', deletePost);

//Enable edit state eventlisterner
document.querySelector('#posts').addEventListener('click', enableEdit);


function getPosts(){
  http.get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitData(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  http.post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
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



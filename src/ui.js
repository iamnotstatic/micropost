class UI {
    constructor(){
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;
        });

        this.post.innerHTML = output;
    }

    showAlert(msg, className){
        this.clearAlert();

        // Create div
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.postsContainer');
        const posts = document.querySelector('#posts');
        container.insertBefore(div, posts);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    clearAlert(){
        const currentAlt = document.querySelector('.alert');
        if (currentAlt) {
            currentAlt.remove();
        }
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    fillForm(data){
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;

        // change state 
        this.changeFormState('edit');
    }

    clearIdinput(){
        this.idInput.value = '';
    }

    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = "Update post";
            this.postSubmit.className = "post-submit btn btn-dark btn-block";

            // Creat cancel btn
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode("Cancel Edit"));

            const cardForm = document.querySelector(".card-form");
            const formEnd = document.querySelector(".form-end");

            // insert button to DOM
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = "Post it";
            this.postSubmit.className = "post-submit btn btn-primary btn-block";

            // Remove cancel button if theere
            if (document.querySelector(".post-cancel")) {
                document.querySelector('.post-cancel').remove();
            }

            // Clear ID from hidden field
            this.clearIdinput();
            //Clear input filds
            this.clearFields();
        }
    }
}

export const ui = new UI();
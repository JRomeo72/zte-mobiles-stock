const uploadButton = document.getElementById('upload-button');
const chosenImage = document.getElementById('chosen-image');
const fileName = document.getElementById('file-name');

if(uploadButton) {
    uploadButton.onchange = () => {
        let reader = new FileReader();
        reader.readAsDataURL(uploadButton.files[0]);
        reader.onload = () => {
            chosenImage.setAttribute('src', reader.result)
        };
        fileName.textContent = uploadButton.files[0].name;
    }
};


const addForm = document.getElementById('addForm');

if(addForm) {
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // const fromData = new fromData(addForm);
        const formData = new FormData(e.currentTarget);
        const res = await fetch('/api/add', {
            method: 'POST',
            body: formData
        });
        
        window.location.href = '/stock'
    })
};


const updateForm = document.getElementById('updateForm');

if(updateForm) {
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let id = e.currentTarget.dataset.id
        const formData = new FormData(e.currentTarget);
        const res = await fetch(`/api/edit/${id}`, {
            method: 'PUT',
            body: formData
        });
        
        window.location.href = `/mobile/${id}`
    })
};


const btnCancel = document.getElementById('btn-cancel');

if(btnCancel) {
    btnCancel.addEventListener('click', () => {
        let back = document.querySelector('.back-card');
        setTimeout(() => {
            back.classList.toggle('back')
        }, 500);
        back.classList.toggle('show')    })
}


const btnEdit = document.getElementById('btn-edit');

if(btnEdit){
    btnEdit.addEventListener('click', () => {
        let back = document.querySelector('.back-card');
        back.classList.toggle('show')
        back.classList.toggle('back')
    })
}

const btnDelete = document.getElementById('btn-delete');

if(btnDelete) {
    btnDelete.addEventListener('click', async e => {
        // console.log(e.target.dataset.id)
        const response = await fetch(`/api/delete/${e.target.dataset.id}`, {
            method: 'DELETE'
        });
        window.location.href = '/stock'
    })
}
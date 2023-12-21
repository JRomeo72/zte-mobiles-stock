const uploadButton = document.getElementById('upload-button');
const chosenImage = document.getElementById('chosen-image');
const fileName = document.getElementById('file-name');

if(uploadButton) {
    uploadButton.onchange = () => {
        let reader = new FileReader();
        reader.readAsDataURL(uploadButton.files[0]);
        reader.onload = () => {
            chosenImage.setAttribute('src', reader.result)
        }
    }
};


const addForm = document.getElementById('addform');

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
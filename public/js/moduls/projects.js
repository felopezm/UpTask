import Swal from 'sweetalert2';
import axios from 'axios';

const btnDelete = document.querySelector('#delete-project');

if (btnDelete) {
    btnDelete.addEventListener('click', e => {
        const urlProject = e.target.dataset.projectUrl;

        Swal.fire({
            title: 'Are you sure delete project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // send petition axios
                const url = `${location.origin}/projects/${urlProject}`;
                axios.delete(url, { params: { urlProject } })
                    .then(function (res) {
                        Swal.fire(
                            res.data,
                            'Your file has been deleted.',
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = "/"
                        }, 3000);
                    })
                    .catch(() =>{
                        Swal.fire({
                            icon: 'error',
                            type:'Oops...',
                            title: 'Error Delete Project',
                            text: 'Not delete Proyect'
                        })
                    })
            }
        })
    });
}

export default btnDelete;
import Swal from 'sweetalert2';
import axios from 'axios';
import {updateAdvance} from '../functions/advance';

const task = document.querySelector('.listado-pendientes');

if (task) {
    task.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            let icon = e.target;
            let idTask = icon.parentElement.parentElement.dataset.task;

            // request for /tasks/:id
            let url = `${location.origin}/tasks/${idTask}`;
            axios.patch(url, { idTask })
                .then(function (res) {
                    if (res.status === 200) {
                        icon.classList.toggle('completo');
                        updateAdvance();
                    }
                })
        }

        if (e.target.classList.contains('fa-trash')) {
            let icon = e.target;
            let taskHtml = icon.parentElement.parentElement;
            let idTask = taskHtml.dataset.task;

            Swal.fire({
                title: 'Are you sure delete this task?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    // send petition axios and request for /tasks/:id
                    const url = `${location.origin}/tasks/${idTask}`;
                    axios.delete(url, { params: { idTask } })
                        .then(function (res) {
                            if (res.status === 200) {
                                // remove task html
                                taskHtml.parentElement.removeChild(taskHtml);
                            }

                            Swal.fire(
                                'Task Delete',
                                res.data,
                                'success'
                            );

                            updateAdvance();
                        })
                        .catch(() =>{
                            Swal.fire({
                                icon: 'error',
                                type:'Oops...',
                                title: 'Error Delete Task',
                                text: 'Not delete Task'
                            });
                        })
                }
            })
        }
    });
}

export default task;
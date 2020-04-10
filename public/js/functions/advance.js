import Swal from 'sweetalert2';

export const updateAdvance  = () =>{
    const task = document.querySelectorAll('li.tarea');

    if (task.length) {
        const taskComplete = document.querySelectorAll('i.completo');
        const advance = Math.round((taskComplete.length / task.length) * 100);
        const porcen = document.querySelector('#porcen');
        porcen.style.width = advance+'%';

        if (advance === 100) {
            Swal.fire(
                'Task Complete',
                'Congratulations !',
                'success'
            )
        }
    }
}
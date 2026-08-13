/* Fetching The Tasks Data and Adding Them to Local Storage System. */
// creating an object to store data!

// Date Information
const currentDate = new Date();
const getDate = String(currentDate.getDate()).padStart(2, '0');
const getMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
const getYear = currentDate.getFullYear();
const fomrattedDate = `${getYear}-${getMonth}-${getDate}`;

const getHours = String(currentDate.getHours()).padStart(2, '0');
const getMinutes = String(currentDate.getMinutes()).padStart(2, '0');
const getSeconds = String(currentDate.getSeconds()).padStart('0', 2);
const formattedTime = `${getHours}:${getMinutes}`;

const settimeLimit = document.getElementById('time-picker');
const datePicker = document.getElementById('date-picker');


//importing the required variables

function setlocalStorage(objectName) {
    const convertedData = JSON.stringify(objectName);
    localStorage.setItem('tasksObject', convertedData);
}
function getlocalStorage() {
    const gettasksData = JSON.parse(localStorage.getItem('tasksObject')) || [];
    taskInformation = gettasksData;
    return gettasksData;
}
function setdeltaskStorage(objectName) {
    localStorage.setItem('deletedTasks', JSON.stringify(deleted_tasks_list));
}
function getdeltasksStorage() {
    const getdeltasksinfo = JSON.parse(localStorage.getItem('deletedTasks')) || [];
    deleted_tasks_list = getdeltasksinfo;
    return getdeltasksinfo;
}

const tasknameInput = document.querySelector('.task-name-input');
const taskdateInput = document.querySelector('.task-date-input');
const tasktimeInput = document.querySelector('.task-time-input');
const taskpriorityInput = document.querySelector('.task-priority-input');
const tasksubmitBtn = document.querySelector('.submit-task-btn');
//task display boxes
const addtoToday = document.querySelector('.today-tasks');
const addtoUpcoming = document.querySelector('.upcoming-tasks');
const addtoCompleted = document.querySelector('.completed-tasks');


tasksubmitBtn.addEventListener('click', (e) => {
    const gettaskName = tasknameInput.value.trim();
    const gettaskDate = taskdateInput.value.trim();
    const gettaskTime = tasktimeInput.value.trim();
    const gettaskPriority = taskpriorityInput.value;

    if (gettaskName.trim() === '' || gettaskDate === '' || gettaskPriority == 'Select Priority' || gettaskTime === '') {
        alert('Task Information Must Not Be Empty!');
        return;
    }
    if (gettaskDate < fomrattedDate) {
        alert('Cannot select Past Date!')
        return;
    }
    if (gettaskDate === fomrattedDate && gettaskTime < formattedTime) {
        alert('Past time! cannot be selected');
        return;
    }
    const is_task_exists = taskInformation.some((each_task) => {
        return (each_task.taskName === gettaskName &&
            each_task.taskdueDate === gettaskDate &&
            each_task.taskdueTime === gettaskTime)

    });
    if (is_task_exists) {
        alert('Task Exists!');
        return;
    }
    let taskInfo = {
        taskId: crypto.randomUUID(),
        taskName: gettaskName,
        taskdueDate: gettaskDate,
        taskdueTime: gettaskTime,
        taskPriority: gettaskPriority,
        is_task_finished: false
    };
    //pushing data into main object
    taskInformation.push(taskInfo);
    setlocalStorage(taskInformation);
    tasksclassifier();
    updateProgress();
    tasknameInput.value = '';
    taskdateInput.value = '';
    tasktimeInput.value = '';
    taskpriorityInput.value = '';
});
// getlocalStorage();
// localStorage.clear();

function taskboxCreator(objectName) {
    const createdTime = new Date();
    const duedateTime = new Date(`${objectName.taskdueDate}T${objectName.taskdueTime}`);
    const hours = createdTime.getHours();
    /* task creation code*/
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';
    const taskdisplay_div = document.createElement('div');
    taskdisplay_div.className = 'task-display-mode';
    const checkBtn = document.createElement('input');
    checkBtn.type = 'checkbox';
    checkBtn.className = 'task-check-btn';
    checkBtn.checked = objectName.is_task_finished;
    checkBtn.disabled = objectName.is_task_finished;
    const taskinfoBox = document.createElement('div');
    taskinfoBox.className = 'task-name-info-box';
    const tasktitleInfo = document.createElement('p');
    tasktitleInfo.className = 'task-title';
    tasktitleInfo.textContent = objectName.taskName;


    const taskdatetimeinfo = document.createElement('div');
    taskdatetimeinfo.className = 'task-date-time-priority-box';
    const taskdateInfo = document.createElement('p');
    taskdateInfo.className = 'task-Date';
    taskdateInfo.textContent = '📅 ' + objectName.taskdueDate;
    const taskpriorityInfo = document.createElement('p');
    taskpriorityInfo.className = 'task-priority-info';
    taskpriorityInfo.textContent = objectName.taskPriority;
    const tasktimeInfo = document.createElement('p');
    const hour = Number(objectName.taskdueTime.split(':')[0]);
    if (hour >= 12) {
        tasktimeInfo.textContent = objectName.taskdueTime + ' PM';
    } else {
        tasktimeInfo.textContent = objectName.taskdueTime + ' AM';
    }
    taskdatetimeinfo.append(taskdateInfo, tasktimeInfo, taskpriorityInfo);
    taskinfoBox.append(tasktitleInfo, taskdatetimeinfo);
    const taskoptionsDiv = document.createElement('div');
    taskoptionsDiv.className = 'task-options-div';
    const taskeditOption = document.createElement('img');
    taskeditOption.className = 'task-edit-btn';
    taskeditOption.src = 'Application Media/Application Logos/edit-btn.png';
    if (objectName.is_task_finished) {
        taskeditOption.classList.add('display_none');
    }
    const taskdeleteOption = document.createElement('img');
    taskdeleteOption.className = 'task-delete-btn';
    taskdeleteOption.src = 'Application Media/Application Logos/trash-btn.png'
    taskoptionsDiv.append(taskeditOption, taskdeleteOption);
    taskdisplay_div.append(checkBtn, taskinfoBox, taskoptionsDiv);
    taskBox.append(taskdisplay_div);
    taskBox.id = objectName.taskId;

    /* Task Editing Code */
    const taskedit_mode = document.createElement('div');
    taskedit_mode.className = 'display_none task-edit-mode';
    const editNameBox = document.createElement('div');
    editNameBox.className = 'edit-name-box';
    const editdatetimepriorityBox = document.createElement('div');
    const editActions = document.createElement('div');
    editActions.className = 'save-cancel-box';

    const editName = document.createElement('input');
    editName.type = 'text';
    editName.placeholder = 'Enter Name Here..';
    editNameBox.append(editName);
    const editPriority = document.createElement('select');
    editPriority.className = 'editPriority';
    editPriority.innerHTML = `
    <option value=''>Select Priority</option>
    <option value='Top'>Top</option>
    <option value='Medium'>Medium</option>
    <option value='Low'>Low</option>`;
    const editdueDate = document.createElement('input');
    editdueDate.type = 'date';

    const editdueTime = document.createElement('input');
    editdueTime.type = 'time';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn'
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn';
    editActions.append(saveBtn, cancelBtn);
    editdatetimepriorityBox.append(editPriority, editdueDate, editdueTime);
    taskedit_mode.append(editNameBox, editdatetimepriorityBox, editActions);
    taskBox.append(taskedit_mode);
    /* Logic code for task options!*/
    checkBtn.addEventListener('change', (e) => {
        objectName.is_task_finished = checkBtn.checked;
        if (checkBtn.checked) {
            notifiedTasks.delete(objectName.taskId);
            alert('Great,Keep Moving');
        } else {
            alert('Good,You Are Genuine!');
        }
        setlocalStorage(taskInformation);
        tasksclassifier();
        renderallTasks();
        updateProgress();
        if (checkBtn.checked) {
            recordCompletion();
            updateStreak();
        }

    });
    taskdeleteOption.addEventListener('click', (e) => {
        const taskdelDate = `${getYear}-${getMonth}-${getDate}`;
        const taskdelTime = `${getHours}:${getMinutes}`;
        const confirmDelete = confirm('Are You Sure To Delete The Task?');
        const task_id = taskBox.id;
        if (!confirmDelete) {
            return;
        }
        notifiedTasks.delete(objectName.taskId);
        const deleted_tasks = taskInformation.find(deleted_task => {
            return deleted_task.taskId === task_id;
        });
        deleted_tasks.del_time = taskdelTime;
        deleted_tasks.del_date = taskdelDate;
        deleted_tasks_list.push(deleted_tasks);
        setdeltaskStorage(deleted_tasks);
        const current_tasks = taskInformation.filter((each_task) => {
            return each_task.taskId !== task_id;
        });
        taskInformation = current_tasks;

        setlocalStorage(taskInformation);
        tasksclassifier();
        renderallTasks();
        renderdeletedTasks();
        updateProgress();
    });

    taskeditOption.addEventListener('click', (e) => {
        taskdisplay_div.classList.add('display_none');
        taskedit_mode.classList.remove('display_none');

        editName.value = objectName.taskName;
        editdueDate.value = objectName.taskdueDate;
        editdueTime.value = objectName.taskdueTime;
        editPriority.value = objectName.taskPriority;
    });

    saveBtn.addEventListener('click', (e) => {
        const currentDate = new Date();
        const getDate = String(currentDate.getDate()).padStart(2, '0');
        const getMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const getYear = currentDate.getFullYear();
        const fomrattedDate = `${getYear}-${getMonth}-${getDate}`;
        const newName = editName.value.trim();
        const newDate = editdueDate.value;
        const newTime = editdueTime.value;
        const newPriority = editPriority.value;

        if (newName === '' || newDate === '' || newTime === '' || newPriority === '') {
            alert('Data Cannot Be Empty!');
            return;
        }
        if (newDate <= fomrattedDate && (newTime <= formattedTime)) {
            alert('Past or Running Time Cannot Be Selected!');
            return;
        }

        notifiedTasks.delete(objectName.taskId);

        objectName.taskName = newName;
        objectName.taskdueDate = newDate;
        objectName.taskdueTime = newTime;
        objectName.taskPriority = newPriority;

        setlocalStorage(taskInformation);

        tasksclassifier();
        renderallTasks();
        updateProgress();

        taskedit_mode.classList.add('display_none');
        taskdisplay_div.classList.remove('display_none');

    });

    cancelBtn.addEventListener('click', (e) => {
        taskedit_mode.classList.add('display_none');
        taskdisplay_div.classList.remove('display_none');
    });

    if (duedateTime < createdTime && !objectName.is_task_finished) {
        taskBox.style.backgroundColor = 'rgb(255, 127, 127)';
    }
    return taskBox;

}

// Classifying The Tasks into their respective boxes!
function tasksclassifier() {
    addtoToday.innerHTML = '';
    addtoUpcoming.innerHTML = '';
    addtoCompleted.innerHTML = '';
    const datafromlocalStorage = getlocalStorage();
    datafromlocalStorage.forEach(eachtask_id => {
        const createdtaskBox = taskboxCreator(eachtask_id);

        if (eachtask_id.is_task_finished) {
            addtoCompleted.prepend(createdtaskBox);
            return;
        }
        if (eachtask_id.taskdueDate === fomrattedDate) {
            addtoToday.prepend(createdtaskBox);
            return;
        }
        if (eachtask_id.taskdueDate > fomrattedDate) {
            addtoUpcoming.prepend(createdtaskBox);
            return;
        }
        if (eachtask_id.taskdueDate < fomrattedDate) {
            addtoToday.prepend(createdtaskBox);
            return;
        }

    });
    renderallTasks();
    updateProgress();
    updateStreak();

}

const alltasksContainer = document.querySelector('.all-tasks-container');
const imptasksContainer = document.querySelector('.imp-tasks-container');
function renderallTasks() {
    alltasksContainer.innerHTML = '';
    imptasksContainer.innerHTML = '';
    lpalltasks.innerHTML = '';
    lpimptasks.innerHTML = '';
    const isLaptop = window.innerWidth >= 900;
    taskInformation.forEach((each_task) => {
        if (each_task.is_task_finished) {
            return;
        }
        const normaltaskBox = taskboxCreator(each_task);
        if (isLaptop) {
            lpalltasks.prepend(normaltaskBox);
        } else {
            alltasksContainer.prepend(normaltaskBox);
        }

        if (each_task.taskPriority === 'Top') {
            const importantTasks = taskboxCreator(each_task);
            if (isLaptop) {
                lpimptasks.prepend(importantTasks);
            } else {
                imptasksContainer.prepend(importantTasks);
            }
        }

    });

}

/* External pages coding*/
const addtoDeletedtasks = document.querySelector('.addtodeleted-box');
function renderdeletedTasks() {
    addtoDeletedtasks.innerHTML = '';
    lpdeltasks.innerHTML = '';
    const getdeletedTasks = getdeltasksStorage();
    const isLaptop = window.innerWidth >= 900;
    getdeletedTasks.forEach(each_task => {
        const createdeltaskbox = createdeletedTaskinfo(each_task);
        createdeltaskbox.className = 'deleted-task-box';
        if (isLaptop) {
            lpdeltasks.prepend(createdeltaskbox);
        } else {
            addtoDeletedtasks.prepend(createdeltaskbox);
        }


    });

}

function createdeletedTaskinfo(objectName) {
    const deltaskBox = document.createElement('div');
    const deltasktname = document.createElement('p');
    deltasktname.textContent = `Task Name : ${objectName.taskName}`;
    const deltaskDate = document.createElement('p');
    deltaskDate.textContent = `Due On : ${objectName.taskdueDate}`;
    const deltaskTime = document.createElement('p');
    deltaskTime.textContent = `Deleted On : ${objectName.del_date} at : ${objectName.del_time}`;
    const removedeltask = document.createElement('button');
    removedeltask.textContent = 'Delete Record';
    deltaskBox.append(deltasktname, deltaskDate, deltaskTime, removedeltask);

    const deltaskId = objectName.taskId;
    removedeltask.addEventListener('click', (e) => {
        const current_deltasks = deleted_tasks_list.filter((each_task) => {
            return each_task.taskId !== deltaskId;
        });
        deleted_tasks_list = current_deltasks;
        setdeltaskStorage(current_deltasks);
        renderdeletedTasks();
    });
    return deltaskBox;
}


// localStorage.clear()
tasksclassifier();
renderallTasks();
renderdeletedTasks();
const screenbreakpoint = window.matchMedia('(min-width: 900px)');

function handleresizeLayout() {
    window.location.reload();
    renderallTasks();
    renderdeletedTasks();
}
screenbreakpoint.addEventListener('change', handleresizeLayout);

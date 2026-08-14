const deltedTasksBox = document.querySelector('.deleted-tasks');
const delalltasksBtn = document.querySelector('.clear-all-tasks');
const clearcompletedTasks = document.querySelector('.clear-completed-tasks')
const viewdeletedTasks = document.querySelector('.view-deleted-tasks');
const hidedelTasks = document.querySelector('.hide-del-tasks');
const delRecords = document.querySelector('.clear-del-tasks');
const lpdelRecords = document.querySelector('.lp-clear-del-tasks');
viewdeletedTasks.addEventListener('click', (e) => {
    deltedTasksBox.classList.remove('visibility_hidden');
    deltedTasksBox.style.opacity = '1';
    deltedTasksBox.style.transition = 'all 0.5s ease';

});
hidedelTasks.addEventListener('click', (e) => {
    deltedTasksBox.classList.add('visibility_hidden');
    deltedTasksBox.style.opacity = '0';
    deltedTasksBox.style.transition = 'all 0.5s ease';
});

delalltasksBtn.addEventListener('click', (e) => {
    if (taskInformation.length === 0 && addtoCompleted.innerHTML === '') {
        alert('No Tasks Exists!');
        return;
    }
    const confirmDeletion = confirm('Danger!,Do You Want to Delete All The Tasks?');
    if (!confirmDeletion) {
        return;
    }
    localStorage.clear();
    renderallTasks();
    renderdeletedTasks();
    tasksclassifier();
    deleted_tasks_list = [];

});
clearcompletedTasks.addEventListener('click', (e) => {
    if (addtoCompleted.innerHTML === '') {
        alert('Finish Tasks First!');
        return;
    }
    const confirmDeletion = confirm('Are You Sure To Delete All Completed Tasks?');
    if (!confirmDeletion) {
        return;
    }
    const remove_completed = taskInformation.filter(each_task => {
        return !each_task.is_task_finished;

    });
    taskInformation = remove_completed;
    setlocalStorage(taskInformation);
    renderallTasks();
    renderdeletedTasks();
    tasksclassifier();


});
delRecords.addEventListener('click', (e) => {

    if (deleted_tasks_list.length === 0) {
        alert('No Data Exists!');
        return;
    }
    const confirmDeletion = confirm('Are You Sure To Delete All Trash Items?');
    if (!confirmDeletion) {
        return;
    }
    deleted_tasks_list = [];
    setdeltaskStorage(deleted_tasks_list);
    renderdeletedTasks();
    deltedTasksBox.classList.add('visibility_hidden');
    deltedTasksBox.style.opacity = '0';
    deltedTasksBox.style.transition = 'all 0.5s ease';
});
lpdelRecords.addEventListener('click', (e) => {
    if (deleted_tasks_list.length === 0) {
        alert('No Data Exists!');
        return;
    }
    const confirmDeletion = confirm('Are You Sure To Delete All Trash Items?');
    if (!confirmDeletion) {
        return;
    }
    deleted_tasks_list = [];
    setdeltaskStorage(deleted_tasks_list);
    renderdeletedTasks();
})

/* laptop's statistics page coding!*/
const calenderBox = document.querySelector('.calendar');
const daysBox = document.querySelector('.days-div');
const dateBox = document.querySelector('.date-div');
const nextMonth = document.querySelector('.next_month');
const prevMonth = document.querySelector('.prev_month');
const yearMonth = document.querySelector('.year-name');
nextMonth.textContent = ' > ';
prevMonth.textContent = ' < '

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const currentcalendarDate = new Date();
const today = new Date();

function designCalendar() {
    const firstDay = new Date(currentcalendarDate.getFullYear(), currentcalendarDate.getMonth(), 1).getDay();
    const lastDay = new Date(currentcalendarDate.getFullYear(), currentcalendarDate.getMonth() + 1, 0).getDate();
    yearMonth.textContent = `${currentcalendarDate.getFullYear()} ${monthsNames[currentcalendarDate.getMonth()]}`;
    daysBox.innerHTML = '';
    dateBox.innerHTML = '';
    for (let i = 0; i < dayNames.length; i++) {
        const dayBox = document.createElement('div');
        dayBox.textContent = `${dayNames[i]}`;
        daysBox.append(dayBox);
    }

    for (let j = 1; j <= firstDay; j++) {
        const emptydayBox = document.createElement('div');
        emptydayBox.textContent = '';
        dateBox.append(emptydayBox);

    }
    for (let k = 1; k <= lastDay; k++) {
        const box = document.createElement('div');
        box.textContent = `${k}`;
        dateBox.append(box);
        if (k === today.getDate() && currentcalendarDate.getMonth() === today.getMonth() && currentcalendarDate.getFullYear() === today.getFullYear()) {
            box.style.backgroundColor = 'green';
        }

    }


}

prevMonth.addEventListener('click', (e) => {
    currentcalendarDate.setMonth(currentcalendarDate.getMonth() - 1);
    designCalendar();
});
nextMonth.addEventListener('click', (e) => {
    currentcalendarDate.setMonth(currentcalendarDate.getMonth() + 1);
    designCalendar();
});

designCalendar();
let progressAnimF;
let progressAnimB;
let currentProgress = 0;

// progress section
function updateProgress() {
    const outerCircle = document.querySelector('.outer_circle');
    const innerCircle = document.querySelector('.inner_circle');
    const tasksInfo = document.querySelector('.tasks-counts');
    const now = new Date();

    const alltasksCount = taskInformation.length;
    const allcompletedTasks = taskInformation.filter(counter => {
        return counter.is_task_finished;
    });
    const overdueTasks = taskInformation.filter(counter => {
        const duedate = new Date(`${counter.taskdueDate}T${counter.taskdueTime}`)
        return (duedate < now && !counter.is_task_finished)
    });
    const remianingTasks = alltasksCount - allcompletedTasks.length;
    let progressMade = (alltasksCount === 0) ? 0 : Math.ceil(allcompletedTasks.length / alltasksCount * 100);

    clearInterval(progressAnimF);
    clearInterval(progressAnimB);
    if (currentProgress < progressMade) {
        progressAnimF = setInterval(() => {
            if (currentProgress >= progressMade) {
                clearInterval(progressAnimF);
                return;
            }
            currentProgress++;
            outerCircle.style.background = `conic-gradient(aqua ${currentProgress}% , black 0%)`;
        }, 20);
        outerCircle.style.background = `conic-gradient(aqua 0% , black 0%)`;
    } else {
        progressAnimB = setInterval(() => {
            if (currentProgress <= progressMade) {
                clearInterval(progressAnimB);
                return;
            }
            currentProgress--;
            outerCircle.style.background = `conic-gradient(aqua ${currentProgress}% , black 0%)`;

        }, 20);
    }



    tasksInfo.innerHTML = `<p>All Tasks : ${alltasksCount}<br>
Completed Tasks : ${allcompletedTasks.length}<br>
Remaining Tasks : ${remianingTasks}<br>
Overdue Tasks : ${overdueTasks.length}</p>`;
    innerCircle.textContent = `${progressMade} %`;
}
updateProgress();
setInterval(updateOverdueTasks, 1000);
const logoutBtn = document.querySelector('.log-out-div');
logoutBtn.addEventListener('click', (e) => {
    const confirmlogOut = confirm('It Wipes All Your Tasks and Data, Continue?');
    if (!confirmlogOut) {
        return;
    }
    localStorage.clear();
    window.location.reload();
});
const logoutBtnmb = document.querySelector('.mb-log-out-div');
logoutBtnmb.addEventListener('click', (e) => {
    const confirmlogOut = confirm('It Wipes All Your Tasks and Data, Continue?');
    if (!confirmlogOut) {
        return;
    }
    localStorage.clear();
    window.location.reload();
});

/* Streak caclutaion */
let completedtaskDates = JSON.parse(localStorage.getItem('completedDates')) || [];

function getToday() {
    const todayDate = new Date();
    return todayDate.toISOString().split('T')[0];
}
function recordCompletion() {
    const today = getToday();

    if (!completedtaskDates.includes(today)) {
        completedtaskDates.push(today);

        localStorage.setItem('completedDates', JSON.stringify(completedtaskDates));
    }
}

function calculateStreak() {
    const checkDate = new Date(getToday());
    let streak = 0;

    while (true) {
        const dateString = checkDate.toISOString().split('T')[0];

        if (!completedtaskDates.includes(dateString)) {
            break;
        }
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
    }

    return streak;

}

function updateStreak() {

    const streakDisplay = document.querySelector('.streak');
    const streak = calculateStreak();
    streakDisplay.textContent = `${streak}`;
    if (streak === 0) {
        document.querySelector('.streak-box').style.boxShadow = '0px 0px 5px red';
        document.querySelector('.streak-box').style.color = 'red';
    } else if (streak === 1) {
        document.querySelector('.streak-box').style.boxShadow = '0px 0px 5px orange';
        document.querySelector('.streak-box').style.color = 'orange'
    }
    else {
        document.querySelector('.streak-box').style.boxShadow = '0px 0px 5px green';
        document.querySelector('.streak-box').style.color = 'green';
    }
}
updateStreak();
function timerDisplay() {
    const timer = document.querySelector('.timer');
    setInterval(() => {
        const currentDate = new Date();
        const getHours = String(currentDate.getHours()).padStart(2, '0');
        const getMinutes = String(currentDate.getMinutes()).padStart(2, '0');
        const getSeconds = String(currentDate.getSeconds()).padStart(2, '0');
        const timer_text = `${getHours} : ${getMinutes} : ${getSeconds}`;
        if (getHours >= 12) {
            timer.textContent = timer_text + ' PM';
        } else {
            timer.textContent = timer_text + ' AM';
        }
    }, 1000);
}
timerDisplay();

// const now=new Date();
// const reminderTime=
const seacrBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-icon');
const alertBtn = document.querySelector('.alerts-icon');

const alertsBtn = document.querySelector('.alerts-icon');

const alertAlarm = new Audio('notification audio/alarm.mp3')

searchBtn.addEventListener('click', (e) => {
    alert('This Feature Will Be Available Soon..');
    return;
    // seacrBar.classList.toggle('visibility_hidden');
});

const notifiedTasks = new Set();

function checkTasks() {
    const now = new Date();
    const tenminuteslLater = new Date(now.getTime() + 10 * 60 * 1000);
    taskInformation.forEach(eachTask => {
        if (eachTask.is_task_finished) {
            return;
        }
        const taskDue = new Date(`${eachTask.taskdueDate}T${eachTask.taskdueTime}`);

        if (taskDue >= now &&
            taskDue <= tenminuteslLater &&
            !notifiedTasks.has(eachTask.taskId)) {
            new Notification(`${eachTask.taskName} is waiting..`, {
                body: `${eachTask.taskName} is due in next 10 Minutes!`
            });
            alertAlarm.play();
            notifiedTasks.add(eachTask.taskId);
        }
    });
}

function updateOverdueTasks() {
    const tasksInfo = document.querySelector('.tasks-counts');

    const overdueTasks = taskInformation.filter(task => {
        if (task.is_task_finished) {
            return false;
        }

        const dueDate = new Date(`${task.taskdueDate}T${task.taskdueTime}`);

        return dueDate < new Date();
    });

    const allTasks = taskInformation.length;

    const completedTasks = taskInformation.filter(task => {
        return task.is_task_finished;
    });

    const remainingTasks = allTasks - completedTasks.length;

    tasksInfo.innerHTML = `
        <p>
            All Tasks : ${allTasks}<br>
            Completed Tasks : ${completedTasks.length}<br>
            Remaining Tasks : ${remainingTasks}<br>
        </p>
        <p class="overdueinfo">
            Overdue Tasks : ${overdueTasks.length}
        </p>
    `;
}
let notificationInterval = null;
alertBtn.addEventListener('click', async (e) => {
    const enableNotifications = await Notification.requestPermission();
    if (enableNotifications !== 'granted') {
        alert('Notifications Disabled!');
        return;
    }

    if (notificationInterval === null) {
        checkTasks();
        setInterval(checkTasks, 5000);
    }

});








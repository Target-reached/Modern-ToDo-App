/* The logic code for hiding unwanted pages or sections */

// importing the required sections names for working..

const dashboardPage = document.querySelector('.dashboard-page');
const allTasksPage = document.querySelector('.all-tasks-page');
const importantTasksPage = document.querySelector('.important-tasks-page');
const settingsPage = document.querySelector('.settings-page');

//importing the nav-buttons;

const dashboardBtn = document.querySelector('.dashboard-page-btn');
const alltasksPagebtn = document.querySelector('.alltasks-page-btn');
const importantTaskspageBtn = document.querySelector('.important-tasks-page-btn');
const settingsPageBtn = document.querySelector('.settings-page-btn');

// importing the tasks category buttons!

const todaytasksBtn = document.querySelector('.today-tasks-btn');
const upcomingtasksBtn = document.querySelector('.upcoming-tasks-btn');
const completedtasksBtn = document.querySelector('.completed-tasks-btn');

//importing the tasks category boxes!

const todaystasksBox = document.querySelector('.today-tasks-box');
const upcomingtasksBox = document.querySelector('.upcoming-tasks-box');
const completedtasksBox = document.querySelector('.completed-tasks-box');


//function to hide all sections first..
function hideAllPages() {
    dashboardPage.classList.add('display_none');
    allTasksPage.classList.add('display_none');
    importantTasksPage.classList.add('display_none');
    settingsPage.classList.add('display_none');
}
//function to hide and display the required pages!
function pagehidingHelper(buttonName, pageName) {
    buttonName.addEventListener('click', (e) => {
        hideAllPages();
        pageName.classList.remove('display_none');
    });
}
//utilising the pagehidingHelper function here!
pagehidingHelper(dashboardBtn, dashboardPage);
pagehidingHelper(alltasksPagebtn, allTasksPage);
pagehidingHelper(importantTaskspageBtn, importantTasksPage);
pagehidingHelper(settingsPageBtn, settingsPage);



//function to hide all tasks boxes first..
function hidealltasksBoxes() {
    todaystasksBox.classList.add('display_none');
    upcomingtasksBox.classList.add('display_none');
    completedtasksBox.classList.add('display_none');
}

function tasksboxhidingHelper(taskboxBtn, taskboxName) {
    taskboxBtn.addEventListener('click', (e) => {
        hidealltasksBoxes();
        taskboxName.classList.remove('display_none');
    });
}
tasksboxhidingHelper(todaytasksBtn, todaystasksBox);
tasksboxhidingHelper(upcomingtasksBtn, upcomingtasksBox);
tasksboxhidingHelper(completedtasksBtn, completedtasksBox);

// laptop's hiding functions
const lpalltasks = document.querySelector('.add-all-tasks');
const lpimptasks = document.querySelector('.add-imp-tasks');
const lpdeltasks = document.querySelector('.add-del-tasks');
const wholetasksBox = document.querySelector('.whole-tasks-section');

const lpalltasksBox = document.querySelector('.all-tasks-div');
const lpimptasksBox = document.querySelector('.imp-tasks-div');
const lpdeltasksBox = document.querySelector('.del-tasks-div');

// laptop nav buttons
const lpdashboardBtn = document.querySelector('.lp-dashboard-btn');
const lptodaytaskBtn = document.querySelector('.lp-todaytask-btn');
const lpupcomingtaskBtn = document.querySelector('.lp-upcomingtask-btn');
const lpimportanttaskBtn = document.querySelector('.lp-importanttask-btn');
const lpalltaskBtn = document.querySelector('.lp-alltask-btn');
const lpcompletedtaskBtn = document.querySelector('.lp-completedtasks-btn');
const lpdeletedtaskBtn = document.querySelector('.lp-deletedtasks-btn');



function hidelptaskSections() {
    wholetasksBox.classList.add('display_none');
    lpalltasksBox.classList.add('display_none');
    lpimptasksBox.classList.add('display_none');
    lpdeltasksBox.classList.add('display_none');
}

function lptasksboxHider(button, section) {
    button.addEventListener('click', (e) => {
        hidelptaskSections();
        section.classList.remove('display_none');
    });
}
lptasksboxHider(lpimportanttaskBtn, lpimptasksBox);
lptasksboxHider(lpalltaskBtn, lpalltasksBox);
lptasksboxHider(lpdeletedtaskBtn, lpdeltasksBox);

lpdashboardBtn.addEventListener('click', (e) => {
    hidelptaskSections();
    wholetasksBox.classList.remove('display_none');

});

tasksboxhidingHelper(lptodaytaskBtn, todaystasksBox);
tasksboxhidingHelper(lpupcomingtaskBtn, upcomingtasksBox);
tasksboxhidingHelper(lpcompletedtaskBtn, completedtasksBox);

//Intitalizign the storage objects
let taskInformation = [];
let deleted_tasks_list = [];
let userName = JSON.parse(localStorage.getItem('username'));
const usernameDisplay = document.querySelector('.user-name-line');
function setuserName() {
    if (!userName) {
        userName = prompt('Enter Your Name : ');
        if (userName === null || userName === '') {
            userName = 'User..';
        }
        localStorage.setItem('username', JSON.stringify(userName));
    }
    usernameDisplay.textContent = `Welcome, ${userName}..`;

}
setuserName();
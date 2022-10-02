// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../components/toastify';




// Save user todos into local storage
const saveToLocalStorage = (todos) => {
    let userTodos = JSON.parse(localStorage.getItem("Todos"));
    userTodos = [...todos];

    localStorage.setItem("Todos", JSON.stringify(userTodos));
} 


// Get user todos from local storage
const getFromLocalStorage = () => {
    const userTodos = JSON.parse(localStorage.getItem("Todos"));

    if (userTodos)
        return userTodos;
    else
        localStorage.setItem("Todos", JSON.stringify([]));
} 

// Get todo time
const getTime = (time) => {
    let [hours, minutes] = time.split(":");
    let meridian;
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
        if (hours < 10)
        hours = `0${hours}`
    } 
    else if (hours < 12) {
        meridian = 'AM';
        if (hours === 0) {
            hours = 12;
        }
    } 
    else {
        meridian = 'PM';
    }

    return `${hours}:${minutes} - ${meridian}`;
}

// validate inputs
const validate = (todoName, time) => {
    const userTodos = JSON.parse(localStorage.getItem("Todos"));
    const index = userTodos.findIndex(todo => todo.name.toLowerCase() === todoName.toLowerCase());

    if (!todoName || !time){
        notify("Name and Time are required", "Failed");
        return false;
    }
    else if (index !== -1){
        notify("This todo has already been registered", "Failed")
        return false;
    }

        return true;
}


// Return todoTime and todoName for call user to do that
const compareTimes = (todos, todayHours, todayMinutes) => {
    let todayMeridian;
    let todayTime = getTime(`${todayHours}:${todayMinutes}`);

    [todayTime, todayMeridian] = todayTime.split(' - ');
    [todayHours, todayMinutes] = todayTime.split(":");
    
    let data;
    todos.map(todo => {
        let [time, meridian] = todo.todoTime.split(' - ');
        let [hours, minutes] = time.split(":");

        if (todayHours === hours && todayMinutes === minutes && todayMeridian === meridian){
           data = {task: todo.name, meridian: meridian}
        }
    })
    return data ? data : false;
}

export { 
    saveToLocalStorage, 
    getFromLocalStorage, 
    getTime, 
    validate, 
    compareTimes
};
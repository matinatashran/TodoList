import React, { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';


// toastify
import { ToastContainer } from 'react-toastify';
import notify from './toastify';

// style
import style from './main.module.css';

//components 
import TodoCard from './TodoCard';

// functions
import { 
    saveToLocalStorage, getFromLocalStorage, 
    getTime, validate, compareTimes  } from '../helpers/functions';


const Main = () => {
    const [todoName, setTodoName] = useState("");
    const [time, setTime] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [isCheck, setIsCheck] = useState(false);

    const nameInput = useRef();
    const timeInput = useRef();

    useEffect(() => {
        setTodos([ ...getFromLocalStorage() ]);
    }, [])

    const changeHandler = (event) => {
        if (event.target.type === "text")
            setTodoName(event.target.value.trim());
        else
            setTime(getTime(event.target.value)); 
    }

    const AddBtnHandler = () => {
        if (validate(todoName, time)){
            setTodos([
                ...todos, 
                {name: todoName, status: "unCompleted", todoTime: time}
            ]);
            saveToLocalStorage([
                ...todos, 
                {name: todoName, status: "unCompleted", todoTime: time}
            ]);

            nameInput.current.value = "";
            timeInput.current.value = "";
        }
    }

    const selectHandler = (event) => {
        setStatus(event.target.value);
    }

    // let data, todayHours, todayMinutes;
    // setInterval(() => {
    //     const today = new Date();
    //     todayHours = today.getHours();
    //     todayMinutes = today.getMinutes();

    //     data = compareTimes(todos, todayHours, todayMinutes)
    // }, 2000);

    // if (data)
    //     alert(`Now ${todayHours}:${todayMinutes} - ${data.meridian}. Please do '${data.task}'`);

    return (
        <div className={style.mainContainer}>

            <div className={style.addTodoBox}>
                <div className={style.inputBox}>
                    <input type="text" ref={nameInput} placeholder="Todo Name" onChange={changeHandler}/>
                    <input type="time" ref={timeInput} className={style.todoTime} onChange={changeHandler}/>
                </div>
                <div className={style.buttonBox}>
                    <button className={style.addButton} onClick={AddBtnHandler}>Add Todo</button>
                </div>
            </div>

            <div className={style.horizontalLine}></div>
            
            <div className={style.todosBox}>
                <div className={style.filterTodo}>
                    <select name='todo' className={style.filter} onClick={selectHandler}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="unCompleted">Uncompleted</option>
                    </select>
                </div>

                <div className={style.showTodo}>
                    {
                        status === "all" ?
                            todos.map(todo => <TodoCard 
                                key={v4()} 
                                todoTitle={todo.name}
                                setTodos={setTodos}
                                setIsCheck={setIsCheck}
                                isCheck={isCheck}
                                todos={todos}
                                todo={todo}
                                />)
                        
                        :
                            todos.map(todo => todo.status === status && <TodoCard 
                                key={v4()} 
                                todoTitle={todo.name}
                                setTodos={setTodos}
                                setIsCheck={setIsCheck}
                                isCheck={isCheck}
                                todos={todos}
                                todo={todo}
                                />)
                    }
                    {
                        !todos.length && 
                            <div className={style.emptyText}>
                                <i className="fa fa-search"></i>
                                <span>Empty</span>
                            </div>
                    }
                </div>
                <ToastContainer/>
            </div>
        </div>
    );
};

export default Main;
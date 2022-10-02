import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

// style
import style from './todoCard.module.css';

// functions
import { saveToLocalStorage } from '../helpers/functions';

const Button = styled.button`
    border-radius: 50%;
    border: ${(props) => props.status === "unCompleted" ? "2px solid #1ddb1d" : "none"};
    background-color: ${(props) => props.status === "unCompleted" ? "#fff" : "#1ddb1d"};
    color: ${(props) => props.status === "unCompleted" ? "#1ddb1d" : "#fff"};
`

const TodoCard = ({ todoTitle, setTodos, setIsCheck, isCheck, todos, todo }) => {
    const checkRef = useRef();

    const checkHandler = () => {
        setIsCheck(!isCheck)
        
        todos.map(todo => {
            if (todo.name === todoTitle && todo.status === "unCompleted")
                todo.status = "completed"; 

            else if (todo.name === todoTitle && todo.status === "completed")
                todo.status = "unCompleted";    
        })

        setTodos(todos);
        saveToLocalStorage(todos); 
    }

    const deleteHandler = () => {
        const otherTodos = todos.filter(todo => todo.name !== todoTitle);

        setTodos(otherTodos);
        saveToLocalStorage(otherTodos);
    }

    return (
        <>
            <div className={style.todoCardContainer}>
                <div className={style.leftCard}>
                    <button className={style.btnDelete}
                        onClick={deleteHandler}>

                    <i className='fa fa-trash'></i> 
                    </button>

                    <Button ref={checkRef} status={todo.status}
                        onClick={checkHandler}> 

                        <i className='fa fa-check'></i> 
                    </Button>
                            
                    <label>{todoTitle}</label>
                </div>
                <div className={style.rightCard}>
                    <label>{todo.todoTime}</label>
                </div>
            </div>
        
        </>
    );
};

export default TodoCard;
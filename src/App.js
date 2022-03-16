import {useEffect, useRef, useState} from "react";
import "./app.css";

function App() {
    const [count,setCount] = useState(0);
    const [flag,setFlag] = useState(false);
    const timer = useRef();

    const toggleTimer = ()=>{
        setFlag(prev=>!prev);

        if(flag){
            clearInterval(timer.current);
        }else{
            timer.current = setInterval(()=>{
                setCount(prevState => prevState+1);
            },1000)
        }

    }

    return (
        <div className='main'>
            <div>count : {count}</div>
            <div>
                <button onClick={toggleTimer}>toggle</button>
            </div>
        </div>
    );
}

export default App;

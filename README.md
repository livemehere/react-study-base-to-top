# 리액트 뿌시기!

## 여러개 input 관리하기

```js
import { useState } from "react";
import "./app.scss";
import Display from "./Display";

function App() {
    const [inputs,setInputs] = useState({
        name:"",
        school:"",
    })

    const  handleChange = (e)=>{
        e.preventDefault();
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

  return (
    <div>
        <form>
            <input name='name' type="text" value={inputs.name} onChange={handleChange}/>
            <input name='school' type="text" value={inputs.school} onChange={handleChange}/>
            <button>제출</button>
        </form>
    </div>
  );
}

export default App;

```


## scroll Event 다루기 && useRef()

```js
import {useEffect, useRef, useState} from "react";
import "./app.scss";

function App() {
    const [n,setN] = useState(0);
    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const handleScroll = (e)=>{
        console.log(e.target.clientHeight) // 스크롤이 가려지지 않은 화면 길이
        console.log(e.target.scrollHeight) // 총 스크롤 길이
        console.log(e.target.scrollTop) // 현재 스크롤 위치

        if(e.target.scrollTop > 500){
            console.log('over 200!')
        }
    }

    const handleClick = ()=>{
        setN(prevState => prevState+1);
    }

    return (
        <div>
            <div className='wrap' onScroll={handleScroll}>
                <div className='inner'>{n}</div>
            </div>
            <button onClick={handleClick}>click</button>
            <input type="text" ref={inputRef}/>
        </div>
    );
}

export default App;

```

## 배열 렌더링하기

```js
import { useState} from "react";
import "./app.scss";

function App() {
    const [n,setN] = useState([
        {id:1,name:'kong',age:25},
        {id:2,name:'ja',age:22},
        {id:3,name:'elic',age:21},
    ]);

  return (
      <div>
          {n.map(i=><div key={i.id}>{i.name} {i.age}</div>)}
      </div>
  );
}

export default App;
```

## useRef()에 데이터 저장하기

```js
import {useEffect, useRef, useState} from "react";
import "./app.scss";

function App() {
    const [n,setN] = useState(0);
    const storeRef = useRef(0);


    const handleScroll = (e)=>{
        
        storeRef.current = e.target.scrollTop;
        console.log(storeRef.current)
    }


    return (
        <div>
            <div className='wrap' onScroll={handleScroll}>
                <div className='inner'>{n}</div>
            </div>
        </div>
    );
}

export default App;

```

## useRef()로 타이머 구현하기

- 컴포넌트의 렌더링에 따라서 단순히만 작동하는거면 useEffect()에서 return 구문을 사용해 clear해주면 된다

```js
import {useEffect, useRef, useState} from "react";
import "./app.scss";

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
```

## useMemo()로 렌더링 최적화

- 함수의 결과값이 memoized 된다.
- hah 의 내용이 변할시 함수를 재실행 하여 결과값을 최신화 한다.
- 함수가 return 하는 값을 비교해서 다를 경우 재실행함

```js
    const [hah,setHah] = useState(1)
const timer = useRef();

const heavyWork = (hah) =>{
    console.log('무거운일...'+hah)
    return hah;
}
const store =  useMemo(()=>heavyWork(hah),[hah]);


```

## useReducer()

```js
import {memo, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import "./app.scss";

const initialState = {
    count:0
}

function reducer (state,action){
    switch(action.type){
        case 'increament':
            return {...state,count:state.count+1};
        case 'decreament':
            return {...state,count:state.count -1};
        default:
            return state;
    }

}

function App() {
    const [state,dispatch] = useReducer(reducer,initialState);

    const onClick = ()=>{
        dispatch({type:'increament'});
    }

    const onDecrease = ()=>{
        dispatch({type:'decreament'})
    }

    return (
        <div className='main'>
            <p>{state.count}</p>
            <button onClick={onClick}>click +</button>
            <button onClick={onDecrease}>click -</button>
        </div>
    );
}

export default App;
```

## custom Hooks

```js
import {memo, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import "./app.scss";


function App() {

    const [name,nameChange] = useInput('');

    return (
        <div className='main'>
            <input type="text" value={name} onChange={nameChange}/>
        </div>
    );
}

export default App;


function useInput(initialValue){
    const [value,setValue] = useState(initialValue);

    const onChange = (e)=>{
        setValue(e.target.value);
    }

    return [value,onChange];
}
```
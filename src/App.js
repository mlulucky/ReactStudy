/* eslint-disable  */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {


  useEffect(()=>{
    ajax통신();
  },[]);

  let [springData, setSpringData] = useState([]);

  async function ajax통신(){
    try{
      let 받아온데이터 = await axios.get("/hello"); // http://localhost:8080/hello
      let springArr = [...받아온데이터.data];
      console.log("springArr",springArr);

      setSpringData(springArr);

    }catch(e){
      console.log("에러", e);
    }

  }



  let title = "개발 Blog";
  let [글제목, 글제목변경] = useState(["맛집탐방", "일본여행", "개발일지", "리액트공부"]);
  // 좋아요 누르면 1씩 증가하기 => 바뀌는 값 state 로 저장

  // let [따봉, 따봉변경] = useState(0);

  let 따봉배열 = 글제목.map(function (item) {
    return item = 0 // [0, 0, 0]
  })

  let [따봉, 따봉변경] = useState(따봉배열)

  let [modal, setModal] = useState(false);

  let [인덱스, 인덱스변경] = useState(0);

  let [입력값, 입력값변경] = useState('');

  // let modal = false // 모달창의 상태를 state 로 저장

  // let 따봉 = 0;
  // 따봉변경(따봉 대체할데이터)
  // 대체할 데이터가 [ ] 배열인 경우, 함수의 인자로 [ ] 배열을 넣어야 한다
  // ex) 글제목변경(글제목[0] = "여자 코트 추천") 안됨
  // 왜? 대체할 데이터는 ["여자 코트 추천", "일본여행", "개발일지"] 배열 전체가 싹 바껴야함

  // 문제1. 버튼 눌렀을때 텍스트 변경
  // 문제2. 버튼 눌렀을때 텍스트 정렬변경
  function 제목바꾸기() {
    // 🍒map 이용해서 새로 배열 생성 및 수정. 변경된 배열 반환
    // const 글변경 = 글제목.map((item)=> {
    //   if(item === "맛집탐방") {
    //     return item = "여자 코트 추천"
    //   } return item
    // })
    // 글제목변경( 글변경 );

    // 🍒 Array.from 으로 새로운 배열 생성
    // const 글변경 = Array.from(글제목);
    // 글변경[0] = "여자 코트 추천"
    // 글제목변경( 글변경 );

    // 🍒 신문법 [... 배열] : 배열 새로 생성
    const 글변경 = [...글제목];
    글변경[0] = "여자 코트 추천";
    글제목변경(글변경);
  }

  function 정렬바꾸기() {
    const 새로운배열 = [...글제목];
    새로운배열.sort();
    글제목변경(새로운배열); // == 글제목
  }

  // 현재날짜
  const date = ()=> {
    const today = new Date();
    const time = {
      year : today.getFullYear(),
      month : today.getMonth() + 1,
      datee : today.getDate(),
      hours : today.getHours(),
      minute : today.getMinutes()
    }
    const timeString = `${time.year}.${time.month}.${time.datee}.${time.hours}:${time.minute}`;
    return timeString 
  }


  return (
    <div className="App">
      <div className="black_nav">
        <h2> {title} </h2>
      </div>
      <ul>
        {
          springData.map(function (a, i) {
            return (
              // 반복문으로 생성한 html 에는 key= {i} 독자적인 속성을 추가하기
              <li className="list" key={i}>
                <h3 onClick={(e) => { 
                  setModal(!modal) 
                  console.log(e.target)
                  // console.log(글제목[i]);
                  인덱스변경(i)
                  }}> {a.title}
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // ❤ 배열복사 2
                      const newArr = [...따봉];  // [0, 0, 0] array, object 형태의 state 를 변경하고 싶으면 카피본을 먼저 만들기 !!
                      newArr[i]++;
                      따봉변경(newArr); // 따봉 = 따봉변경(newArr) // 따봉이 새로운 new따봉 으로 바뀐 것! => 재렌더링 

                    }}>👍</span>

                  {따봉[i]}
                </h3>



                <p>
                  {
                    date()
                  }
                </p>
                <button onClick={ ()=>{ 
                    const new글제목 = [...글제목]; // array, object 형태의 state 를 변경하고 싶으면 카피본을 먼저 만들기 !!
                    new글제목.splice(i,1);
                    console.log(new글제목);
                    글제목변경(new글제목);
                   }}>삭제</button>

              </li>

            )
          })
        }

      </ul>
      
      <div>
        <input onChange={ (e)=>{ 
          // console.log(e.target.value);  
          입력값변경(e.target.value) // 입력값이 e.target.value 로 바뀐다. // setState 함수는 늦게처리 된다 (비동기 처리) 
          console.log(입력값); 
          } }/>
        <button 
        onClick={ (e)=>{ 
          e.preventDefault();
          if(입력값.trim()=="") { // 공백을 제거한 값이 "" 빈값이면 
            alert("값을 입력해주세요");
          } else {
            let new글제목 = [... 글제목] // array, object 형태의 state 를 변경하고 싶으면 카피본을 먼저 만들기 !!
            // new글제목.push(입력값);// 배열 뒤에 요소 추가
            new글제목.unshift(입력값); // 배열 앞에 요소 추가 // 입력값은 e.target.value
            글제목변경(new글제목); // 글제목을 추가하면 글목록이 추가됨(글제목배열 개수만큼 html 반복되서)
            
            let new따봉 = [...따봉];
            new따봉.unshift(0); // 글제목 추가시, 따봉개수도 추가하기
            따봉변경(new따봉); // 따봉을 new따봉으로 바꾼 것
          }
            
            
        } }>글발행</button> 
      </div>
      {
        // html 안에서 조건식은 삼항연산자를 사용
        // 빈 html 은 null 을 사용
        // <Modal color="skyblue"> 일반 문자전송은 중괄호 없이 사용가능
        modal == true ? <Modal color={"skyblue"} 제목바꾸기={제목바꾸기} 글제목={ 글제목 }  인덱스={인덱스}/> : null

      }

      {/* <Componet 글제목={글제목} ></Componet> */}

    </div>

  );
} // function App 컴포넌트 

function Modal(props) {
  // let [인덱스, 인덱스변경] = useState(0); 
  // state 를 App 에서 선언안하고, 자식 Modal 에서 선언해서 사용해도 됨 
  // <h2> { props.글제목[인덱스] } </h2>   // props.인덱스가 아니고 그냥 인덱스 사용 가능
  // 근데 state 가 Modal, App 에서 필요하면 App 컴포넌트 에서 만들어야 한다.
  // 🍒 state 만드는 곳은 state 사용하는 컴포넌트 중 최상위 컴포넌트

  return (
    <div className="modal" style={{ background: props.color }}>   
      <h2> { props.글제목[props.인덱스] } </h2>
      <p>내용</p>
      <p>상세내용</p>
      <button onClick={props.제목바꾸기}>제목변경</button>
    </div>
  )

  // function App 에서 선언된 state 글제목 변수는 function Modal 에서는 사용 못한다 왜? 자바스크립트는 함수안에서 선언된 변수는 함수밖에서는 사용못해서.
  // 해결방법은 function App 컴포넌트안에 <Modal /> 컴포넌트는 자식컴포넌트이므로. 부모컴포넌트 App 에서 선언된 state 를 자식 컴포넌트 Modal 로 전송이 가능하다.
  // 방법은 자식 컴포넌트 태그에 state 를 변수로 속성을 추가하고  그 자식 컴포넌트를 만든 함수 function Modal 의 파라미터로 props 속성을 추가하여서 props.state 변수명 을 사용한다.

}


// 리액트 클래스를 이용한 컴포넌트 만드는 법
class Componet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name : "kim",
      age : 20
    }
  }
  render(){
    return (
      // state 변경은 setState
      <div>
        <p>
          { this.props.글제목 }
        </p>
        안녕 {this.state.name}
        <button onClick={()=>{ this.setState({ name : "moon" })}}>변경</button> 
      </div>
      
    )
  }
}


function Subject() {
  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      <h1>안녕하세요</h1>
      <p>리액트 공부중입니다!</p>
    </div>
  )
}

export default App;


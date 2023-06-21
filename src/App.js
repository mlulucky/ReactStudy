/* eslint-disable  */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
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
          글제목.map(function (a, i) {
            return (
              // 반복문으로 생성한 html 에는 key= {i} 독자적인 속성을 추가하기
              <li className="list" key={i}>
                <h3 onClick={(e) => { 
                  setModal(!modal) 
                  console.log(e.target)
                  // console.log(글제목[i]);
                  인덱스변경(i)
                  
                  }}> {글제목[i]}
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // 따봉변경(변경된 따봉배열) 
                      // 따봉변경([1,0,0])
                      // array 자료형인 경우 복사 // 단순 대입은 같은 주소를 참조하므로 a == b true 가 나온다.
                      // setState 로 재렌더링 되는게 아니라, setState(데이터) 할때 데이터가 변경이 되어야 재렌더링이 되는 것!
                      // 다만, 단순히 값만 바뀐다고 데이터가 변경되는게 아니라, 배열, 객체 마찬가지로 참조되는 주소값이 달라야 변경되는것!
                      // let a = [1,2,3]
                      // let b = a
                      // b[1] = 3
                      // console.log(a) // [1,3,3]
                      // console.log(b) // [1,3,3] 
                      // console.log(a == b) // true 같은 메모리를 참조하는가

                      // 🌹 잘못된 예시
                      // 따봉[i] ++;
                      // 따봉변경(따봉); // 따봉 = 따봉변경(따봉) // 같은 따봉 을 참조하므로 데이터가 동시에 변경되므로. 실제 값은 바뀔지언정 변화가 없음 => 재렌더링 안된다.
                      // 자료형은 참조메모리, 값이 모두 바껴야 기존 값과 다른 것! 화면이 재 렌더링 된다.

                      // ❤ 배열복사 1
                      // const new따봉 = [];
                      // for (let i = 0; i < 따봉.length; ++i) {
                      //   new따봉.push(따봉[i]);
                      // }

                      // new따봉[i]++; // new따봉[i] += 1
                      // 따봉변경(new따봉)

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

function Subject() {
  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      <h1>안녕하세요</h1>
      <p>리액트 공부중입니다!</p>
    </div>
  )
}

export default App;


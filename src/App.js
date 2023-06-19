/* eslint-disable  */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let title = "개발 Blog";
  let [글제목, 글제목변경] = useState(["맛집탐방", "일본여행", "개발일지"], "변경함수");
  // 좋아요 누르면 1씩 증가하기 => 바뀌는 값 state 로 저장
  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false);
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
    글제목변경(새로운배열);
  }

  return (
    <div className="App">
      <div className="black_nav">
        <h2> {title} </h2>
      </div>

      <ul>
        <li className="list">
          {/* <button onClick={ 제목바꾸기 } >제목변경</button> */}
          <button onClick={정렬바꾸기} >제목변경</button>

          <h3> {글제목[0]} <span style={{ cursor: 'pointer' }} onClick={() => { 따봉변경(따봉 + 1) }}>👍</span> {따봉} </h3>
          <p>6월 19일</p>
        </li>
        <li className="list">
          <h3> {글제목[1]} </h3>
          <p>6월 19일</p>
        </li>
        <li className="list">
          <h3
            onClick={() => {
              // 다시 누르면 모달창 안보이게 => 조건문) true 일때 false, false 일때 true
              // if 조건문, 삼항연산자, ...
              { setModal(!modal) } // 🍒modal 을 true 면 false, false 면 true 로 만들어준다.
              // if(modal == false) {
              //   setModal(true)
              // } else {
              //   setModal(false)
              // }
            }}
            style={{ cursor: 'pointer' }
            } > {글제목[2]} </h3>
          <p>6월 19일</p>
        </li>
      </ul>

      {
        // html 안에서 조건식은 삼항연산자를 사용
        // 빈 html 은 null 을 사용
        modal == true ? <Modal /> : null
      }

    </div>

  );
}

function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>내용</p>
      <p>상세내용</p>
    </div>
  )
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


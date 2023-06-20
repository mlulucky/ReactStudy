/* eslint-disable  */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let title = "개발 Blog";
  let [글제목, 글제목변경] = useState(["맛집탐방", "일본여행", "개발일지"], "변경함수");
  // 좋아요 누르면 1씩 증가하기 => 바뀌는 값 state 로 저장

  // let [따봉, 따봉변경] = useState(0);

  let 따봉배열 = 글제목.map(function (item) {
    return item = 0 // [0, 0, 0]
  })

  let [따봉, 따봉변경] = useState(따봉배열)

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
    글제목변경(새로운배열); // == 글제목
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
                <h3> {글제목[i]}
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
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
                      // console.log(a == b) // true 같은 배열을 참조하는가
                      
                      // 🌹 잘못된 예시
                      // 따봉[i] ++;
                      // 따봉변경(따봉); // 따봉 = 따봉변경(따봉) // 같은 따봉 을 참조하므로 데이터가 동시에 변경되므로. 실제 값은 바뀔지언정 변화가 없음 => 재렌더링 안된다.


                    
                      // ❤ 배열복사 1
                      // const new따봉 = [];
                      // for (let i = 0; i < 따봉.length; ++i) {
                      //   new따봉.push(따봉[i]);
                      // }

                      // new따봉[i]++; // new따봉[i] += 1
                      // 따봉변경(new따봉)

                      
                      // ❤ 배열복사 2
                      const newArr = [ ...따봉 ];  // [0, 0, 0]
                      newArr[i]++;
                      따봉변경(newArr); // 따봉 = 따봉변경(newArr) // 따봉이 새로운 new따봉 으로 바뀐 것! => 재렌더링 

                    }}>👍</span>


                  {따봉[i]}
                </h3>
                <p>6월 19일</p>
              </li>
            )
          })
        }

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


## 색상으로 오늘의 기분을 표현하는 다이어리

### 22.06~08  
### 배포링크
[Colorful Diary](https://sweesweett.github.io/react-diary-app/)  
### 사용한 라이브러리   

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)**(create-react-app)**  
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  
**react-uuid**

### 특징

- 선택한 색상에 따라 일기 배경의 색상이 변경됨 
- 날씨 api/ fetch로 받아와서 현재 서울 날씨를 알 수 있음
- 일기를 작성했을 떄의 날씨를 볼 수 있음
- localStorage를 통해 개개인의 일기를 저장할 수 있음
- 클릭했을 떄 상세 내용을 볼 수 있음
- 상세페이지에서 더보기 버튼을 통해 수정/ 삭제할 수 있음


### 개발 사항 흐름
1.0  글 등록 기능 구현  
1.1  글 수정, 삭제 기능 구현  
1.2  날씨 API에서 받아온 해당 날씨에 맞는 날씨 아이콘 추가  
1.3  모달페이지 구현
2.0  todoList처럼 리스트에서만 각 일기를 삭제-> 리액트 라우터를 통해 기본페이지 ,상세페이지 따로 구현    
2.1  수정 페이지 구현  
2.2  리액트 라우터를 통해 뒤로가기버튼 구현 + 뒤로가기룰 떴을 때 이동에 대한 모달이 뜨게 구현  
3.0  useReducer+React.contextApi 로 상태 관리 리팩토링

### 배포된 웹페이지 화면  
기본페이지
![기본페이지](https://user-images.githubusercontent.com/98820643/185634002-33d88075-9f48-4629-8838-627415f3d778.png)  
일기 상세 페이지  
![일기 상세 페이지](https://user-images.githubusercontent.com/98820643/185635837-d41917c3-f4ab-498f-803a-92ae53ceb84b.png)  
일기 수정 페이지
![수정페이지](https://user-images.githubusercontent.com/98820643/185636162-87515909-21c9-4d74-8d00-2ee4762b3022.png)    
모달  
![모달](https://user-images.githubusercontent.com/98820643/185637116-cceb7000-e3be-47c0-a6cb-10f55465dde5.png)

# TMDB
[The Movie Database](https://www.themoviedb.org) 클론 코딩
<br><br/>
## 설치 및 실행
```
yarn install
npx expo start -c
```

## 사용한 라이브러리

- React Native
- TypeScript
- @reduxjs/toolkit
- axios
- expo
- expo-router
- nativewind
- [appwrite](https://appwrite.io)
  - 사용자 인증 및 데이터베이스
- @expo/vector-icons
<br><br/>

<br><br/>

## 스크린샷 / 기능 설명
### 랜딩 화면
<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/3addc099-5b67-459a-9663-39d523bc8a4a" width="300">
<br><br/>

### 회원가입
`appwrite`를 사용하여 사용자 인증 구현

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/5c42190d-f1b9-4694-99f7-35b7816fcbc8" width="300">
<br><br/>

### 로그인
<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/83161064-6680-4176-b203-988d0fcfd221" width="300">
<br><br/>

### 홈
- 키워드 검색
- Now Playing, Popular, Top Rated, Upcoming 영화 조회

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/ac136c81-bc93-4ec0-87e8-a90fe42373f9" width="300">
<br><br/>

### 검색
무한 스크롤
- 스크롤에 따라 검색 결과 추가적으로 렌더링
- 터치시 영화 상세 화면으로 이동

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/c39939c6-c57a-4022-9768-ef6608cce67d" width="300">
<br><br/>

### 상세 
- 영화 상세 정보 조회
- 별점 평가(1~5점)
- 즐겨찾기에 추가/삭제
- 트레일러 터치시 유튜브로 이동

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/fe282da2-4705-4c22-8aca-251573f5d60f" width="300">
<br><br/>

### 즐겨찾기한 영화
- 즐겨찾기한 모든 영화 조회
- 정렬/필터링
  - 개봉 날짜 순, 인기 순, 내가 즐겨찾기 한 시간 순, 제목 순 정렬
  - 내가 평가한 영화만 필터링

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/6974260a-cfe4-4ead-9093-72723eeaddc3" width="300">
<br><br/>

### 내가 평가한 영화
- 평가한 모든 영화 조회
- 정렬/필터링
  - 개봉 날짜 순, 인기 순, 내가 평가한 시간 순, 제목 순 정렬
  - 내가 즐겨찾기한 영화만 필터링

<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/539bc9e0-fced-4c89-ae72-16cc5554f9ab" width="300">
<br><br/>

### 마이페이지 
로그아웃 기능
<br><br/>
<img src="https://github.com/yerinra/react-native-tmdb-clone/assets/132549100/c71552b2-187f-44b1-a476-1a934662ca79" width="300">
<br><br/>



# inflearn-corona-map

## 00. 초기 환경 구축

1. IDE: VS Code 설치

   - 확장 프로그램 설치
     - `Korean Language Pack for Visual Studio Code`: 한국어 확장팩
     - `ejs snippet`: [VS Code HTML Snippets](https://github.com/abusaidm/html-snippets)
       - 다양한 HTML 마크업 언어 지원

2. Node.js 및 nvm 설치

   - 브라우저 외에서도 Javascript을 실행할 수 있는 런타임 환경

   - 다른 인프런 강의 때문에 `v10.16.3` 설치했어서 버전 관리를 위해 `nvm` 설치했음

   - [Window에서 Node 버전 관리를 위한 nvm 방법](https://sysong85.tistory.com/82)

   - [source github](https://github.com/coreybutler/nvm-windows/releases)

   - nvm 사용법

     - ```bash
       $ nvm
       
       Running version 1.1.7.
       
       Usage:
       
         nvm arch                     : 
         		- Node 실행 모드 확인 (32비트 또는 64비트 )
         nvm install <version> [arch] : 
         		- version: 버전명 명시 혹은 latest로 최신 버전 설치
         		- arch: 필요한 경우 32비트 버전 또는 64비트 버전 설치 지정 가능
         				기본값은 현재 시스템 arch. all로 설정하면 32비트 64비트 모두 설치
               - 원격 다운로드 서버의 SSL 유효성 검사를 우회하려면 명령 끝에 `--insecure` 추가
         nvm list [available]         : 
         		- 현재 설치된 node.js 버전 나열
         		- 설치 가능한 항목 보려면 끝에 `available` 추가
         nvm on                       : 
         		- nvm으로 node.js 버전 관리를 사용하도록 설정
         nvm off                      : 
         		- nvm으로 node.js 버전 관리 사용하지 않돌고 설정
         nvm proxy [url]              : 
         		- 다운로드에 사용할 프록시 설정
         		- 현재 프록시를 보려면 url은 입력하지 않기
         		- nvm proxy none으로 설정하면 프록시 제거
         nvm node_mirror [url]        : 
         		- 노드 미러 설정
         		- 기본값 `https://nodejs.org/dist/`
         		- 기본값을 사용하려면 url은 입력하지 않기
         nvm npm_mirror [url]         : 
         		- npm 미러 설정
         		- 기본값 `https://github.com/npm/cli/archive/`
         		- 기본값을 사용하라면 url은 입력하지 않기
         nvm uninstall <version>      : 
         		- 노드 버전 삭제
         		- 버전명을 명시해줘야 함
         nvm use [version] [arch]     : 
         		- version에 기입된 버전을 사용하도록 전환
         		- 필요한 경우 32/64비트 아키텍처 모드를 지정할 수 있음
         		- version은 입력하지 않고 arch만 입력하면 현재 선택한 버전의 모드만 변경
         nvm root [path]              : 
         		- nvm이 node.js의 다른 버전을 저장할 디렉토리 설정
         		- path가 설정되지 않은 경우 현재 nvm의 루트가 어디에 있는지 표시
         nvm version                  : 
         		- 현재 실행중인 nvm for Windows의 버전 표시
         		- v로 약칭 `nvm v`
       ```

     - ```bash
       $ nvm v
       1.1.7
       ```

   - node 및 npm 설치 확인

     - ```bash
       $ nvm list
         * 14.17.0 (Currently using 64-bit executable)
           10.16.3
       
       $ node --version
       14.17.0
       
       $ npm --version
       6.14.13
       ```

3. npm으로 프로젝트에 필요한 패키지(모듈) 설치하기

   - express

     - ```bash
       $ npm install -g express
       + express@4.17.1
       added 50 packages from 37 contributors in 3.229s
       ```

       - -g: 전역(글로벌)으로 설치

   - express-generator: express 환경을 편리하게 구축할 수 있는 ㅌ ㅜㄹ

     - ```bash
       $ install -g express-generator
       npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update 
       to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)
       C:\Program Files\nodejs\express -> C:\Program Files\nodejs\node_modules\express-generator\bin\express-cli.js
       + express-generator@4.16.1
       added 10 packages from 13 contributors in 1.131s
       ```

   - nodemon: 변경 사항 발생시 서버를 재시작하지 않아도 되게 해주는 패키지

     - ```bash
       $ npm install -g nodemon
       C:\Program Files\nodejs\nodemon -> C:\Program Files\nodejs\node_modules\nodemon\bin\nodemon.js     
       
       > nodemon@2.0.7 postinstall C:\Program Files\nodejs\node_modules\nodemon
       > node bin/postinstall || exit 0
       
       Love nodemon? You can now support the project via the open collective:
        > https://opencollective.com/nodemon/donate
       
       npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.3.1 (node_modules\nodemon\node_modules\chokidar\node_modules\fsevents):
       npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
       
       + nodemon@2.0.7
       added 119 packages from 53 contributors in 7.256s
       ```



## 01. 지도 서비스 프로젝트 구축

1. express 프로젝트 생성

   - ```bash
     $ express --ejs [프로젝트명]
     ```

     - express 키워드: express-generator를 통해 프로젝트를 만들어준다.
     - --ejs: 뷰 템플릿을 ejs로 선택
     - 프로젝트명: firstmap 등 원하는 것으로 지정

   - 생성한 프로젝트로 이동해서 `npm install` 로 패키지 설치

2. express 서버 실행

   - ```bash
     $ npm start
     ```

   - ```json
     {
       "name": "firstmap",
       "version": "0.0.0",
       "private": true,
       "scripts": {
         "start": "node ./bin/www"
       },
       "dependencies": {
         "cookie-parser": "~1.4.4",
         "debug": "~2.6.9",
         "ejs": "~2.6.1",
         "express": "~4.16.1",
         "http-errors": "~1.6.3",
         "morgan": "~1.9.1"
       }
     }
     ```

     - package.json의 "script"는 npm을 키워드로 하는 명령어들이 있다.
     - npm start를 하면 "node ./bin/www" 가 실행되도록 지정
     - npm start 대신 node ./bin/www 입력해도 당연히 서버가 실행됨

   - 브라우저에서 `localhost:3000` 입력하면 실행된 서버를 웹 페이지에서 볼 수 있다

   - 서버를 끄고 켜는 작업이 번거롭기 때문에 설치한 패키지, `nodemon`
     변경 사항이 생기면(현재까지의 작업 내용을 저장하면) 서버를 재시작(리로드) 해줌

     - ```bash
       $ nodemon ./bin/www
       [nodemon] 2.0.7
       [nodemon] to restart at any time, enter `rs`
       [nodemon] watching path(s): *.*
       [nodemon] watching extensions: js,mjs,json
       [nodemon] starting `node ./bin/www`
       ```

       - npm start를 한 것처럼 정상적으로 서버가 실행된다. `localhost:3000` 접속 가능
       - 하지만 npm start와 다르게 변경 사항이 생길 때마다 서버를 껐다가 켜는 작업을 할 필요가 없게 도와준다.
       - npm start를 입력하면 nodemon이 실행되도록 하기 위해
         package.json의 "script"를 바꿔준다.

3. 네이버 지도 api 발급 및 적용

   - 현재 공공기관용 네이버 클라우드 적용하고 있기 때문에 공공기관용 스크립트를 import해줘야 한다.

     - ```ejs
       <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?govClientId=클라이언트아이디"></script>
       ```

     - github에 올릴 때 스크립트 태그 안에 있는 클라이언트 아이디를 공개하지 않는 방법은?

     - 방법이 없으면 그냥 이 상태로 올려야지 뭐

4. 지도 서비스 CSS 적용

   - CSS 파일이나 javascript 파일은 모듈화해서 import 하는 방식으로 쓰는 것이 유리하다.
   - javascript를 import 하는 script 태그는 body 태그의 하단에 위치시키는 것이 유리
     - html 코드가 렌더링 된 후 javascript를 불러오기 때문에 성능적으로 좋다.

5. 네비게이션 바 만들기

   - index.ejs

     - ```ejs
       <ul id="navbar">
           <li>
               <a href="/">firstmap</a>
           </li>
           <li style="float: right">
               <a class="active" href="/upload">upload</a>
           </li>
       </ul>
       ```

   - style.css

     - ```css
       body {
         padding: 0px !important;
         margin: 0px !important;
         font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
       }
       
       a {
         color: #00b7ff;
       }
       
       ul {
         list-style: none;
         margin: 0px;
         padding: 0px;
         overflow: hidden;
         background: #333;
       }
       
       li {
         float: left;
       }
       
       li a {
         display: block;
         color: white;
         text-decoration: none;
         text-align: center;
         padding: 14px 16px;
       }
       
       .active {
         background-color: green;
       }
       
       li a:hover:not(.active) {
         background-color: #111;
       }
       
       ```

       - li a:hover:not(.active) {  background-color: #111; }

         li 태그 안에 있는 a 태그들 중 클래스명이 active인 a 태그는 제외하고 나머지 태그에 마우스 hover 효과를 적용하는데, 마우스 hover시 배경 색깔이 바뀌게 한다.

6. 업로드 페이지 만들기

   - express의 구조
     - routes 폴더 > index.js에서 request url을 mapping해준다.
     - `.render("이름")` 메서드를 통해 이름에 맞는 ejs 파일을 views 폴더에서 찾는다.
     - ejs 파일은 쉽게 생각하면 html 파일이라고 생각하면 됨
     - ejs 파일에 css 파일과 javascript 파일을 import 해줄 수 있다.
   - views 폴더 안에 upload.ejs 파일 만들어서 느낌 있게 꾸며기



## 02. 마커 및 인포윈도우 생성

1. 여러개의 마커 표시하기

   - main.js

     - ```javascript
       const data = [
         {
           title: "용산역",
           address: "용산",
           lat: 37.530030700096184,
           lng: 126.96484009170416,
         },
         {
           title: "서울역",
           address: "서울",
           lat: 37.55729213580176,
           lng: 126.96939750896465,
         },
       ];
       
       for (let i in data) {
         const target = data[i];
         const latlng = new naver.maps.LatLng(target.lat, target.lng);
       
         let marker = new naver.maps.Marker({
           map: map,
           position: latlng,
         });
       }
       ```

2. 마커에 CSS 적용하기

   - main.js

     - ```javascript
       for (let i in data) {
         const target = data[i];
         const latlng = new naver.maps.LatLng(target.lat, target.lng);
       
         let marker = new naver.maps.Marker({
           map: map,
           position: latlng,
           icon: {
             content: `<div class="marker"></div>`,
           },
         });
       }
       ```

   - style.css

     - ```css
       .marker {
         width: 15px;
         height: 15px;
         background-color: green;
         border: 1px solid black;
         border-radius: 50%;
       }
       ```

3. 인포윈도우 소개 및 정의하기

4. 인포윈도우 생성 함수 적용하기

   - main.js

     - ```javascript
       let markerList = [];
       let infowindowList = [];
       
       const getClickHandler = (i) => () => {
         const marker = markerList[i];
         const infowindow = infowindowList[i];
         if (infowindow.getMap()) {
           infowindow.close();
         } else {
           infowindow.open(map, marker);
         }
       };
       
       for (let i in data) {
         const target = data[i];
         const latlng = new naver.maps.LatLng(target.lat, target.lng);
       
         let marker = new naver.maps.Marker({
           map: map,
           position: latlng,
           icon: {
             content: `<div class="marker"></div>`,
             anchor: new naver.maps.Point(7.5, 7.5),
           },
         });
       
         const content = `
           <div class="infowindow_wrap">
             <div class="infowindow_title">${target.title}</div>
             <div class="infowindow_address">${target.address}</div>
           </div>
         `;
       
         const infowindow = new naver.maps.InfoWindow({
           content: content,
           backgroundColor: "#00ff0000",
           borderColor: "#00ff0000",
           anchorSize: new naver.maps.Size(0, 0),
         });
       
         markerList.push(marker);
         infowindowList.push(infowindow);
       }
       
       /* i번째 마커를 클릭했을 때, 인포 윈도우를 생성하는 getClickHandler 함수 실행 -> 만들어주기 */
       for (let i = 0, ii = markerList.length; i < ii; i++) {
         naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
       }
       ```

     - ```javascript
       const getClickHandler = (i) => () => {
           
       }
       
       
       const function getClickHandler(i) {
           return function() {
               
           }
       }
       /* 
       
       위 화살표 함수와 아래 함수는 같은 구조
       
       */
       ```

       - 한 번에 getClickHandler를 호출해 필요한 값을 쓰지 않고, getClickHandler 함수가 다른 함수를 호출하는 구조를 만든 이유
       - for 문을 돌면서 addListener 안에 getClickHandler(i)를 동시에 호출된다.
       - 즉 클릭이 아니라 for 문을 돌면서 인포윈도우가 펼쳐진다는 것.
       - 이를 방지하기 위해서 getClickHandler 함수가 또 다른 함수를 return하는 구조로 만들어주었다.

5. 인포윈도우 CSS 적용하기

   - style.css

     - ```css
       .infowindow_wrap {
         background-color: white;
         padding: 20px;
         border: 1px solid rgba(0, 0, 0, 0.2);
       }
       
       .infowindow_title {
         font-size: 15px;
         font-weight: bolder;
       }
       
       .infowindow_address {
         font-size: 13px;
         font-weight: normal;
       }
       ```

6. 인포윈도우 지도 클릭 이벤트 추가하기

   - 마커 뿐만 아니라 지도의 다른 영역을 클릭하더라도 열려 있는 인포 윈도우가 닫히는 것이 UX 측면에서 더 좋다.

   - main.js

     - ```javascript
       /* 앞 부분 생략 */
       
       const getClickMap = (i) => () => {
         const infowindow = infowindowList[i];
         infowindow.close();
       };
       
       
       /* 중간 부분 생략 */
       
       for (let i = 0, ii = markerList.length; i < ii; i++) {
         ...
         naver.maps.Event.addListener(map, "click", getClickMap(i));
       }
       ```

       - `getClickHandler`와 똑같은 동작을 하는 `getClickMap`을 정의해주면 된다.
       - 단, `getClickMap`의 경우에는 인포 윈도우가 열려 있는지 여부는 관심이 없다. 
         때문에 바로 닫아주도록 함수를 만들어준다.



## 03. MongoDB와 mongoose 활용

1. MongoDB 및 mongoose 소개

   - 데이터베이스: 통합하여 관리되는 데이터의 집합체
   - 데이터베이스 종류:
     - SQL: 데이터 무결성 보장
     - NoSQL: 유연하게 저장된 데이터를 조정하거나 추가하기가 가능, 빠른 속도
   - Node.js 및 express와 궁합이 잘 맞는 NoSQL로 수업 진행
   - MongoDB: NoSQL DB 중에서 가장 많이 사용됨
   - mongoose: 몽고DB를 더 쉽게 관리하고 입력할 수 있는 라이브러리 중 하나

2. MongoDB 호스팅 및 Compass 설치 / 실행

   - 방법은 여러 가지. 
     - 컴퓨터에 Mongo DB를 설치
     - Atlas에서 제공하는 [Mongo DB 무료 호스팅](https://www.mongodb.com/cloud/atlas) 사용
   - IP address 및 Database User 셋팅
   - Mongo DB Compass: 데이터베이스를 gui 형태로 관리하는 툴
     - 다운로드 받고 실행
     - connection string 복사하고 Mongo DB Compass 실행해서 붙여넣고 `<password>`는 설정한 비밀번호로 바꿔준다. 
     - 무료로 쓸 수 있는 M0 클러스터는 계정 당 하나만 만들어지는 듯.

3. mongoose 패키지 설치 및 설정

   - mongoose 패키지를 통해 데이터베이스 스키마 작성 및 Mongo DB와 연결

   - 설치

     - ```bash
       $ npm install mongoose
       + mongoose@5.12.10
       added 29 packages from 92 contributors and audited 84 packages in 3.932s
       
       2 packages are looking for funding
         run `npm fund` for details
       
       found 0 vulnerabilities
       ```

   - 설치 후 mongoose를 사용하기 위한 초기 환경 설정

     - 프로젝트 폴더에 있는 `bin > www` 파일 수정

     - `www` 파일에는 서버들을 설정할 때 필요한 코드들이 작성되어 있다.

     - www 파일

       - ```javascript
         /* 윗 내용 생략 */
         
         const mongoose = require("mongoose");
         const userConfig = require("../config/userConfig.json");
         
         let db = mongoose.connection;
         db.on("error", console.error);
         db.once("open", () => {
           console.log("Connected to mongo Server");
         });
         
         mongoose.connect(`
         	mongodb+srv://kahn:${userConfig.PW}@first.hrw2d.mongodb.net/First?retryWrites=true&w=majority`,
             { useNewUrlParser: true, useUnifiedTopology: true }
         );
         
         ```

         - 프로젝트 폴더 안에 `config` 폴더를 만들고 안에 `userConfig.json` 파일을 만들어서 
         - DB에 접근하기 위한 password에 대한 보안 관리를 할 수 있다.

       - ```json
         /* config > userConfig.json 파일 내용 */
         
         
         {
           "PW": "DB에 액세스 가능한 비밀번호"
         }
         
         ```

4. mongoose 스키마 소개 및 설정

   - NoSQL 장점: 데이터 입력 및 편집 시 제한이 없음

   - 그러나 서버 운영시에는 장점이 단점이 될 수 있다.

   - mongoose에서는 데이터의 타입을 정확히 설정해줌으로써 데이터 타입 혼동을 방지 

   - model 폴더를 만들어서 스키마를 관리한다.

   - model > location.js 파일

     - ```javascript
       const mongoose = require("mongoose");
       const Schema = mongoose.Schema;
       
       const locationSchema = new Schema({
         title: { type: String, required: true },
         address: { type: String, required: true },
         lat: { type: Number, required: true },
         lng: { type: Number, required: true },
       });
       
       /* 
         다른 파일에서도 location.js 파일을 사용할 수 있게 만들어주기 
         이 module을 exports 할 것인데, 
         "location"이라는 이름으로 locationSchema를 exports 한다.
       */
       module.exports = mongoose.model("location", locationSchema);
       
       ```



## 04. 업로드 기능 초기환경 구축

1. 카카오 api 발급 및 적용

   - 키워드 검색은 카카오 api가 더 성능이 좋다 (개인적인 생각)

   - `views > upload.ejs`

     - ```ejs
       <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>Document</title>
           <link rel="stylesheet" href="/stylesheets/upload.css" />
           <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e29cd12ac5520a132c39d5a5f8c684c4&libraries=services"></script>
         </head>
         <body>
           <ul id="navbar">
             <li>
               <a href="/">firstmap</a>
             </li>
             <li style="float: right">
               <a class="active" href="/upload">upload</a>
             </li>
           </ul>
           <div id="map" style="width: 100%; height: 100vh"></div>
       
           <script type="text/javascript" src="/javascripts/upload.js"></script>
         </body>
       </html>
       ```

   - `public > javascripts > upload.js`

     - ```javascript
       const mapContainer = document.getElementById("map");
       const mapOption = {
         center: new daum.maps.LatLng(37.554477, 126.970419),
         level: 3,
       };
       
       let map = new daum.maps.Map(mapContainer, mapOption);
       ```



2. 업로드 페이지 css 적용
   - `public > stylesheets > upload.css`

     - ```css
       body {
         padding: 0px !important;
         margin: 0px !important;
         font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
       }
       
       a {
         color: #00b7ff;
       }
       
       ul {
         list-style: none;
         margin: 0px;
         padding: 0px;
         overflow: hidden;
         background: #333;
         position: fixed;
         width: 100%;
         z-index: 1000;
       }
       
       li {
         float: left;
       }
       
       li a {
         display: block;
         color: white;
         text-decoration: none;
         text-align: center;
         padding: 14px 16px;
       }
       
       .active {
         background-color: green;
       }
       
       li a:hover:not(.active) {
         background-color: #111;
       }
       
       .info .body {
         position: relative;
         overflow: hidden;
       }
       
       .info .desc {
         position: relative;
         margin: 8px 0 0 90px;
         height: 75px;
         display: block;
       }
       
       .map_wrap,
       .map_wrap * {
         margin: 0;
         padding: 0;
         font-size: 12px;
       }
       
       #menu_wrap {
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         width: 200px;
         margin: 50px 0 30px 10px;
         padding: 5px;
         overflow-y: auto;
         background: rgba(255, 255, 255, 0.7);
         z-index: 1;
         font-size: 12px;
         border-radius: 10px;
       }
       
       #menu_wrap hr {
         display: block;
         height: 1px;
         border: 0;
         border-top: 2px solid #5f5f5f;
         margin: 3px 0;
       }
       
       #placesList .item {
         position: relative;
         border-bottom: 1px solid #888;
         overflow: hidden;
         cursor: pointer;
         width: 100%;
       }
       
       #placesList .item span {
         display: block;
         margin-top: 4px;
       }
       
       #placesList .item .info {
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
         padding: 20px;
       }
       
       #placesList .item .info_title {
         font_weight: bolder;
       }
       
       ```

3. 키워드 검색 데이터 받아오기

   - 앞서 만든 검색창에 키워드를 입력하고 검색을 눌렀을 때 결과값을 리스트로 받는다.

   - 리스트를 반복문으로 돌면서 마커를 지도 위에 표시한다.

   - `upload.ejs`에서 jQuery를 사용할 것이므로 이에 대한 명시를 해줘야 한다. (cdn으로 import)

   - cdn: jQeury 등과 같은 라이브러리를 다운로드 받지 않고도 URL을 통해서 라이브러리들을 사용할 수 있게 만들어주는 네트워크

   - upload.ejs와 index.ejs 파일에 import 해준다.

   - `public > javascripts > upload.js`

     - ```javascript
       const mapContainer = document.getElementById("map");
       const mapOption = {
         center: new daum.maps.LatLng(37.554477, 126.970419),
         level: 3,
       };
       
       let map = new daum.maps.Map(mapContainer, mapOption);
       
       /* 인포 윈도우 */
       let infowindow = new daum.maps.InfoWindow({
         zIndex: 1, // 지도 보다 인포 윈도우가 위에 띄워지도록 설정
       });
       
       let markerList = [];
       
       /* 키워드 검색 */
       let ps = new daum.maps.services.Places();
       
       searchPlaces(); // keywords를 받고 검색하는 함수
       
       function searchPlaces() {
         /* 
           함수를 위에서 먼저 호출하고 밑에 작성하는 이유 
           Arrow Function(화살표 함수)로 만든다면 함수 정의가 먼저 되어야 한다.
           여기서는 ES6+ 최신 문법인 화살표 함수보다 기존 function 문법을 사용해본다.
         */
       
         let keyword = $("#keyword").val(); // jQuery 문법: id가 keyword인 태그 안의 텍스트 값 리턴
         ps.keywordSearch(keyword, placesSearchCallBack); // ps 객체가 갖고 있는 keywordSearch 함수를 실행하고, 인자로 받은 keyword를 바탕으로 검색을 한 후, 검색 결과를 PlacesSerchCallBack이라는 함수를 통해 콜백
       }
       
       function placesSearchCallBack(data, status) {
         // 파라미터의미 -> data: 검색한 결과값, status: 결과값을 반환에 관한 서버의 상태
         if (status === daum.maps.services.Status.OK) {
           console.log(data);
         } else if (status === daum.maps.services.Status.ZERO_RESULT) {
           alert("검색 결과가 존재하지 않습니다.");
           return;
         } else if (status === daum.maps.services.Status.ERROR) {
           alert("검색 결과중 오류가 발생했습니다.");
           return;
         }
       }
       
       ```

       - upload.ejs 파일의 form 태그에 있는 `onsubmit` 속성에 
         `searchPlaces(); return false`를 넣어준다.
       - form 태그에서 제출 버튼을 누르면 upload.js 파일에서 정의한 
         searchPlaces 함수를 실행 하겠다는 의미
       - return false 부분은 함수 실행후 페이지 리로드가 없도록 설정하는 부분

4. 키워드 검색 데이터 지도 위에 표시하기

   - `upload.js` 파일 참고하기

5. 검색 데이터 초기화 하기

   - `upload.js` 파일 참고하기

## 05. 업로드 기능 마무리

1. Postman 소개 및 설치 / 테스트 해보기

   - Postman: 서버 통신 프로그래밍 전, 좀 더 간편하게 요청하고 확인할 수 있는 툴

   - Postman은 URL request를 쉽게 할 수 있게 해준다.

   - 실제 프로젝트에서 서버 통신을 하기 전에 Postman으로 테스트 해볼 수 있다.

   - [설치](https://www.postman.com/downloads/) 후 실행해보기

   - SSAFY에서 실습한다고 계정 만들어둔 거 있으니까 그거 활용 (구글 계정 로그인)

   - get 메소드 post 메소드 차이

     - get과 달리 post는 데이터를 body에 담아 보내게 되고, request에 body가 담겨서 전달 받기 때문에 조금 더 철저한 보안을 구축할 수 있다. 데이터를 주고 받을 때는 post 메소드를 쓰는 것이 유리

   - `routes > index.js`

     - ```javascript
       /* Server 통신 (1) - get */
       router.get("/test", (req, res, next) => {
         console.log("테스트 완료");
         res.json({
           message: "response 완료",
         });
       });
       
       /* Server 통신 (2) - post */
       router.post("/test2", (req, res, next) => {
         // 많은 요청이 있을 때 비구조화 할당 문법 사용
         const { test, test2 } = req.body;
         console.log(test);
         console.log(test2);
         res.json({
           message: "post 완료",
         });
       });
       ```

2. 지도 서비스 업로드 서버 구축하기

   - 이전에 `location`에 작성한 스키마를 바탕으로 mongoose를 이용해 DB에 데이터 저장한다.
   - 실제 DB와 통신하는 router를 만들고 postman으로 post 요청을 보낸 후,
   - Mongo DB Compass에서 확인하면 postman을 통해 데이터가 DB에 잘 저장된 것을 확인할 수 있다.

3. 좌표 데이터 MongoDB에 저장하기

   - 인포 윈도우에서 해당 마커의 등록 버튼을 눌렀을 때, 데이터가 Mongo DB에 저장되게 한다.

   - `upload.js`

     - ```javascript
       function displayInfowindow(marker, place_name, address_name, lat, lng) {
         let content = `
           <div style="padding: 25px;">
             ${place_name}<br>
             ${address_name}<br>
             <button onClick="onSubmit('${place_name}', '${address_name}', ${lat}, ${lng})">등록</button>
           </div>
         `;
       
         map.panTo(marker.getPosition());
         infowindow.setContent(content);
         infowindow.open(map, marker);
       }
       ```

     - ```javascript
       function onSubmit(title, address, lat, lng) {
         // 서버에 데이터를 넘길 수 있도록 요청하는 jQuery 문법 중 Ajax
         $.ajax({
           url: "/location",
           data: { title, address, lat, lng },
           type: "POST",
         })
           .done((response) => {
             // ajax 요청이 잘 마무리 되면 done() 실행
             console.log("데이터 요청 성공!");
             alert("성공!");
           })
           .fail((error) => {
             // ajax 요청이 실패하면 fail() 실행
             console.log("데이터 요청 실패");
           });
       }
       ```

4. 지도 위에 저장한 데이터 표시하기

   - MongoDB에 저장되어 있는 위치 정보를 메인 페이지에 띄워본다.
   - `main.js`와 `routes > index.js` 파일 바뀐 부분 확인



## 06. 마커 클러스터링 기능 구현

1. 마커 클러스터링 소개

   - 데이터가 많아지면 지도 서비스가 느려질 가능성이 조금 있다.

   - 겹쳐있는 다수의 마커들을 한 곳으로 모아줌으로써 최적화 -> 클러스터링!
2. 마커 클러스터링 기능 구현
   - [깃허브 레포 소스](https://github.com/navermaps/marker-tools.js/blob/master/marker-clustering/src/MarkerClustering.js) 가져다 쓰기
   - javascripts 폴더 아래에 MarkerClustering.js 파일을 만들어서 복사
   - index.ejs 파일에서 불러온다. 단, main.js 파일을 부르는 위치보다 위에서 불러온다.
     왜냐하면, main.js 파일에서 MarkerClustering.js의 기능을 사용할 것이기 때문에
   - main.js의 ajax.done((response) => {`여기`})에다가 작성한다.
   - 클러스터 css도 변경

## 07. 행정구역(도) 데이터 레이어 표시

1. 행정구역 데이터 레이어 소개 및 표시하기
   - 
2. 행정 구역 데이터 레이어 클릭 / 마우스 이벤트 추가하기


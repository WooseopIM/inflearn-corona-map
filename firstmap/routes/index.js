var express = require("express");
var router = express.Router();
const locationModel = require("../model/location");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET upload page. */
router.get("/upload", (req, res, next) => {
  res.render("upload");
});

/* 실제 DB와 통신 */
router.post("/location", (req, res, next) => {
  const { title, address, lat, lng } = req.body;
  let location = new locationModel(); // location 안에 데이터를 넣을 수 있다.
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;

  /* 
    Mongo DB에 저장하기
    비동기적으로 동작하는 location.save();  
    설정한 location이 언제 저장되는지 알 수가 없다. 
    response가 정확이 이루어지지 않을 가능성 존재한다는 의미.
    ES6+에서 제공하는 promise 문법으로 저장이 끝난 다음에 response를 받도록 할 수 있다.
  */

  location
    .save()
    .then((result) => {
      // save()가 되고난 후에 result를 반환하고 result를 바탕으로 콘솔에 로그를 남긴다.
      console.log(result);
      res.json({
        message: "저장 성공!",
      });
    })
    .catch((error) => {
      // 서버에서 에러가 발생하면 catch() 구문이 실행된다.
      console.log(error);
    });
});

router.get("/location", (req, res, next) => {
  // MongoDB 데이터를 가져오는 방법
  locationModel
    .find({}, { _id: 0, __v: 0 })
    .then((result) => {
      console.log(result);
      res.json({
        message: "성공!",
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        message: "실패ㅠ.ㅠ",
      });
    });
});

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

module.exports = router;

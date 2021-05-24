const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

/* 
  다른 파일에서도 location.js 파일을 사용할 수 있게 만들어주기 
  이 module을 exports 할 것인데, 
  "location"이라는 이름으로 locationSchema를 exports 한다.
*/
module.exports = mongoose.model("location", locationSchema);

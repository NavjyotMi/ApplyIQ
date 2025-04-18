const { Router } = require("express");
const uploads = require("../Middleware/multer.middleware");
const { resumeParser } = require("../Controller/resume.controller");

const route = Router();

route.post("/resume", uploads.single("resume"), resumeParser);
// route.post("/resume", () => {
//   console.log("hellot there");
// });

module.exports = route;

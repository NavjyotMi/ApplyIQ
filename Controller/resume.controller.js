const fs = require("fs");
const pdf = require("pdf-parse");
const { regexParsed } = require("../Utils/regExParsing");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

module.exports.resumeParser = async (req, res) => {
  try {
    console.log("this is hit");
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdf(dataBuffer);
    let parsedText = regexParsed(pdfData.text);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log(parsedText);
    res.status(200).json({
      message: "safl",
    });
  } catch (error) {}
};

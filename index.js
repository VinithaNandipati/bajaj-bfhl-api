const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Your details
const FULL_NAME = "vinitha_reddy";
const DOB = "17091999"; // Replace with your DOB in ddmmyyyy
const EMAIL = "vinitha@example.com";
const ROLL_NUMBER = "ABCD123";

// Helper functions
const isNumeric = (str) => /^[0-9]+$/.test(str);
const isAlphabet = (str) => /^[a-zA-Z]+$/.test(str);
const generateAlternatingCaps = (alphabets) => {
  const chars = alphabets.join("").split("").reverse();
  return chars
    .map((ch, idx) =>
      idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    )
    .join("");
};

// ✅ Default GET Route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the BFHL API! Use POST /bfhl to test.");
});

// POST API
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach((item) => {
      if (isNumeric(item)) {
        if (parseInt(item) % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += parseInt(item);
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatString = generateAlternatingCaps(alphabets);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

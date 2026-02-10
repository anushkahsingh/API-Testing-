require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const EMAIL = "anushka0122.be23@chitkara.edu.in";
const GEMINI_KEY = process.env.GEMINI_API_KEY;

/* Health check */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* Utility functions */
function fibonacci(n) {
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series.slice(0, n);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

/* Main API */
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Exactly one operation is required"
      });
    }

    const key = keys[0];
    let result;

    if (key === "fibonacci") {
      if (!Number.isInteger(body.fibonacci) || body.fibonacci <= 0) {
        throw new Error();
      }
      result = fibonacci(body.fibonacci);
    }

    else if (key === "prime") {
      if (!Array.isArray(body.prime)) throw new Error();
      result = body.prime.filter(n => Number.isInteger(n) && isPrime(n));
    }

    else if (key === "lcm") {
      if (!Array.isArray(body.lcm)) throw new Error();
      result = lcm(body.lcm);
    }

    else if (key === "hcf") {
      if (!Array.isArray(body.hcf)) throw new Error();
      result = hcf(body.hcf);
    }

    else if (key === "AI") {
      if (typeof body.AI !== "string" || !GEMINI_KEY) {
        throw new Error();
      }

      const aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: body.AI }] }]
          })
        }
      );

      if (!aiResponse.ok) throw new Error();

      const aiData = await aiResponse.json();
      const text = aiData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error();

      // Clean the response and return only the final word
      const cleaned = text.replace(/\*\*/g, "").trim();
      const words = cleaned.split(" ");
      result = words[words.length - 1].replace(/[^\w]/g, "");
    }

    else {
      throw new Error();
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result
    });

  } catch {
    res.status(400).json({
      is_success: false,
      official_email: EMAIL,
      error: "Invalid request"
    });
  }
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

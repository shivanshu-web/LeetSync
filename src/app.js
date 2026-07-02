const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Root Route");
});

app.post("/submission", (req, res) => {

    // Validation
    if (!req.body.title) {
        return res.json({ success: false, message: "Title is required" });
    }

    if (!req.body.language) {
        return res.json({ success: false, message: "Language is required" });
    }

    if (!req.body.code) {
        return res.json({ success: false, message: "Code is required" });
    }

    if (!req.body.difficulty) {
        return res.json({ success: false, message: "Difficulty is required" });
    }

    const { title, language, difficulty, code } = req.body;

    // Create folders so ".." is tells that one folder up and create 
    const solutionPath = path.join(__dirname, "..", "solutions");
    const languagePath = path.join(solutionPath, language);
    const difficultyPath = path.join(languagePath, difficulty);

    if (!fs.existsSync(solutionPath)) {
        fs.mkdirSync(solutionPath);
    }

    if (!fs.existsSync(languagePath)) {
        fs.mkdirSync(languagePath);
    }

    if (!fs.existsSync(difficultyPath)) {
        fs.mkdirSync(difficultyPath);
    }

    // Decide file extension
    let extension = ".txt";

    if (language === "Java") extension = ".java";
    else if (language === "Python") extension = ".py";
    else if (language === "C++") extension = ".cpp";
    else if (language === "JavaScript") extension = ".js";

    // Create file
    const filePath = path.join(
        difficultyPath,
        `${title}${extension}`
    );

    // Write code
    fs.writeFileSync(filePath, code);
 
    // run commands 
    exec("git add .",{cwd: path.join(__dirname,"..")}
, (error , stdout, stderr) =>{
    if(error){
        return res.json(
            {
                "Success": false,
                "message": "git add fail"
            }
        )
    }
    console.log("add successfully")

});

    return res.json({
        success: true,
        message: "Submission saved successfully."
    });
});







app.get("/git", (req, res) => {
    exec("git status", (error, stdout, stderr) => {
        console.log(stdout);
    });

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
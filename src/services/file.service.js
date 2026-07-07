const fs = require("fs");
const path = require("path");

function createSolutionFile({ title, language, difficulty, code }) {

    const basePath = path.join(__dirname, "..", "..", "solutions");

    const langPath = path.join(basePath, language);
    const diffPath = path.join(langPath, difficulty);

    fs.mkdirSync(diffPath, { recursive: true });

    let ext = ".txt";
    if (language === "Java") ext = ".java";
    else if (language === "Python") ext = ".py";
    else if (language === "C++") ext = ".cpp";
    else if (language === "JavaScript") ext = ".js";

    const filePath = path.join(diffPath, `${title}${ext}`);
    // for check duplication of file 
    const fileExist = fs.existsSync(filePath);
    if(fileExist){
        return {
            success:false,
            message:"Already submitted"
            
        }
    }

    fs.writeFileSync(filePath, code);

    return filePath;
}

module.exports = { createSolutionFile };
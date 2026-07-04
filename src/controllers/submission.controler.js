const { createSolutionFile } = require("../services/file.service");
const { gitAutomation } = require("../services/git.service");

async function submitSolution(req, res) {

    const { title, language, difficulty, code } = req.body;

    if (!title || !language || !difficulty || !code) {
        return res.status(400).json({
            success: false,
            message: "Missing fields"
        });
    }

    createSolutionFile({ title, language, difficulty, code });

    await gitAutomation(`Solved ${title} (${language})`);

    res.json({
        success: true,
        message: "Saved + pushed successfully"
    });
}

module.exports = { submitSolution };
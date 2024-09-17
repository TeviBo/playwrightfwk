const fs = require("fs-extra")

try{
    fs.ensureDir("reports/test-results")
    fs.emptyDir("reports/test-results")
} catch(error){
    console.log("Folder not created !", error)
}
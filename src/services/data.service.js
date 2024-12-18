const fs = require("fs");
const path = require("path");

function loadJSONFiles(directory) {
  let dataToSearch = [];
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const rawData = fs.readFileSync(filePath, "utf8");
    try {
      const jsonData = JSON.parse(rawData);
      if (jsonData.CVE_Items) {
        dataToSearch.push(...jsonData.CVE_Items);
      }
    } catch (error) {
      throw new Error(error);
    }
  });
  return dataToSearch;
}

async function searchTerm(payload) {
  try {
    const dataPath = path.join(__dirname, "../../data");
    let dataToSearch = await loadJSONFiles(dataPath);

    return payload.map(term => {
      let response = [];
      dataToSearch.forEach(item => {
        const nodes = item?.configurations?.nodes || [];

        nodes.forEach(node => {
          node.cpe_match.forEach(element => {
            if (element.vulnerable && element.cpe23Uri.includes(term)) {
              response.push(item.cve.CVE_data_meta.ID);
            }
          });
        });
      });

      return response.slice(0, 10);
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { searchTerm };

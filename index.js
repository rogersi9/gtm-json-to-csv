function extractEventParams(params){
  let result = ""
  params.forEach((param) => {
    result += param.map[0].value + ",";
  })
  return result
}

function getParameter(params){
  let result = ""
    params.forEach((param)=>{
      if(param.key==="eventParameters"){
         result = extractEventParams(param.list)
      }
    })
    return result
  }

  function readJSONFile(){
    let json = require('./gtm.json'); //with path
    return json; 
  }

  function getTriggerNames(triggers, ids){
    let result = []
    ids.forEach((id)=>{
      triggers.forEach((trigger)=>{
        if(trigger.triggerId === id) result.push({name: trigger.name, type: trigger.type})
      })
    })
    return result
  }

  function formatTag(tag, triggers){
    let params = getParameter(tag.parameter)
    let triggerNames = getTriggerNames(triggers,tag.firingTriggerId)
    return {
      name: tag.name,
      parameter: params, 
      triggers: triggerNames
    }
  }

  function gtmToCsv(file){
      let shortTags = [];
      let json = file;
      let tags = json.containerVersion.tag;
      let triggers = json.containerVersion.trigger;
      tags.forEach((tag) => {
        shortTags.push(formatTag(tag, triggers))
      })
      console.log(shortTags)
      return shortTags
  }
  
  
  const fileInput = document.getElementById('file-input');
  const jsonDisplay = document.getElementById('json-display');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      const newJson = gtmToCsv(json)
      jsonToCsv(newJson);
      jsonDisplay.innerHTML = JSON.stringify(newJson, null, 2);
    };
  });

function jsonToCsv(json){
  jsonData = json
  const csvHeader = "name, triggers_name, parameters\n";

  // Define a function to format the triggers data as a string
  function formatTriggers(triggers) {
    const triggerStrs = triggers.map(trigger => trigger.name);
    return '"'+triggerStrs.join("\n")+'"';
  }
  
  // Define a function to format the CSV row for a single JSON object
  function jsonToCsvRow(jsonObj) {
    const name = jsonObj.name;
    const triggers = formatTriggers(jsonObj.triggers);
    const parameters = jsonObj.parameter.replace(/,/g, '|'); // Replace commas with pipes
    
    return `${name},${triggers},${parameters}\n`;
  }
  
  // Convert each JSON object to a CSV row
  let csvData = csvHeader;
  for (const jsonObj of jsonData) {
    csvData += jsonToCsvRow(jsonObj);
  }
  
  downloadCsv(csvData); // Print the CSV data to the console
}

function downloadCsv(csvData){
const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

// Create a download link for the CSV file
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "data.csv";

// Programmatically click the download link to download the CSV file
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

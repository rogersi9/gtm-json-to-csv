// Function to extract event parameters
function extractEventParams(params) {
  let result = "";
  if (!params) return result; // Check if params is undefined or null
  params.forEach((param) => {
    if (param?.map?.[0]?.value) { // Check if map exists and has a value
      result += param.map[0].value + ",";
    }
  });
  return result;
}

// Function to get specific parameters from the JSON
function getParameter(params) {
  let result = "";
  if (!params) return result; // Check if params is undefined or null
  params.forEach((param) => {
    if (param.key === "eventParameters") {
      result = extractEventParams(param.list || []); // Fallback to empty array if list is undefined
    }
  });
  return result;
}

// Function to retrieve trigger names from the JSON
function getTriggerNames(triggers, ids) {
  let result = [];
  if (!ids || !triggers) return result; // Check if ids and triggers exist
  ids.forEach((id) => {
    triggers.forEach((trigger) => {
      if (trigger.triggerId === id) {
        result.push({ name: trigger.name, type: trigger.type });
      }
    });
  });
  return result;
}

// Function to format the tag
function formatTag(tag, triggers) {
  let params = getParameter(tag.parameter || []); // Ensure tag.parameter is an array or empty array
  let triggerNames = getTriggerNames(triggers, tag.firingTriggerId || []); // Ensure firingTriggerId exists
  return {
    name: tag.name,
    parameter: params,
    triggers: triggerNames,
  };
}

// Function to process the JSON and convert to CSV data
function gtmToCsv(file) {
  let shortTags = [];
  let json = file;
  let tags = json?.containerVersion?.tag || []; // Ensure containerVersion.tag is an array
  let triggers = json?.containerVersion?.trigger || []; // Ensure containerVersion.trigger is an array
  tags.forEach((tag) => {
    shortTags.push(formatTag(tag, triggers));
  });
  return shortTags;
}

// Convert the JSON data to CSV and prompt for download
function jsonToCsv(jsonData) {
  const csvHeader = "name,triggers_name,parameters\n";

  // Function to format the triggers
  function formatTriggers(triggers) {
    const triggerStrs = triggers.map((trigger) => trigger.name);
    return `"${triggerStrs.join("\n")}"`;
  }

  // Function to format a single row in the CSV
  function jsonToCsvRow(jsonObj) {
    const name = jsonObj.name;
    const triggers = formatTriggers(jsonObj.triggers);
    const parameters = jsonObj.parameter.replace(/,/g, "|"); // Replace commas with pipes
    return `${name},${triggers},${parameters}\n`;
  }

  // Create CSV string
  let csvData = csvHeader;
  for (const jsonObj of jsonData) {
    csvData += jsonToCsvRow(jsonObj);
  }

  // Trigger the CSV download
  downloadCsv(csvData);
}

// Function to download the CSV file
function downloadCsv(csvData) {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a download link for the CSV file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";

  // Programmatically click the download link to download the CSV file
  link.click();
}

// File input handler
const fileInput = document.getElementById('file-input');
const jsonDisplay = document.getElementById('json-display');
const downloadButton = document.getElementById('download-csv');
let processedJson = null;

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = (event) => {
    const json = JSON.parse(event.target.result);
    const newJson = gtmToCsv(json);
    processedJson = newJson;
    // jsonDisplay.innerHTML = JSON.stringify(newJson, null, 2);
    
    // Show the download button once processing is done
    downloadButton.style.display = "block";
  };
});

// Download button handler
downloadButton.addEventListener('click', () => {
  if (processedJson) {
    jsonToCsv(processedJson);
  }
});

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
  
  function gtmToCsv(){
      let json = require('./gtm.json'); //with path
      let tags = json.containerVersion.tag;
      let shortTags = [];
      tags.forEach((tag) => {
        let params = getParameter(tag.parameter)
        shortTags.push({
          name: tag.name,
          parameter: params, 
          triggers: tag.firingTriggerId
        })
      })
      return shortTags
  }
  
  console.log(gtmToCsv())

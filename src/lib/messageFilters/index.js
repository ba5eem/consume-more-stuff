function filterItemMsg(arr,query){
  let local = {image: "http://via.placeholder.com/350x150"}
  const data = arr.filter((elem) => {
    return elem.id === query;
  });
  let obj = data.pop();
  local.image = (arr.length !== 0 ? obj.image : "http://via.placeholder.com/350x150")
    Object.entries(local).forEach(([key, value]) => {
      local.image = value;
    //console.log(`${key} ${value}`); 
    });
    local.name = (arr.length !== 0 ? obj.name : null)
    local.desc = (arr.length !== 0 ? obj.description : null)
    local.price = (arr.length !== 0 ? obj.price : null)

  return local;
}


export default filterItemMsg;

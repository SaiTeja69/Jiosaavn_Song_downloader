const lol = require('./index')

lol.getLink("kadallale",(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
})
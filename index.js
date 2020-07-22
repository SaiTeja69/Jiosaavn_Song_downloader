const fetch = require("node-fetch");
const API = require("./constants")
function getID(query,cb){
    fetch(API.API_FIRST+query, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }}).then(response =>response.text()).then(response => {
                        response=response.slice(response.indexOf('{'))
                        response=JSON.parse(response)
                        cb(false,response.albums.data)
                    }).catch(err => {
                        cb(true,null)
                        console.error(err)
                    });

}

function getUrl(id,cb){
    fetch(API.API_SECOND+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }}).then(response =>response.text()).then(response => {
            response=response.slice(response.indexOf('{'))
            response=JSON.parse(response)
            //console.log(response.songs[0].media_preview_url)
            cb(false,response.songs[0].media_preview_url)
        }).catch(err => {
            cb(true,null)
            //console.error(err)
        });
}

function getLink(query,cb){
    getID(query,(err,data)=>{
        if(err){
            //console.log(err)
        }
        else{
            //console.log(data[0].id)
            getUrl(data[0].id,(err,data)=>{
                if(err){
                    cb(true,null)
                }
                else{
                    data = data.replace("preview", "aac");
                    data = data.replace("96_p.mp4", "320.mp4");
                    cb(false,data)
                }
            })
        }
    })
    
}

module.exports={
    getLink : getLink
}
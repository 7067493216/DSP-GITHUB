
let x = [
    {"fileId":1001,"name":"firstFile"},
    {"fileId":1004,"name":"fourthFile"},
]
let y = [
    {"fileId":1001,"name":"firstFile","docStatus":null},
    {"fileId":1002,"name":"secondfile","docStatus":null},
    {"fileId":1003,"name":"thirdfile","docStatus":null},
    {"fileId":1004,"name":"fourthFile","docStatus":null},
    {"fileId":1005,"name":"fifthfile","docStatus":null},
    {"fileId":1006,"name":"sixthfile","docStatus":null},
]

let s=[]
for(let i=0;i<y.length;i++){
    for(let j=0;j<x.length;j++){
        if(y[i].fileId==x[j].fileId && y[i].docStatus==null){
           y[i].docStatus=3
        }
    }
}

for(let k=0; k<y.length;k++){
    if(y[k].docStatus==null){
        y[k].docStatus=2
        
    }
    s.push(
        {
            "docFileId":y[k].fileId,
            "docStatus":y[k].docStatus
        }
    )
}

console.log(y,"yyyyyyyyyyyyyyy",s);
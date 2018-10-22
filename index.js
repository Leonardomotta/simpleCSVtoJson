const fs = require("fs");
csvTojson= {}

const remove_bars = function(x){ 
x = x.replaceAll("\\N","null")
x = x.replaceAll(";",",")
x = x.replaceAll("\r","")




return x.split("\n");}

const get_cols = function(x){
    let aux = []
    for(let i of x){
        
        
        i.split(",")
        
        aux.push(i)
    }
    
    return aux;}

csvTojson.Tojson= (path)=>{

        x = fs.readFileSync(path,"utf8");
        x =  remove_bars(x);
        x = get_cols(x)
        let colunas = x[0].split(",");
        x= parse(x,colunas)
        
        return JSON.parse(x)
        

}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let parse = (x,colunas)=>{
    
    //
    opa = x.map((valor,indice,array)=>{
       if(indice !=0 && indice!= array.length-1){
       let aux =  (valor.split(",").map((v1,i1,a1)=>{

            o= (`"${colunas[i1]}"`+ ":"+`"${v1}"`).replaceAll('"""','"')
            o = o.replaceAll('""','"')
            o = o.replaceAll('"undefined":','')
            o = o.replace('"["','["');
            o = o.replace('"]"','"]');
            
            return o
        })).join(",")
        let aux2 = `{${aux}}`
        console.log(aux2)
        return aux2
    }})
    
    //remove elementos do tipo fined do array
    opa = opa.filter((i)=>{
        return i !== undefined
    })
    // retorna uma string sem /r 
    return buffer(opa);
}
    
let buffer = (opa)=>{
        y = ""
        for(i of opa){
    
            for(let k of i){if(k !== "\r" && k!=="\N" && k!=="\\N"){y += k;}}
            
            y += ","}
        y = '['+y+']'
        y = y.replaceAll(",]","]")
        return y}




csvTojson.csvWriteTojson =(pathDest,pathCsv)=>{
    fs.writeFileSync(pathDest,JSON.stringify(csvTojson.Tojson(pathCsv)))
}

csvTojson.jsonToCsv = (json)=>{

    if(json instanceof Array){
       r = csvParseArray(json)
    }

    else {
      r = csvParse(json)
    }

    return r;
}


csvParseArray = json =>{
    keys = Object.keys(json[0])
    aux = ""
    k = json.map((value,index,array)=>{
        x = Object.values(value);
        return x.join(";");})

    return keys.join(";")+"\n"+ k.join("\n")
}
csvParse = json =>{

    keys = Object.keys(json);
    k =  Object.values(json);
    return keys.join(";")+"\n"+ k.join(";")

}


csvTojson.jsonWritecsv = (path,json)=>{
    dado = csvTojson.jsonToCsv(json)
    fs.writeFileSync(path,dado)
}










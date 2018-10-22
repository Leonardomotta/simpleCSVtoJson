//Dependencias
const fs = require("fs");
const helpers = require('./helpers')


//Container
csvTojson= {}


//Recebe o caminho para o arquivo csv e retorna o objeto json
csvTojson.Tojson= (path)=>{
    
    x = fs.readFileSync(path,"utf8");
    x =  helpers.remove_bars(x);
    x = helpers.get_cols(x)
    let colunas = x[0].split(",");
    x= helpers.parse(x,colunas)
    
    return JSON.parse(x)
}

//Recebe o caminho para o arquivo de destino .json e o caminho para o csv
//ele converte o csv para json e salva no caminho de destino
csvTojson.csvWriteTojson =(pathDest,pathCsv)=>{
    fs.writeFileSync(pathDest,JSON.stringify(csvTojson.Tojson(pathCsv)))
}


// recebe um arquivo json uma string de formato csv
csvTojson.jsonToCsv = (json)=>{
    
    if(json instanceof Array){r = helpers.csvParseArray(json)}
    else {r = helpers.csvParse(json)}
    
    return r;
}

// recebe o json e escreve no path o arquivo em csv
csvTojson.jsonWritecsv = (path,json)=>{
    dado = csvTojson.jsonToCsv(json)
    fs.writeFileSync(path,dado)
}




// metodo utilitario pendurado ao tipo string , faz replace de todos os objetos , ao inves de um unico
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


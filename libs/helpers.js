helpers={}

//faz parse de barras presentes em alguns tipos de csv
helpers.remove_bars = function(x){ 
    x = x.replaceAll("\\N","null")
    x = x.replaceAll(";",",")
    x = x.replaceAll("\r","")
    return x.split("\n");}

// separa por colunas a string do csv
helpers.get_cols = function(x){
    let aux = []
    for(let i of x){
        i.split(",")
        aux.push(i)
    }
    return aux;}
//gera uma string pronta para ser convertida para json
helpers.parse = (x,colunas)=>{
    
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
    return helpers.buffer(opa);
}

// concatena letra por letra 
helpers.buffer = (opa)=>{
    y = ""
    for(i of opa){

        for(let k of i){if(k !== "\r" && k!=="\N" && k!=="\\N"){y += k;}}
        
        y += ","}
    y = '['+y+']'
    y = y.replaceAll(",]","]")
    return y}

// metodo auxiliar caso o json seja um array retorna uma string 
// em formato csv
helpers.csvParseArray = json =>{
        keys = Object.keys(json[0])
        aux = ""
        k = json.map((value,index,array)=>{
            x = Object.values(value);
            return x.join(";");})
    
        return keys.join(";")+"\n"+ k.join("\n")
    }
// metodo auxiliar caso o json seja composto de um unico objeto retorna uma string 
// em formato csv
helpers.csvParse = json =>{
    
        keys = Object.keys(json);
        k =  Object.values(json);
        return keys.join(";")+"\n"+ k.join(";")
    
    }

module.exports= helpers;
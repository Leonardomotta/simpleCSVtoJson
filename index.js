const fs = require("fs");
csvTojson= {}

const remove_bars = function(x){return x.split("\n");}
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
        return JSON.parse(parse(x,colunas))
        

}

let parse = (x,colunas)=>{
    
    //
    opa = x.map((valor,indice,array)=>{
       if(indice !=0 && indice!= array.length-1){
       let aux =  (valor.split(",").map((v1,i1,a1)=>{
            return `"${colunas[i1]}":"${v1}"`
        })).join(",")
        let aux2 = `{${aux}}`
        return aux2
    }})
    
    //remove elementos do tipo undefined do array
    opa = opa.filter((i)=>{
        return i !== undefined
    })
    
    // retorna uma string sem /r 
    return buffer(opa);
}
    
let buffer = (opa)=>{
        y = ""
        for(i of opa){
            for(let k of i){if(k !== "\r"){ y += k;}}
            y += ","
        }
        y = '['+y+']'
        y = y.replace(",]","]")
        return y}




fs.writeFileSync('./to.json',JSON.stringify(csvTojson.Tojson("./convertcsvComrep.csv")))









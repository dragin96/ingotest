function add(a,b){
    a=String(a);
    b=String(b);
    return a+b;
}
function minus(a,b){
    a=String(a);
    b=String(b);
    res=a;
    for(i=0;i<b.length;i++){
        if(a[a.length-1-i]==b[b.length-1-i]){
            res=res.slice(0,res.length-1);
            console.log(res);
        }
        else{
            console.log("Выход "+res);
            return a;
            break;
        }
    }
    return res;
}

function umn(a,b){
    a=String(a);
    b=String(b);
    res="";
    num=(a.length>=b.length)?a.length:b.length;
    for(i=0;i<num;i++){
        flag=(typeof b[i] != "undefined")&&(typeof a[i] != "undefined")
        if(flag){
            res=res+a[i]+b[i];
            console.log(res);
        }
        //проверка на переполнения масива
        if(typeof b[i] == "undefined"){
            res=res+a[i];
        }
        if(typeof a[i] == "undefined"){
            res=res+b[i];
        }
    }
    return res;
}

function del(a,b){
    a=String(a);
    b=String(b);
    res="";
    index=1;
    num=(a.length>=b.length*2)?a.length:0;
    if(num){
        dopA=a.slice(b.length*2,a.length)
        a=a.slice(0,b.length*2);
        for(i = 0; i<a.length; i++){
            if((i<b.length)&&(i)){
                index = index + 2;
                console.log(a[index],b[i]);
                if(a[index]==b[i]){
                    res=res + a[index-1];
                    console.log(res);
                }
                if(a[index]!=b[i]){
                    res=a+dopA;
                    console.log(res);
                    return res;
                }
            }
            if(i>=b.length){
                res=res+dopA;
                return res;
            }   
            if(!i){
                res= (a[1]==b[i])?a[0]:"";
                console.log("i=0 "+res);
                if((typeof a[3]== "undefined")){
                    res = res+dopA;
                    break;
                }
                if(!res){
                    break;
                    res = a+dopA;
                }
            }
        }
    }
    if(!num){
        return a;
    }
    return res;
}


function parser(str){
    var stec = [],
    post = [],
    inf = str,
    i = 0,
    status = 2,
    tmpStr="";
    while(status==2){
        first=(stec.length)?stec[stec.length-1]:"0";
        if(typeof inf[i]!= "undefined"){
                if((!inf[i].match(/(\*|-|\+|\/|\(|\))/g))){//проверка что это не спец символ 
                    tmpStr = tmpStr + inf[i];
                    if((i+1==inf.length)||(inf[i+1].match(/(\*|-|\+|\/|\(|\))/g))){//след знак спец символ
                        post.push(tmpStr);
                        tmpStr="";
                    }
                    i++;
                }
                else if(inf[i].match(/(\+|-)/)){//если + или -
                    if(first=="0" || first=="("){//пустой стек или скобка (
                        stec.push(inf[i]);
                        first = (stec.length)?stec[stec.length-1]:"0";;
                        i++;
                    }
                    else if(first=="+" || first=="-" || first=="*" || first=="/"){//первый элемент стека  что то из действийй
                        post.push(first);
                        stec.pop();
                        first=(stec.length)?stec[stec.length-1]:"0";
                    }
                }
                else if(inf[i].match(/(\/|\*)/)){//деление или умножение 
                    if(first=="0" || first=="(" || first=="+" || first=="-"){//
                        stec.push(inf[i]);
                        first = (stec.length)?stec[stec.length-1]:"0";
                        i++;               
                    }
                    else if(first=="*" || first=="/"){
                        post.push(first);
                        stec.pop();
                        first=(stec.length)?stec[stec.length-1]:"0";
                    }
                }
                else if(inf[i]=="("){
                    stec.push(inf[i]);
                    first = (stec.length)?stec[stec.length-1]:"0";
                    i++;
                }
                else if(inf[i]==")"){ 
                    if(first=="0") status=0;//ошибка в скобках
                    else if(first=="+" || first=="-" || first=="*" || first=="/"){
                        post.push(first);
                        stec.pop();
                        stec.splice(stec.indexOf('('),1);
                        first=(stec.length)?stec[stec.length-1]:"0";
                        i++;
                    }
                    else if(first=="("){
                        stec.push(inf[i]);
                        first = (stec.length)?stec[stec.length-1]:"0";;
                        i++;
                    }
                }
            }
        if(i==inf.length){
            if(first=="0") status=1; 
            else if(first=="+" || first=="-" || first=="*" || first=="/"){
                post.push(first);
                stec.pop();
                first=(stec.length)?stec[stec.length-1]:"0";
            }
            else if(first=="("){
               status=0
           };
       }
   }
       if(status==1){
        return post
    };
}


function culc(post){
    stec = [];
    for(var i = 0; i<post.length;i++){
        if(!post[i].match(/(\*|-|\+|\/)/g)){//не знаки
            stec.push(post[i]);
        }
        else if(post[i] == "+"){
            b = stec.pop();
            a = stec.pop();
            res = add(a,b);
            stec.push(res);
        }
        else if(post[i] == "-"){
            b = stec.pop();
            a = stec.pop();
            res = minus(a,b);
            stec.push(res);
        }
        else if(post[i] == "*"){
            b = stec.pop();
            a = stec.pop();
            res = umn(a,b);
            stec.push(res);
        }
        else if(post[i] == "/"){
            b = stec.pop();
            a = stec.pop();
            res = del(a,b);
            stec.push(res);
        }
    }
    return stec.pop();
}

function run(){
    str = document.getElementById("postfix").value;
    var infix = parser(str);
    var res = culc(infix);
    document.getElementById("res").innerText="";
    document.getElementById("res").innerText=res;
}

window.onload=function(){
 document.getElementById("postfix").value="((index-ex)-d)+gst*osr+(an+k+oh)/(n+o)";
}

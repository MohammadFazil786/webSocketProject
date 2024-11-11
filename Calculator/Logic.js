const buttonNames = ['Add','Substract','Divide','Multiply','Calculate'];
const ids = ["btnadd","btnsub","btndiv","btnmul","btncal"];
const oper = ['+','-','/','*','='];
const nums = [0,1,2,3,4,5,6,7,8,9];

const container = document.getElementById("inputs");
const inputScreen = document.getElementById("scr");
for(let ele of nums){
    container.innerHTML += `
    <button id="${ele}">${ele}</button>
`; 
setTimeout(() => {
    document.getElementById(ele.toString()).addEventListener('click', () => {
        inputScreen.value += ele.toString();
    });
}, 0);
}


container.innerHTML += `
        <br />
        `;


const calculation = (exp) =>{
 console.log(exp);
 let temp = 0;
 if(oper.includes(exp[0])){
    inputScreen.value = 'Invalid Expression';
            return;
 }
const exoper=[]
//checking if two operators are coming consecutively
 for(let ele of exp){
    if(oper.includes(ele)){
        exoper.push(ele);
        temp++;
        if(temp == 2){
            inputScreen.value = 'Invalid Expression';
            return;
        }
    }
    else temp=0;
 }

// checking all the operand values are proper integer
 const arr = exp.split(/[+-/*]+/);
 for(let ele of arr){
    if(ele[0] == '0'){
        inputScreen.value = 'Invalid Expression';
        return;
    }
 }
 
 //calculating the answer
  console.log(arr);
  console.log(exoper);
//   const postArr = [];
//   const tempop = [];
//   let iter = 0;
//   for(ele of arr){
//     if(postArr.length == 0){
//         postArr.push(Number(ele));
//         continue;
//     }
//     postArr.push(Number(ele));
//     if(tempop.length == 0){
//         tempop.push(exoper[iter]);
//         continue;
//     }
//     while()
//   }
let res = eval(exp);
inputScreen.value =res;
}
for (let i = 0; i < ids.length; i++) {
    container.innerHTML += `
        <button id="${ids[i]}" class="btnstyle">${buttonNames[i]}</button>
    `;
    if(i != 4){
        setTimeout(() =>{
            document.getElementById(ids[i]).addEventListener('click',() => {inputScreen.value += oper[i]});
        },0);
    }
    else{
        setTimeout(() => {
            document.getElementById(ids[i]).addEventListener('click',() => {calculation(inputScreen.value)});
        }, 0);
    }
    if(i%2 == 1){
        container.innerHTML += `
        <br />
    `;
    }
}

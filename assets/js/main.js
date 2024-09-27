var dataObject = {};
var max = 0;
var min = 0;
var resultR = 0;
var resultM = 0;
var numDatos = 0;
var dataArray = [];
var intervalo = 0;
var Xi=[];
var ni={};
var resultMedia;
var resultVarianza;
var sumLastRow = [];
var moda = 0;

document.getElementById('btnCalc').addEventListener('click', (event) => {
  if(numDatos === 0){
    alert('Llene la tabla primero!');
  }
  else{
    document.querySelector('.results').style.display = 'block';
    setOperationR();
    setOperationM();
    setOperationC();
    setTable();
    operationMediana();
    setTableModa();
    operationVarianza();
    operationDesviacion();
    operationMediana2();
    operationModa();
  }
})

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  var input = document.getElementById('input');
  var number = input.value;
  if(number === '' || number == 0){
    alert('No pueden haber datos con 0');
    input.value = "";
  }
  else{
    if(dataObject.hasOwnProperty(parseInt(number/10))){
      dataObject[parseInt(number/10)].push(number%10);
    }
    else{
      dataObject[parseInt(number/10)] = [parseInt(number%10)];
    }
      dataArray.push(number);
      numDatos += 1;
      max = dataArray.sort((a,b) => b-a)[0];
      min = dataArray.sort((a,b) => a-b)[0];
      setTree();
      document.getElementById('form').reset();
    }
});

const setOperationR = () => {
  operationR = document.getElementById('operationR');
  while(operationR.hasChildNodes()){
    operationR.removeChild(operationR.firstChild);
  }
  resultR = max-min;
  let forInsertR = document.createElement('p');
  let text = `
    <p class="operationProcessR">R = ${max} - ${min === 0 ? '0' : min} = <span class="operationResultR">${max-min}</span></p>
  `
  forInsertR.innerHTML = text;
  operationR.appendChild(forInsertR);
}

const setOperationC = () => {
  operationC = document.getElementById('operationC');
  while(operationC.hasChildNodes()){
    operationC.removeChild(operationC.firstChild);
  }
  resultC = resultR / resultM % 1 === 0 ? resultR / resultM : parseInt(resultR/resultM)+1;
  let forInsertC = document.createElement('p');
  let text = `
    <p class="operationProcessM">C = ${resultR} / ${resultM} = <span class="operationResultM">${resultR / resultM} ≈ ${resultC}</span></p>
  `
  forInsertC.innerHTML = text;
  operationC.appendChild(forInsertC);
}

const setOperationM = () => {
  operationM = document.getElementById('operationM');
  while(operationM.hasChildNodes()){
    operationM.removeChild(operationM.firstChild);
  }
  resultM = (1+3.33*Math.log10(numDatos)) % 1 === 0 ? 1+3.33*Math.log10(numDatos) : 1+3.33*Math.log10(numDatos) > parseInt(1+3.33*Math.log10(numDatos))+0.5 ? parseInt(1+3.33*Math.log10(numDatos))+1 : parseInt(1+3.33*Math.log10(numDatos))
  let forInsertM = document.createElement('p');
  let text = `
    <p class="operationProcessM">M = 1 + 3.33log(${numDatos}) = <span class="operationResultM">${1+3.33*Math.log10(numDatos)} ≈ ${resultM}</span></p>
  `
  forInsertM.innerHTML = text;
  operationM.appendChild(forInsertM);
}

const operationMediana = () => {
  let operationMediana = document.getElementById('operationMediana');
  while (operationMediana.hasChildNodes()){
    operationMediana.removeChild(operationMediana.firstChild);
  }
  let auxModa = [];
  let auxModaReduced = 0;
  niValues = Object.values(ni);
  for(let i = 0; i < Xi.length; i++){
    auxModa.push(Xi[i]*niValues[i]);
  }
  auxModaReduced = auxModa.reduce((a,b) => a+b);
  resultMedia = auxModaReduced/numDatos;
  let forInsertModal = document.createElement('p');
  let textP = `
    <p class="operationProcessMedia"> <span>X</span> = Σ(Xi*ni)/${numDatos} = ${auxModaReduced}/${numDatos} = ${resultMedia}
  `
  forInsertModal.innerHTML = textP;
  operationMediana.appendChild(forInsertModal);
}

const operationVarianza = () => {
  let operationVarianza = document.getElementById('operationVarianza');
  while(operationVarianza.hasChildNodes()) {
    operationVarianza.removeChild(operationVarianza.firstChild);
  }
  let sumAllValues = sumLastRow.reduce((a,b) => a+b);
  resultVarianza = sumAllValues/(numDatos-1);
  let forInsertVarianza = document.createElement('p');
  let textP = `
    <p class="operationProcessVarianza">Varianza = Σni(Xi-<span>X</span>)²/${numDatos-1} = ${sumAllValues}/${numDatos-1} = ${resultVarianza}</p>
  `
  forInsertVarianza.innerHTML = textP;
  operationVarianza.appendChild(forInsertVarianza);
}

const operationDesviacion = () => {
  let operationDesviacion = document.getElementById('operationDesviacion');
  while (operationDesviacion.hasChildNodes()){
    operationDesviacion.removeChild(operationDesviacion.firstChild);
  }
  let forInsertDesviacion = document.createElement('p');
  let textP = `
    <p class="operationDesviacion">desviación: √varianza = √${resultVarianza} = ${Math.sqrt(resultVarianza)}</p>
  `
  forInsertDesviacion.innerHTML = textP;
  operationDesviacion.appendChild(forInsertDesviacion);
}

const operationMediana2 = () => {
  let operationMediana2 = document.getElementById('operationMediana2');
  while (operationMediana2.hasChildNodes()){
    operationMediana2.removeChild(operationMediana2.firstChild);
  }
  let forInsertMediana2= document.createElement('p');
  let textP = `
    <p class="operationMediana2">Datos: ${dataArray.toString()}</p>
  `
  forInsertMediana2.innerHTML = textP;
  operationMediana2.appendChild(forInsertMediana2);
  let resultMediana = document.getElementById('resultMediana');
  let result = 0;
  if(numDatos%2===0){
    result = parseInt((parseInt(dataArray[dataArray.length/2])+parseInt(dataArray[(dataArray.length/2)+1]))/2);
  }
  else{
    result = parseInt(dataArray[parseInt(dataArray.length/2)]);
  }

  let forInsertResultMediana = document.createElement('p');
  let text = `
    <p>Valor de la mediana: ${result}</p>
  `
  forInsertResultMediana.innerHTML = text;
  resultMediana.appendChild(forInsertResultMediana);
}

const operationModa = () => {
  let numbersRepeat = {};
  let aux = 0;
  
  resultModa = document.getElementById('resultModa');

  dataArray.forEach((number) => {
    numbersRepeat[number] = (numbersRepeat[number] || 0) + 1;
  });

  for(let key in numbersRepeat) {
    if(numbersRepeat[key]>aux){
      aux = numbersRepeat[key];
      moda = key;
    }
  }
  console.log(numbersRepeat);
  let forInsertResultModa = document.createElement('p');
  let text = `
    <p>Valor de la moda: ${moda}</p>
  `
  forInsertResultModa.innerHTML = text;
  resultModa.appendChild(forInsertResultModa);
}

const setTable = () => {
  let Ni=[];
  let fi=[];
  let Fi=[];
  let hi=[];
  let Hii=[];
  const tableBodyInterval = document.getElementById('tbody-interval');
  while (tableBodyInterval.hasChildNodes()){
    tableBodyInterval.removeChild(tableBodyInterval.firstChild);
  }
  let aux = [parseInt(min)];
  for(let i = 1; i<=resultM; i++){
    aux.push(aux[i-1]+resultC);
  }
  for(let i = 0; i<resultM; i++){
    Xi.push((aux[i]+aux[i+1])/2);
  }
  auxArray = dataArray.sort((a,b) => a-b);
  for(let x of dataArray){
    for(let i = 0; i<resultM; i++){
      if(x>=aux[i] && x<aux[i+1]){
        ni[aux[i]]=(ni[aux[i]] || 0) + 1;
      }
      else{
        ni[aux[i]]=(ni[aux[i]] || 0); 
      }
    }
  }
  let valuesni = Object.values(ni);
  for(let i = 0; i<valuesni.length; i++){
    Ni[i] = (Ni[i-1] || 0) + valuesni[i];
  }
  for(let i = 0; i<valuesni.length; i++){
    fi[i] = valuesni[i]/numDatos;
  }
  for(let i = 0; i<fi.length; i++){
    Fi[i] = (Fi[i-1] || 0) + fi[i];
  }
  for(let i = 0; i<Fi.length; i++){
    hi[i] = fi[i]*100;
  }
  for(let i = 0; i<hi.length; i++){
    Hii[i] = (Hii[i-1] || 0) + hi[i];
  }
  for(let i = 0; i<resultM; i++){
    let valuesOfKeyni = Object.values(ni)[i];
    let forInsertTableInterval = document.createElement('tr');
    let text = `
      <tr>
        <td>
          [${aux[i]} - ${aux[i+1]})
        </td>
        <td>
          ${Xi[i]}
        </td>
        <td>
          ${valuesOfKeyni}
        </td>
        <td>
          ${Ni[i]}
        </td>
        <td>
          ${fi[i]}
        </td>
        <td>
          ${Fi[i]}
        </td>
        <td>
          ${hi[i]}%
        </td>
        <td>
          ${Hii[i]}%
        </td>
      </tr>
    `
    forInsertTableInterval.innerHTML = text;
    tableBodyInterval.appendChild(forInsertTableInterval);
  }
  
}

const setTableModa = () => {
  let tbodyModa = document.getElementById('tbody-moda');
  let aux = [parseInt(min)];
  for(let i = 1; i<=resultM; i++){
    aux.push(aux[i-1]+resultC);
  }
  for(let i = 0; i<resultM; i++){
    let valuesOfKeyni = Object.values(ni)[i];
    sumLastRow.push(valuesOfKeyni*Math.pow(Xi[i]-resultMedia, 2));
    let forInsertTableModal = document.createElement('tr');
    let text = `
      <tr>
        <td>
          [${aux[i]} - ${aux[i+1]})
        </td>
        <td>
          ${Xi[i]}
        </td>
        <td>
          ${valuesOfKeyni}
        </td>
        <td>
          ${Xi[i]-resultMedia}
        </td>
        <td>
          ${Math.pow(Xi[i]-resultMedia, 2)}
        </td>
        <td>
          ${sumLastRow[i]}
        </td>
      </tr>
    `
    forInsertTableModal.innerHTML = text;
    tbodyModa.appendChild(forInsertTableModal);
  }
}

const setTree = () => {
  const tableBody = document.getElementById('tbody');
  while(tableBody.hasChildNodes()){
    tableBody.removeChild(tableBody.firstChild);
  }
  let keys = Object.keys(dataObject);
  let values = Object.values(dataObject);
  for(let i = 0; i<keys.length; i++){
    let valuesOfKey = Object.values(dataObject)[i].sort((a,b) => a-b);
    let forInsert = document.createElement('tr');
    let text = `
    <tr>
      <td>
        ${keys[i] == 0 ? valuesOfKey.toString() : keys[i]}
      </td>
      <td>
        ${keys[i] == 0 ? '' : valuesOfKey.toString()}
      </td>
    </tr>`
    forInsert.innerHTML = text;
    tableBody.appendChild(forInsert);
  }
}

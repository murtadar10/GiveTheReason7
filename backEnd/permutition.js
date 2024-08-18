function openPage(pageId) {
  // Hide all pages with animation
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    if (page.classList.contains("active")) {
      page.classList.remove("active");
      page.classList.add("hidden");
    }
  });

  // Show the selected page with animation
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.remove("hidden");
    selectedPage.classList.add("active");
  }
}

// Optionally, you can show the first page by default
document.addEventListener("DOMContentLoaded", () => {
  openPage("page1");
});

// =========== تفاصي الزمرة
function generatePermutations() {
  const n = parseInt(document.getElementById("groupOrder").value);
  if (isNaN(n) || n < 1) {
    document.getElementById("groupInfo").innerText =
      "Please enter a valid number greater than 0.";
    document.getElementById("permutations").innerHTML = "";
    return;
  }
    let OrderGroup = 1;
    for (let i = 2; i <= n; i++) {
      OrderGroup *= i;
    }
  
  
  
  const permutations = getAllPermutations(
    Array.from({ length: n }, (_, i) => i + 1)
  );
  const container = document.getElementById("permutations");
  const groupInfo = document.getElementById("groupInfo");
  container.innerHTML = "";
  groupInfo.innerHTML = `  <P id="OrderOfGrop"> Order Of Group = ${OrderGroup} </P> <strong> S${n}=</strong> { ${permutations
    .map((perm) => convertToCycles(perm))
    .join(" , ")} }`;

  permutations.forEach((perm, index) => {
    const cycles = convertToCycles(perm);
    let arr4Order = []
    const splitChar = "(";
    
    // الحصول على المصفوفات الفرعية بعد تقسيم النص
    let orderCycs = splitIntoSubarrays(cycles, splitChar);
    // تطبيق دالة inversPerm على كل مصفوفة فرعية، مع إزالة الأقواس وتحويل العناصر إلى أرقام
    orderCycs.map((cyc) => {
      arr4Order.push(
        cyc.join("").replace(/[()]/g, "").split("").map(Number).length
      );
    });
    let OrderCycle = lcmOfArray(arr4Order);

     const order = cycles.replace(/[(" ")]/g, "").length ;
    const generatedCycles = generateCycles(perm, order);
    
    const permutationInfo = document.createElement("div");
    permutationInfo.className = "permutation-info";
    permutationInfo.innerHTML = ` ${cycles} = { ${generatedCycles} } => order of <strong>|${cycles}|=</strong> 
    ${OrderCycle} `;


    container.appendChild(permutationInfo);
  });
}

function getAllPermutations(arr) {
  if (arr.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutations = getAllPermutations(rest);
    for (const perm of permutations) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

function convertToCycles(perm) {
  const cycles = [];
  const visited = Array(perm.length).fill(false);
  for (let i = 0; i < perm.length; i++) {
    if (!visited[i]) {
      let cycle = [];
      let x = i;
      while (!visited[x]) {
        visited[x] = true;
        cycle.push(x + 1);
        x = perm[x] - 1;
      }
      if (cycle.length > 1) {
        cycles.push(`(${cycle.join(" ")})`);
      }
    }
  }
  return cycles.length > 0 ? cycles.join("") : "(I)";
}

// -===================================
// ================= حساب الاوردر =====================
function calcuatePermOrder(permo) {
  let arr4Order = [];
  const splitChar = "(";
  let cy = permo.value;
  // الحصول على المصفوفات الفرعية بعد تقسيم النص
  let orderCycs = splitIntoSubarrays(cy, splitChar);
  // تطبيق دالة inversPerm على كل مصفوفة فرعية، مع إزالة الأقواس وتحويل العناصر إلى أرقام
  let result = orderCycs.map((cyc) => {
    arr4Order.push(
      cyc.join("").replace(/[()]/g, "").split("").map(Number).length
    );
  });
  let Order = lcmOfArray(arr4Order);

  return Order;
}

function applyPermutation(perm, arr) {
  const result = Array(arr.length);
  for (let i = 0; i < perm.length; i++) {
    result[perm[i] - 1] = arr[i];
  }
  return result;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function generateCycles(perm, order) {
  const cycles = ["I"];
  let current = Array.from({ length: perm.length }, (_, i) => i + 1);
  for (let i = 0; i < order; i++) {
    current = applyPermutation(perm, current);
    const cycle = convertToCycles(current);
    if (cycle !== "(I)") {
      cycles.push(cycle);
    }
  }
  return cycles.length > 0 ? cycles.join(" , ") : "(I)";
}
// ===================================
// داله لايجاد المعكوس
// دالة لعكس العناصر مع تثبيت العنصر الأول
function inversPerm(arr) {
  if (arr.length <= 1) {
    return arr; // إذا كانت المصفوفة تحتوي على عنصر واحد أو أقل، تعود كما هي.
  }

  // استخراج العنصر الأول
  const firstElement = arr[0];

  // عكس العناصر المتبقية
  const reversedRest = arr.slice(1).reverse();

  // دمج العنصر الأول مع بقية العناصر المعكوسة
  return [firstElement, ...reversedRest];
}

// دالة لتقسيم النص إلى مصفوفات فرعية


// ===========================================================
// دالة لحساب العكس للتبديلات
function calcuatePermoInvers(cycs) {
  const splitChar = "(";

  // الحصول على المصفوفات الفرعية بعد تقسيم النص
  let invCycs = splitIntoSubarrays(cycs.value, splitChar);

  // تطبيق دالة inversPerm على كل مصفوفة فرعية، مع إزالة الأقواس وتحويل العناصر إلى أرقام
  let Inmers = invCycs.map(
    (perm) =>
      `(${inversPerm(
        perm.join("").replace(/[()]/g, "").split("").map(Number)
      ).join(" ")})`
  );

  return Inmers;
}
// 
function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
function lcmOfArray(arr) {
  return arr.reduce((acc, val) => lcm(acc, val), 1);
}

// inverse ======================================

function calculateOrderInverse() {
  let input = document.getElementById("permutation-input");

  let order = calcuatePermOrder(input);
  let invers = calcuatePermoInvers(input);

  document.getElementById(
    "res4Or&Inv"
  ).innerHTML = ` <p> Order = ${order} </p><p> Invers = ${invers} </p>`;
}

// ==================== ايجاد القوى ==============================

function parsePermutation(input) {
  const cycles = input.match(/\(([^)]+)\)/g);
  return cycles ? cycles.map(parseCycle) : [];
}

function applyPermutation4pow(perm, arr) {
  const result = [...arr];
  perm.forEach((cycle) => {
    const n = cycle.length;
    for (let i = 0; i < n; i++) {
      result[cycle[i] - 1] = arr[cycle[(i + 1) % n] - 1];
    }
  });
  return result;
 }
function invertPermutation(perm) {
  return perm.map((cycle) => [...cycle].reverse());
}

function calculatePowerPerm() {
  const input = document.getElementById("input4Pow").value;
  const power = parseInt(document.getElementById("input4Pow2").value);
  const perm = parsePermutation(input);
  if (perm.length === 0 || isNaN(power)) {
    document.getElementById("res4Pow").innerText = "Invalid input.";
    return;
  }

  const n = perm.reduce((max, cycle) => Math.max(max, ...cycle), 0);
  let resultArray = Array.from({ length: n }, (_, i) => i + 1);
  let effectivePerm = power < 0 ? invertPermutation(perm) : perm;
  let absPower = Math.abs(power);
  for (let i = 0; i < absPower; i++) {
    resultArray = applyPermutation4pow(effectivePerm, resultArray);
  }

  const resultCycles = convertToCycles(resultArray);
  if (resultCycles === "(1)") {
  }

  document.getElementById("res4Pow").innerText = `Result: ${resultCycles}`;
}



// // ==================== التركيب مع القوى ================


function calcCompoWithPow() {
  
  let firstpow = parseFloat(document.getElementById("power1").value) || 1;
  let secondpow = parseFloat(document.getElementById("power2").value) || 1;
  let thirdpow = parseFloat(document.getElementById("power3").value) || 1;
  let fourthpow = parseFloat(document.getElementById("power4").value) || 1;
  let firstinput = document.getElementById("permutation1").value ||  "(1)";
  let secondinput = document.getElementById("permutation2").value || "(1)";
  let thirdinput = document.getElementById("permutation3").value ||  "(1)";
  let fourthinput = document.getElementById("permutation4").value || "(1)";
  let permutationOrder = parseFloat(
    document.getElementById("permutationOrder").value
  );
  
  if (isNaN(permutationOrder)) {
    alert("ادخل رقم الزمرة");
  }
  let errorArr = []
  document.querySelectorAll(".power-input").forEach((e)=>errorArr.push(e.value))
  errorArr.map((e)=> {
    if (isNaN(e)) {
    alert("ادخل رقم صحبح للاس ");
  }
  })

  if (!isValidOrder([...parsePermutation(firstinput), ...parsePermutation(secondinput), ...parsePermutation(thirdinput)], permutationOrder)) {
    alert("رقم الزمرة صغير جدًا ولا يتناسب مع أرقام الدورات المدخلة");
    return;
  }
  

   let firstpermo = calculatePowerPerm4comp(firstinput, Math.abs(firstpow)); // القوس الاول مرفوع الى قوى
   if (firstpow < 0) {
     firstpermo = calcuatePermoInvers(
       calculatePowerPerm4comp(firstinput, Math.abs(firstpow))
     ).join("");
   }
   let secondpermo = calculatePowerPerm4comp(secondinput, Math.abs(secondpow)); // القوس الثاني  مرفوع الى قوى
   if (secondpow < 0) {
     secondpermo = calcuatePermoInvers(
       calculatePowerPerm4comp(secondinput, Math.abs(secondpow))
     ).join("");
   }
   let thirdpermo = calculatePowerPerm4comp(thirdinput, Math.abs(thirdpow)); // القوس الثالث مرفوع الى قوى
   if (thirdpow < 0) {
     thirdpermo = calcuatePermoInvers(
       calculatePowerPerm4comp(thirdinput, Math.abs(thirdpow))
     ).join("");
   }
   let fourthpermo = calculatePowerPerm4comp(fourthinput, Math.abs(fourthpow)); // القوس الرابع مرفوع الى قوى
   if (fourthpow < 0) {
     fourthpermo = calcuatePermoInvers(
       calculatePowerPerm4comp(fourthinput, Math.abs(fourthpow))
     ).join("");
   }

  firstbracket = compusation(firstpermo, secondpermo, permutationOrder);
  secondbracket = compusation(thirdpermo, fourthpermo, permutationOrder);

  let resultOfComposition = compusation(
    firstbracket,
    secondbracket,
    permutationOrder
  );

  document.getElementById("resOfPow").innerText=`=  ${resultOfComposition}`;
 

}
// // =============== المكتبة ==============================

function calculatePowerPerm4comp(input, power) {
  const perm = parsePermutation(input);
  if (perm.length === 0 || isNaN(power)) {
    document.getElementById("resOfPow").innerText = "Invalid power input.";
    return;
  }

  const n = perm.reduce((max, cycle) => Math.max(max, ...cycle), 0);
  let resultArray = Array.from({ length: n }, (_, i) => i + 1);
  let effectivePerm = power < 0 ? invertPermutation(perm) : perm;
  let absPower = Math.abs(power);
  for (let i = 0; i < absPower; i++) {
    resultArray = applyPermutation4pow(effectivePerm, resultArray);
  }

  const resultCycles = convertToCycles(resultArray);
  if (resultCycles === "(1)") {
    return "(I)";
  }

  return resultCycles;
}
function isValidOrder(cycles, permutationOrder) {
  return cycles.every(cycle => {
    return cycle.every(num => num <= permutationOrder);
  });
}
function compusation(permutation1, permutation2, permutationOrder) {

  let firstpermo = parsePermutation(permutation1);
  let secondpermo = parsePermutation(permutation2);
  
  
  
  return composeSeparateCycles(firstpermo, secondpermo, permutationOrder);
}

function composeSeparateCycles(cycles, otherCycles, size) {
  let arr = Array.from({ length: size }, (_, i) => i + 1);

  // Apply each cycle from the second permutation to the original array
  otherCycles.forEach((cycle) => {
    arr = applySingleCycle(cycle, arr);
  });

  // Apply each cycle from the first permutation to the resulting array
  cycles.forEach((cycle) => {
    arr = applySingleCycle(cycle, arr);
  });

  return convertToCycles(arr);
}



function parseCycle(cycleStr) {
  if (typeof cycleStr !== "string") {
    throw new TypeError("Expected a string");
  }

  return cycleStr.replace(/[()]/g, "").split(" ").map(Number);
}

function splitIntoSubarrays(inputString, character) {
  if (typeof inputString !== "string") {
    console.error(`Expected a string, but got ${typeof inputString}`);
    return [];
  }

  // التحقق مما إذا كان character موجودًا في inputString
  if (!inputString.includes(character)) {
    console.error(`Character "${character}" not found in input.`);
    return [inputString]; // إرجاع inputString كمصفوفة تحتوي على عنصر واحد
  }

  // تقسيم النص إلى أجزاء باستخدام الكاركتر المحدد
  const parts = inputString.split(character);

  // تحويل كل جزء إلى مصفوفة فرعية وحذف المصفوفات الفارغة
  const resultArray = parts
    .map((part) => part.split("").filter((ch) => ch.trim() !== ""))
    .filter((subArray) => subArray.length > 0);

  return resultArray;
}

function applySingleCycle(cycle, arr) {
  const result = [...arr];
  const n = cycle.length;
  for (let i = 0; i < n; i++) {
    result[cycle[i] - 1] = arr[cycle[(i + 1) % n] - 1];
  }
  return result;
}
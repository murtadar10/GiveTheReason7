//شلعن كلبي
const modulusInput = document.getElementById("modulus");
const modulus = parseInt(modulusInput.value);

let Arryofsubgps = [];

// دالة للتحقق مما إذا كان العدد أوليًا
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// دالة لحساب القاسم المشترك الأكبر
function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// دالة لحساب الأوردر
function Order(elemen, modulus) {
  let order = modulus / gcd(elemen, modulus);
  return order;
}

// دالة لحساب الزمر الجزئية في الزمرة المعيارية
function calculateSubgroups(modulus) {
  let subgroups = [];
  for (let i = 2; i < modulus; i++) {
    if (modulus % i === 0) {
      subgroups.push(i);
    }
  }
  if (isPrime(modulus)) {
    subgroups.push("haven't subgroups because it is a prime group");
  }
  return subgroups;
}

// دالة لحساب المولدات في الزمرة المعيارية
function calculateGenerators(modulus) {
  let generators = [];
  for (let i = 1; i < modulus; i++) {
    if (gcd(modulus, i) === 1) {
      generators.push(i);
    }
  }
  if (generators.length === 0) {
    generators.push("haven't generators");
  }
  return generators;
}

// دالة لحساب جميع الزمر الجزئية
function calculateAllSubgroups(modulus) {
  let AllSubgroups = [];
  for (let i = 2; i < modulus; i++) {
    if (gcd(modulus, i) === 1) {
      continue;
    } else {
      AllSubgroups.push(i);
    }
  }
  if (AllSubgroups.length === 0) {
    AllSubgroups.push("haven't subgroups");
  }
  return AllSubgroups;
}

// دالة لحساب (a^b) % c
function modExp(a, b, c) {
  let result = 1;
  a = a % c;
  while (b > 0) {
    if (b % 2 === 1) {
      result = (result * a) % c;
    }
    b = Math.floor(b / 2);
    a = (a * a) % c;
  }
  return result;
}
function calculateUn(n) {
  let Un = [];
  for (let i = 1; i < n; i++) {
    if (gcd(i, n) === 1) {
      Un.push(i);
    }
  }

  return Un;
}

// دالة لتنفيذ الحسابات وعرض النتائج
function calculateZn() {
  let elems = document.getElementById("AllElement");

  elems.style.display = "none";

  const modulusInput = document.getElementById("modulus");
  const modulus = parseInt(modulusInput.value);
  let groupelements = [];
  for (let i = 0; i < modulus; i++) {
    groupelements.push(i);
  }

  if (isNaN(modulus) || modulus <= 1) {
    alert("يرجى إدخال قيمة صحيحة أكبر من 1.");
    return;
  }

  const subgroups = calculateSubgroups(modulus);
  const generators = calculateGenerators(modulus);
  const AllSubgroups = calculateAllSubgroups(modulus);

  document.getElementById(
    "groupElements"
  ).textContent = `Z${modulus} = { ${groupelements.join(", ")} }`;
  document.getElementById("subgroups").textContent = `Proper subgroups = { ${subgroups.map(item => `<${item}>`).join(", ")} }`;

  document.getElementById(
    "AllSubgroups"
  ).textContent = `All subgroups = { ${AllSubgroups.map(item => `<${item}>`).join(", ")} }`;
  document.getElementById(
    "generators"
  ).textContent = `Generators = { ${generators.map(item => `<${item}>`).join(", ")} }`;
}



// دالة لتوليد العناصر المولدة
function gener(ele, mod) {
  const generatedSet = [0];

  let current = ele;
  for (let i = 1; i < mod; i++) {
    generatedSet[i] = current;
    current = (current + ele) % mod;
    if (current === 0) break; // إذا وصلنا إلى العنصر المحايد
  }

  let returned = new Set(generatedSet);

  return Array.from(returned).sort((a, b) => a - b);
}

// دالة لحساب الأوردرات لجميع العناصر وعرض التفاصيل
let detailsVisible = false; // متغير لتتبع حالة التفاصيل

function allOrders() {
  const modulusInput = document.getElementById("modulus");
  const modulus = parseInt(modulusInput.value);
  let groupelements = [];
  for (let i = 0; i < modulus; i++) {
    groupelements.push(i);
  }

  let Arryoforders = [];
  let Arryofsubgps = [];

  // حساب الأوردرات
  for (let i = 0; i < groupelements.length; i++) {
    Arryoforders.push(`Order of ${i} =  |${i}| = ${modulus}/gcd(${i},${modulus}) = ${modulus}/${gcd(i, modulus)} =  ${modulus / gcd(i, modulus)}`);
  }

  // حساب الزمر الجزئية
  for (let i = 0; i < modulus; i++) {
    Arryofsubgps.push(`<${i}> = {${gener(i, modulus)}}`);
  }

  let can = document.createElement("div");
  let can2 = document.createElement("div");
  can.classList.add("can");
  can2.classList.add("can2");
  let ordrLaw = document.createTextNode('Order Of a = |a| = n/gcd(a,n) =>')
  can.appendChild(ordrLaw);
  // إنشاء العناصر للأوامر
  Arryoforders.forEach((item) => {
    let p = document.createElement("p");
    p.classList.add("order");
    p.textContent = item;
    can.appendChild(p);
  });

  // إنشاء العناصر للزمر الجزئية
  Arryofsubgps.forEach((item) => {
    let p2 = document.createElement("p");
    p2.classList.add("subgroups");
    p2.textContent = item;
    can2.appendChild(p2);
  });

  // حذف أي محتوى سابق
  const allElementContainer = document.getElementById("AllElement");

  if (!detailsVisible) {
    // عرض التفاصيل
    allElementContainer.innerHTML = ""; // مسح المحتوى السابق

    allElementContainer.appendChild(can);
    allElementContainer.appendChild(document.createElement("p")).textContent =
      "Elements ==================";
    allElementContainer.appendChild(can2);

    // تغيير الزر إلى "Hide details" وتعيين معالج النقر
  }

  detailsVisible = !detailsVisible; // تغيير حالة التفاصيل
}

document.getElementById("allElements").addEventListener("click", (e) => {
  let elems = document.getElementById("AllElement");
  if (elems.style.display === "block") {
    elems.style.display = "none";
    document.getElementById("allElements").textContent = "show More";
  } else {
    elems.style.display = "block";
    document.getElementById("allElements").textContent = "show less";
  }
});
document.getElementById("ShowResultOfZn").addEventListener("click", (e) => {
 
  document.getElementById("resultsOfZn").style.display = "block";
  calculateZn();
});



document.getElementById("kellyTableZn").addEventListener("click", () => {
  let table = document.getElementById("kleinTable");
  if (table.style.display === "block") {
    table.style.display = "none";
    document.getElementById("kellyTableZn").textContent = "show table";
  } else {
    table.style.display = "block";
    document.getElementById("kellyTableZn").textContent = "hiden table";
  }
  kellyTableZn();  // استدعاء الدالة الصحيحة
});

function kellyTableZn() {
  let mods = parseInt(document.getElementById("modulus").value);
  let table = document.getElementById("kleinTable");
  table.innerHTML = ""; // تفريغ الجدول إذا كان هناك محتوى قديم

  // إنشاء رأس الجدول
  let headerRow = document.createElement("tr");
  let emptyCell = document.createElement("th");
  headerRow.appendChild(emptyCell);

  for (let i = 0; i < mods; i++) {
      let th = document.createElement("th");
      th.textContent = i;
      headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // إنشاء محتوى الجدول
  for (let i = 0; i < mods; i++) {
      let row = document.createElement("tr");
      let rowHeader = document.createElement("th");
      rowHeader.textContent = i;
      row.appendChild(rowHeader);

      for (let j = 0; j < mods; j++) {
          let cell = document.createElement("td");
          cell.textContent = (i + j) % mods; // حساب العملية المعيارية
          row.appendChild(cell);
      }
      table.appendChild(row);
  }

  console.log()
}

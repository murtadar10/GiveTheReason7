document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.JordenHolder-menu-item');
    const description = document.getElementById('description');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // إزالة الكلاس النشط من جميع العناصر
            menuItems.forEach(el => el.classList.remove('active'));

            // إضافة الكلاس النشط للعنصر المحدد
            item.classList.add('active');

            // إظهار القسم المقابل
            const target = document.querySelector(item.getAttribute('data-target'));
            document.querySelectorAll('.JordenHolder-section').forEach(sec => sec.classList.remove('active'));
            target.classList.add('active');

            // تحريك العنصر المحدد إلى أعلى القائمة
            const nav = document.querySelector('.JordenHolder-nav');
            const itemHeight = item.offsetHeight;
            const itemOffsetTop = item.offsetTop;
            const navScrollTop = itemOffsetTop - (nav.offsetHeight / 2) + (itemHeight / 2);

            // حساب المسافة المطلوبة لتحريك العنصر إلى أعلى
            nav.scrollTop = navScrollTop;

            // عرض الوصف
            description.textContent = item.getAttribute('data-description');
            description.style.display = 'block';
        });
    });
});


document.querySelectorAll('.JordenHolder-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        document.querySelectorAll('.JordenHolder-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(target).classList.add('active');
    });
});


// Placeholder for each program's script
// Include the relevant script for each section here

// Composition Series Script start

function addSubgroupCompJord() {
    const container = document.getElementById('Jorden-subgroups');
    const newSubgroup = document.createElement('div');
    newSubgroup.className = 'jorden-sups';
    newSubgroup.innerHTML = `
        <button class="jorden-remove-btn" onclick="removeSubgroupComp(this)">x</button>
        <input type="number" class="JordenHolderinput" min="1" />
    `;
    container.appendChild(newSubgroup);
    updateSeparatorsCompJord();
}

function removeSubgroupComp(button) {
    const container = document.getElementById('Jorden-subgroups');
    container.removeChild(button.parentElement);
    updateSeparatorsCompJord();
}

function updateSeparatorsCompJord() {
    const container = document.getElementById('Jorden-subgroups');
    const items = container.querySelectorAll('.jorden-sups');
    items.forEach((item, index) => {
        // Remove existing separators
        const existingSeparator = item.querySelector('.jorden-separator');
        if (existingSeparator) {
            item.removeChild(existingSeparator);
        }
        
        // Add new separator
        if (index < items.length -1) {
            let separator = document.createElement('span');
            separator.className = 'jorden-separator';
            separator.innerText = '⊃';
            item.appendChild(separator);
        }
    });
}

function calculateSubgroupElements(order, generator) {
    const elements = [];
    for (let i = 0; i < order; i++) {
        elements.push((generator * i) % order);
    }
    return [...new Set(elements)]; // Return unique elements
}

function checkSeriesCompJord() {
    const originalOrder = parseInt(document.getElementById('originalGroup').value.trim());
    if (isNaN(originalOrder) || originalOrder <= 0) {
        document.getElementById('resultComp').innerText = 'Please enter a valid order for the original group.';
        document.getElementById('stepsComp').innerText = '';
        return;
    }

    const inputs = document.querySelectorAll('#Jorden-subgroups input');
    const generators = Array.from(inputs).map(input => parseInt(input.value.trim()));
    
    if (generators.some(isNaN) || generators.some(g => g <= 0)) {
        document.getElementById('resultComp').innerText = 'Please enter valid generators for the subgroups.';
        document.getElementById('stepsComp').innerText = '';
        return;
    }

    let stepsComp = '';
    let isCompositionSeries = true;
    let previousSubgroupOrder = originalOrder;

    for (let i = 0; i < generators.length; i++) {
        const generator = generators[i];
        const currentSubgroup = calculateSubgroupElements(originalOrder, generator);
        const currentSubgroupOrder = currentSubgroup.length;
        
        stepsComp += `Subgroup generated by ${generator}: { ${currentSubgroup.join(', ')} }\n`;

        if (i > 0) {
            const prevSubgroupOrder = calculateSubgroupElements(originalOrder, generators[i - 1]).length;
            const quotient = previousSubgroupOrder / currentSubgroupOrder;
            
            if (previousSubgroupOrder % currentSubgroupOrder !== 0) {
                isCompositionSeries = false;
                stepsComp += `Order of previous subgroup ${previousSubgroupOrder} / Order of current subgroup ${currentSubgroupOrder} is not an integer.\n`;
                stepsComp += `The subgroup generated by ${generators[i - 1]} is not maximal relative to the subgroup generated by ${generator}.\n`;
                break;
            }
            
            stepsComp += `Order of previous subgroup ${previousSubgroupOrder} / Order of current subgroup ${currentSubgroupOrder} = ${quotient}\n`;

            if (quotient !== 1) {
                stepsComp += `The subgroup generated by ${generator} is maximal relative to the previous subgroup.\n`;
            }
        }

        previousSubgroupOrder = currentSubgroupOrder;
    }

    if (isCompositionSeries) {
        document.getElementById('resultComp').innerText = 'The series is a valid composition series.';
    } else {
        document.getElementById('resultComp').innerText = 'The series is not a valid composition series.';
    }

    document.getElementById('stepsComp').innerText = stepsComp;
}

// Composition Series Script end


// Solvable Groups Script start
function addSubgroupSolv() {
    const container = document.getElementById('normalSubgroupsSolv');
    const newSubgroup = document.createElement('div');
    newSubgroup.className = 'jorden-sups';
    newSubgroup.innerHTML = `
        <button class="jorden-remove-btn" onclick="removeSubgroupSolv(this)">x</button>
        <input type="number" class="JordenHolderinput" min="1" />
    `;
    container.appendChild(newSubgroup);
    updateSeparatorsSolv();
}

function removeSubgroupSolv(button) {
    const container = document.getElementById('normalSubgroupsSolv');
    container.removeChild(button.parentElement);
    updateSeparatorsSolv();
}

function updateSeparatorsSolv() {
    const container = document.getElementById('normalSubgroupsSolv');
    const items = container.querySelectorAll('.jorden-sups');
    items.forEach((item, index) => {
        // Remove existing separators
        const existingSeparator = item.querySelector('.jorden-separator');
        if (existingSeparator) {
            item.removeChild(existingSeparator);
        }
        
        // Add new separator
        if (index < items.length - 1) {
            let separator = document.createElement('span');
            separator.className = 'jorden-separator';
            separator.innerText = '⊃';
            item.appendChild(separator);
        }
    });
}

function checkSolvabilitySolv() {
    const groupOrder = parseInt(document.getElementById('groupOrderSolv').value.trim());
    if (isNaN(groupOrder) || groupOrder <= 0) {
        document.getElementById('resultSolv').innerText = 'Please enter a valid order for the group.';
        document.getElementById('stepsSolv').innerText = '';
        return;
    }

    const inputs = document.querySelectorAll('#normalSubgroupsSolv input');
    const subgroupOrders = Array.from(inputs).map(input => parseInt(input.value.trim()));
    
    if (subgroupOrders.some(isNaN) || subgroupOrders.some(g => g <= 0)) {
        document.getElementById('resultSolv').innerText = 'Please enter valid orders for the subgroups.';
        document.getElementById('stepsSolv').innerText = '';
        return;
    }

    let steps = '';
    let isSolvable = true;
    let previousOrder = groupOrder;

    for (let i = 0; i < subgroupOrders.length; i++) {
        const currentOrder = subgroupOrders[i];
        
        if (previousOrder % currentOrder !== 0) {
            isSolvable = false;
            steps += `Order of previous subgroup ${previousOrder} / Order of current subgroup ${currentOrder} is not an integer.\n`;
            steps += `The subgroup is not normal relative to the previous subgroup.\n`;
            break;
        }

        steps += `Order of previous subgroup ${previousOrder} / Order of current subgroup ${currentOrder} = ${previousOrder / currentOrder}\n`;
        previousOrder = currentOrder;
    }

    if (isSolvable) {
        document.getElementById('resultSolv').innerText = 'The group is solvable.';
    } else {
        document.getElementById('resultSolv').innerText = 'The group is not solvable.';
    }

    document.getElementById('stepsSolv').innerText = steps;
}

// Solvable Groups Script end


// p-Group Script start
function checkPGroup() {
    const groupOrder = parseInt(document.getElementById('groupOrder').value.trim());
    const primeNumber = parseInt(document.getElementById('primeNumber').value.trim());
    
    if (isNaN(groupOrder) || groupOrder <= 0 || isNaN(primeNumber) || primeNumber <= 1) {
        document.getElementById('result-P').innerText = 'Please enter valid values for group order and prime number.';
        return;
    }

    // Check if the group order is a power of the prime number
    const isPGroup = Math.log(groupOrder) / Math.log(primeNumber) % 1 === 0;
    
    if (isPGroup) {
        document.getElementById('result-P').innerText = `The group of order ${groupOrder} is a ${primeNumber}-group.`;
    } else {
        document.getElementById('result-P').innerText = `The group of order ${groupOrder} is not a ${primeNumber}-group.`;
    }
}
// p-Group Script  end



// Sylow p-Subgroup Script start
function checkSylowPSubgroups() {
    const groupOrder = parseInt(document.getElementById('groupOrderSylow').value.trim());

    if (isNaN(groupOrder) || groupOrder <= 0) {
        document.getElementById('resultSylow').innerText = 'Please enter a valid group order.';
        return;
    }

    const primeFactors = getPrimeFactors(groupOrder);
    let results = [];

    primeFactors.forEach(primeFactor => {
        const pPower = getHighestPowerOfPrime(primeFactor, groupOrder);
        const pPowerValue = Math.pow(primeFactor, pPower);
        const isSylow = (pPowerValue > 0 && groupOrder % pPowerValue === 0);

        results.push(`\nOrder of ${primeFactor}-Sylow subgroup:`);
        results.push(`Order ${pPowerValue} ${isSylow ? 'is' : 'is not'} Sylow ${primeFactor}-subgroup`);
        
        if (isSylow) {
            results.push(`Sylow ${primeFactor}-subgroups:`);
            const subgroups = getSylowSubgroups(primeFactor, groupOrder);
            results.push(`The ${primeFactor}-subgroup of (Z${groupOrder}, +${groupOrder}) is { ${subgroups.join(', ')} }`);
        }
    });

    document.getElementById('resultSylow').innerText = results.join('\n');
}

function getPrimeFactors(n) {
    let factors = [];
    for (let i = 2; i <= n; i++) {
        if (n % i === 0) {
            let isPrime = true;
            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime && !factors.includes(i)) {
                factors.push(i);
            }
        }
    }
    return factors;
}

function getHighestPowerOfPrime(prime, number) {
    let power = 0;
    while (number % prime === 0) {
        number /= prime;
        power++;
    }
    return power;
}

function getSylowSubgroups(prime, order) {
    let subgroups = [];
    for (let i = 1; i < order; i++) {
        if (order % i === 0 && gcdSylow(order, i) === i) {
            const subgroupOrder = order / gcdSylow(order, i);
            const pPower = getHighestPowerOfPrime(prime, subgroupOrder);
            if (Math.pow(prime, pPower) === subgroupOrder) {
                subgroups.push(`<${i}>`);
            }
        }
    }
    return subgroups.length > 0 ? subgroups : ['None'];
}

function gcdSylow(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Sylow p-Subgroup Script end




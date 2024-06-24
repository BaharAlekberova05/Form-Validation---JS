const form = document.querySelector('#form');
const formContent = document.querySelector('#form-content');

const formObject = [
    {type: 'input', name: 'name', label: 'Name'},
    {type: 'input', name: 'surname', label: 'Surname'},
    {type: 'input', name: 'phone', label: 'Phone'},
    {type: 'input', name: 'email', label: 'Email'},
    {type: 'input', name: 'age', label: 'Age', 'data-number': true},
    {type: 'select', name: 'hobbi', label: 'Hobby', options: [
        {value: 'football', name: 'Football'},
        {value: 'tennis', name: 'Tennis'},
        {value: 'basketball', name: 'Basketball'}
    ]},
    {type: 'input', name: 'password', label: 'Password'},
    {type: 'input', name: 'rpassword', label: 'Repeat Password', 'data-some': 'password'}
]

const errorMessage = (element, message) => {
    element.classList.add('border-red-500');
    element.parentElement.insertAdjacentHTML('beforeend', `<p class="text-sm text-red-500 mt-[2px]">${message}</p>`)
}

const removeErrorMessage = (element) => {
    if (element.parentElement.querySelector('p')) {
        element.parentElement.querySelector('p').remove();
        element.classList.remove('border-red-500');
    }
}

const handleSubmit = (values) => {
    console.log(values);
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const onlyNumber  = (str) => {
    var pattern = /^\d+\.?\d*$/;
    return pattern.test(str);  
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let error = 0;
    let values = {}

    for (let element of e.target.elements) {
        removeErrorMessage(element); 

        if(element.tagName !== 'BUTTON') {
            const value = element.value.trim();
            const message = element.getAttribute('data-message');
            const max = element.getAttribute('data-max');
            const min = element.getAttribute('data-min');
            const some = element.getAttribute('data-some');
            const number = element.getAttribute('data-number');

            values[element.name] = value;

            if(!value) {
                errorMessage(element, message || 'Bos buraxma!');
                error++;
            } else if (max && value.length > parseInt(max)) {
                errorMessage(element, `En cox ${max} simvol ola biler!`);
                error++;
            } else if (min && value.length < parseInt(min)) {
                errorMessage(element, `En az ${min} simvol olmalidir!`);
                error++;
            } else if (number && !onlyNumber(value)) {
                errorMessage(element, 'Reqem daxil et!');
                error++;
            } else if (element.name === 'email' && !validateEmail(value)) {
                errorMessage(element, 'Email formatini duzgun yaz!');
                error++;
            } else if (some) {
                const someInput = form.querySelector(`[name="${some}"]`)

                if (someInput && someInput.value.toString().toLowerCase() !== value.toLowerCase()) {
                    errorMessage(element, 'Sifreler uygun gelmir!');
                    error++;
                }
            }
        }    
    }

    if (!error) {
        handleSubmit(values)
    }
});


const formInput = (element) => {
    return `
    <input name="${element.name}" data-message="${element.dataMessage || 'Bos buraxma'}" type="text" class="h-[40px] rounded px-2 border  w-full">
    `
}

const formSelect = (element) => {
    let html = '<option value="">Sec</option>'
    for(let option of element.options) {
        html += `<option value="${option.value}">${option.name}</option>`
    }

    return `
    <select name="${element.name}" class="h-[40px] rounded px-2 border  w-full">
        ${html}
    </select>
    `
}

const formElement = (element) => {
    if (element.type === 'input') {
        return formInput(element)
    } else if (element.type === 'select') {
        return formSelect(element)
    }
}


const formStart = () => {
    for (let el of formObject) {
        formContent.innerHTML+= `
        <div class="flex flex-col">
            <label class="font-bold mb-1">${el.label}</label>
            ${formElement(el)}
        </div>
        `
        
    }
}

formStart();
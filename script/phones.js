const loadData = async (inputValue = "a", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
    console.log(phones);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainers = document.getElementById('phones_container');
    phoneContainers.innerHTML = "";



    if (phones.length > 12) {
        const showAllBtn = document.getElementById('show_all_btn');
        showAllBtn.classList.remove('hidden');
    }
    else {
        const showAllBtn = document.getElementById('show_all_btn');
        showAllBtn.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    console.log('isShowAll', isShowAll);

    // console.log(phones);
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}"
                class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}'), show_phone_details.showModal()" class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainers.appendChild(div)
    });
    // console.log(phones);

    // hide loading spinner 
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneDetails = data.data;
    displayPhoneDetails(phoneDetails);
    console.log(phoneDetails);
}


const displayPhoneDetails = (phoneDetails) => {
    const phoneDetailContainer = document.getElementById("phone_details_container");
    phoneDetailContainer.innerHTML = `
    <div class="flex justify-center">
    <img src="${phoneDetails.image}" alt="">
    </div>
    <h1 class="text-2xl font-medium">${phoneDetails.name}</h1>
   `
}


const searchBtn = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchInputField = document.getElementById('search_input');
    const inputValue = searchInputField.value;
    loadData(inputValue || "a", isShowAll)
    // console.log(inputValue);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading_spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    }
    else {
        loadingSpinner.classList.add("hidden")
    }
}
const handleShowAllBtn = () => {
    // searchBtn(isShowAll);
    searchBtn(true)
    // console.log('Show all clicked');
}


loadData()
const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) => {
    const phoneContainers = document.getElementById('phones_container');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainers.appendChild(div)
    });
    // console.log(phones);
}

loadData()
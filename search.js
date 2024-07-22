function search_barang() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let cards = document.getElementsByClassName('col-md-2');
    let produkTidakAda = document.getElementById('produkTidakAda'); 

    let found = false; 

    for (let i = 0; i < cards.length; i++) {
        let cardTitle = cards[i].getElementsByClassName('card-title1')[0];

        if (cardTitle) {
            let titleText = cardTitle.innerText.toLowerCase();
            if (!titleText.includes(input)) {
                cards[i].style.display = "none";
            } else {
                cards[i].style.display = "block";
                found = true;
            }
        } else {
            cards[i].style.display = "none";
        }
    }

    if (!found) {
        produkTidakAda.style.display = "block";
    } else {
        produkTidakAda.style.display = "none";
    }
}

let isLoading = false
let fetchData = (cb, news) => {

    let loader = document.getElementById("loader")
    loader.style.display = 'block'
    fetch(`https://newsapi.org/v2/everything?q=${news}&apikey=5f8d1df4f9344b0eaa5dc1b8dbac2cbf`)
        .then((res) => res.json())
        .then((res) => cb(res))
        .catch(error => {
            loader.style.display = 'none'; 
            console.error('Error fetching data:', error);
            isLoading = false;
        });
        
}


let displayData = (value) => {
    const apiData = value.articles;
    loader.style.display = "none"
    let cardMain = document.getElementById("cardMain");
    cardMain.innerHTML = ""; 

    

    apiData.forEach((item) => {
        let imageMissing;

        if(item.urlToImage === null || item.urlToImage ===""){
            imageMissing = "https://www.constantcontact.com/blog/wp-content/uploads/2021/04/Social-4.jpg"
        }
        else{
            imageMissing = item.urlToImage
        }

        let pstTime = convertToPST(item.publishedAt);
        cardMain.innerHTML += `
            <div class="col-12 col-sm-12 col-md-4 col-lg-4">
                <div class="cardContent">
                    <div class="card">
                        <div class="imgCard">
                            <img src="${imageMissing}" alt="">
                        </div>
                        <div class="cardTitle">
                            <h4>${item.title}</h4>
                        </div>
                        <div class="cardDescription">
                            <p>${item.description}</p>
                        </div>
                        <div class="cardPublish">
                            <p>${pstTime}</p>
                            <h5>${item.author}</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
    })
    
}


let newFetchData = (category) => {
    cardMain.innerHTML = "";
    fetchData(displayData, category);
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchInput = document.querySelector('.searchContent input').value;
    cardMain.innerHTML = ""; 
    loader.style.display = 'block';
    newFetchData(searchInput);
    isLoading = false
});


function convertToPST(utcTime) {
    let date = new Date(utcTime);
    let utcMilliseconds = date.getTime();
    let pstMilliseconds = utcMilliseconds - (8 * 60 * 60 * 1000); // PST is UTC-8
    let pstDate = new Date(pstMilliseconds);
    return pstDate.toISOString().replace('T', ' ').substr(0, 19);
}


newFetchData('Finance');



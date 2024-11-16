// dayNightTheme = () => {
    
//     const date = new Date();
//     const hour = date.getHours();
//     if (hour>=7&&hour<19) {
//         document.body.style.backgroundColor = "white";
//         document.body.style.color = "black";
//     }
//     else {
//       document.body.style.backgroundColor = "black";
//        document.body.style.color = "white";   
//     }
// }
// window.addEventListener("load", dayNightTheme)

document.querySelector("#inputBox").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        apiRequest();
    }
})

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
})

const apiRequest=()=>{
    document.querySelector("#grid").textContent = "";

let input=document.querySelector("#inputBox");
    const url =
      "https://api.unsplash.com/search/photos?query=" +
      input.value +
      "&per_page=30&client_id=ri5WwPfY18f-XZLSbD3Nlit9N9HBxgXliUV0i88FRBE";


    fetch(url)

        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();

        })
        .then(data => {
            loadImages(data);
        })
        .catch(error => console.log(error));
}

const loadImages = (data) => {
  console.log("Appending images to grid:", data.results); // Debug log
  for (let i = 0; i < data.results.length; i++) {
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = "url(" + data.results[i].urls.small + ")";

    image.addEventListener("dblclick", function () {
      window.open(data.results[i].links.download, "_blank");
    });
    document.querySelector("#grid").appendChild(image);
  }
}
// Here we go!

const $gifHolder = $("#gif-holder");
const $searchValue = $("#search")

// add a gif with AJAX

function addGif(res) {
    let numbResult = res.data.length;
    if (numbResult) {
        let randomI = Math.floor(Math.random() * numbResult);
        // Add gif and columns with inline style attributes for ease
        let $addCol = $("<div>", {class: "col-md-10 col-15 mb-4" });
        let $addGif = $("<img>", {
            src : res.data[randomI].images.original.url,
            class: "w-100"
        })
        //  Add gif to holding area
        $addCol.append($addGif);
        $gifHolder.append($addCol);
    }
}

//  Form submission handling

$("form").on("submit", async function(e) {
    e.preventDefault();
    
    // CLear Search Box
    let searchTerm = $searchValue.val();
    $searchValue.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "gNHMMHm5tLbU46LOnzUHrfZzeRD4ywCW"
        }
    });
    addGif(response.data);
});

// Clear the gif holder

$("#delete").on("click",function() {
    $gifHolder.empty();
});
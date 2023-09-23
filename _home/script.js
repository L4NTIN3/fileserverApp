function SaveFile(){
    
    //change to your own local ip
    const ip = "192.168.1.121";

    
    var input = document.getElementById("insertedFile")
    var formData = new FormData()
    formData.append("file", input.files[0])

    const url = `http://${ip}:3000/tallenna`; // Replace with your actual server URL

    const requestOptions = {
        method: 'POST', // Use the POST method
        body: formData
    };


    fetch(url, requestOptions)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


}

function clickInput(){
    document.getElementById("insertedFile").click()
}

function showImg(){
    
    const inputFile = document.getElementById("insertedFile");
    const imageElement = document.getElementById("ladattavaKuva");
    
    if (inputFile.files && inputFile.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            imageElement.src = e.target.result;
        };
        
        reader.readAsDataURL(inputFile.files[0]);
    }
    
}

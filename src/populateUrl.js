const axios = require("axios");

const getAnime = async () => {
    return axios.get("http://localhost:8081/anime")
                .then(response => {
                    return response;
                })
                .catch(err => console.log(err));

    
}

const urls = async () => {
    getAnime()
        .then(async data => {
            for (const anime in data.data){
                const id = data.data[anime]._id;


                await axios.patch(`http://localhost:8081/anime/${id}`)
                
            }
        })
}


urls();
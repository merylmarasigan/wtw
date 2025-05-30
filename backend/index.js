import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data

dotenv.config();
const token = process.env.API_TOKEN;

// Enable CORS for your React app
app.use(cors({
    origin: 'http://localhost:3000' // React dev server URL
  }));



app.post('/find-movie', async (req,res) => {
    const title = req.body['title'];
    console.log(`finding movies with titles similar to: ${req.body['title']}`)


    try{
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query: title,
                include_adult: false,
                language: 'en-Us',
                page: 1
            },
            headers: {
                accept: 'application/json',
                Authorization: token
            }
        });


        const matches = []

        response.data.results.forEach((m) => {
            if(m['overview'] !== '' && m['video'] === false){
                matches.push({'title': m['original_title'], 'not a movie?': m['video'], 'id':m['id'], 'overview':m['overview'], 'release_date': m['release_date']})
            }
        })

        console.log(matches);
        res.send(matches)
       
    }catch(error){
        res.send(error.message);
    }


})

app.post('/where-to-stream', async (req,res) => {

    const type = req.body['type'];
    const id = req.body['id'];
    
    try{
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/watch/providers`, 
        {headers:{accept: 'application/json', Authorization: token}});


        const apiRes = response.data.results;
        const streaming = {};

        Object.keys(apiRes).forEach(country => {
            //for each country compile a list of all streaming sites
            const streamingSites = [];

            if('buy' in apiRes[country]){
                //go through all the sites where you can buy
                const buy = apiRes[country]['buy'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            if('rent' in apiRes[country]){
                //go through all the sites where you can rent
                const buy = apiRes[country]['rent'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            if('flatrate' in apiRes[country]){
                //go through all the sites where you can watch with flatrate subscription
                const buy = apiRes[country]['flatrate'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            streamingSites.sort()
            if(streamingSites.length > 0){
                streaming[country] = streamingSites;
            }

        })

        res.send(streaming);
        console.log(`STREAMING IN ${Object.keys(streaming).length} countries`)
    }catch(error){
        console.log(error.message)
    }

})
  
app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})
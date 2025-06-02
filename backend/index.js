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
// const brokenToken = 'invalid_token_for_testing'

// Enable CORS for your React app
app.use(cors({
    origin: 'http://localhost:3000' // React dev server URL
  }));



app.post('/find-movie', async (req,res) => {
    const title = req.body['title'];
    console.log(`finding movies with titles similar to: ${req.body['title']}`)

    //code to test 500 error
    if (title.toLowerCase() === 'error500') {
        console.log('!!!!!!!')
        return res.status(500).json({ error: `Failed to fetch streaming data (500)` });
    }


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

        //console.log(matches);
        res.send(matches)
       
    }catch(error){
        console.log('ERROR: ', error.message)
        if(error.response && error.response.status === 404){
            // Send empty object for 404 - no streaming data available
            res.status(404).json({ error: `Failed to fetch streaming data (${error.response.status})` });
        } else {
            // Send error status for other errors
            res.status(500).json({ error: `Failed to fetch streaming data (${error.response.status})` });
        }
    }


})

app.post('/find-series', async (req,res) => {
    //series title is included in the request and extracted from it
    const title = req.body['title'];
    //console.log(`finding tv shows with title similar to: ${title}`)

    //making api call to TheMovieDB API
    try{
        const response = await axios.get('https://api.themoviedb.org/3/search/tv',
            {
                params: {
                    query: title,
                    include_adult: false,
                    language:'en-Us',
                    page: 1
                },
                headers:{
                    accept: 'application/json',
                    Authorization: token
                }
            }
        );

        //after we get api response, we filter out results that don't have overviews
        const matches = [];

       
        response.data.results.forEach((s) => {
            if(s['overview'] !== ''){
                matches.push({'title': s['original_name'],'id':s['id'], 'overview':s['overview'], 'release_date': s['first_air_date']})
            }
        });

        //console.log(matches);
        res.send(matches);

    }catch(error){
        console.log('ERROR: ', error.message)
        if(error.response && error.response.status === 404){
            // Send empty object for 404 - no streaming data available
            res.status(404).json({ error: 'Failed to fetch streaming data' });
        } else {
            // Send error status for other errors
            res.status(500).json({ error: 'Failed to fetch streaming data' });
        }
    }
})

app.post('/where-to-stream', async (req,res) => {

    const type = req.body['type'];
    const id = req.body['id'];
    console.log(`https://api.themoviedb.org/3/${type}/${id}/watch/providers`)
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
                console.log('can buy in' , country)
                const buy = apiRes[country]['buy'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            if('rent' in apiRes[country]){
                console.log('can rent in' , country)
                //go through all the sites where you can rent
                const buy = apiRes[country]['rent'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            if('flatrate' in apiRes[country]){
                console.log('can flatrate in' , country)
                //go through all the sites where you can watch with flatrate subscription
                const buy = apiRes[country]['flatrate'];

                buy.forEach(site => {
                    if(!streamingSites.includes(site['provider_name'])){
                        streamingSites.push(site['provider_name'])
                    
                    }
                })
            }

            console.log(country, streamingSites)

            streamingSites.sort()
            if(streamingSites.length > 0){
                streaming[country] = streamingSites;
            }

        })

        res.send(streaming);
        console.log(`STREAMING IN ${Object.keys(streaming).length} countries`)
    }catch(error){
        if(error.response && error.response.status === 404){
            console.log('ERROR: ', error.message)
            // Send empty object for 404 - no streaming data available
            res.send({});
        }
    }

})
  
app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})
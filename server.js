const {client, syncAndSeed} = require('./db');
const path = require('path');
const faker = require('faker');
const express = require('express');

const app = express();


const port = process.env.PORT || 3000;

app.use('/styles', express.static(path.join(__dirname, 'styles')));


app.get('/',async(req,res,next) => {
    try{
        const response = await client.query('SELECT * FROM "Categories"');
        const categories = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel='stylesheet' href='/styles/styles.css' />
                </head>
                <body id='main-page'>
                <h1>GENRES</h1>
                    <ul>
                        ${categories.map(category => `
                        <li>
                        <a href= '/categories/${category.id}' />${category.name}
                        </li>`).join('')}
                    </ul>
                </body>
            </html>
        `)
    }
    catch(ex){
        next(ex)
    }
})

app.get('/categories/:id',async(req,res,next) => {
    try{
        const response = await client.query('SELECT * FROM "Movies" WHERE category_id=$1',[req.params.id]);
        const movies = response.rows;
        res.send(`
        <html>
            <head>
                <link rel='stylesheet' href='/styles/styles.css' />
            </head>
            <body id = 'movie-page'>
                <h1><a href='/' />MOVIES</h1>
                <ul>
                    ${movies.map(movie => `
                    <li>
                    <a href= '/movies/${movie.id}' />${movie.name}
                    </li>`).join('')}
                </ul>
            </body>
        </html>
    `)
    }
    catch(ex){
        next(ex)
    }
})
app.get('/movies/6', async(req,res,next) => {
    try{
    res.send(`
    <html>
    <body>
    <h1><a href ='https://www.youtube.com/watch?v=Z_Nwm7E_iuA'/>DONT CLICK</a></h1>
    </body>
    </html>
    `)
    } catch(ex){
        next(ex);
    }

})
app.get('/movies/:id',async(req,res,next) => {
    try{
        const response = await client.query('SELECT * FROM "Descriptions" WHERE id=$1',[req.params.id]);
        const descript = response.rows[0];
        //res.send(descript)
        res.send(`
        <html>
            <head>
                <link rel='stylesheet' href='/styles/styles.css' />
            </head>
            <body id = 'details-page'>
                <h1><a href = '/categories/${descript.movies_id}' >Description</a></h1>
                <div>RATING: ${descript.rating}</div>
                <p>${descript.bio = faker.lorem.paragraphs(3)}</p>
            </body>
        </html>
        `)
    }
    catch(ex){
        next(ex)
    }
})




const init = async() =>{
    try{
        await client.connect()
        await syncAndSeed()

        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
}
init();




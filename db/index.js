const pg = require('pg');
const client = new  pg.Client('postgres://localhost/movies_db');


const syncAndSeed = async() => {
    const SQL = `
        DROP TABLE IF EXISTS "Descriptions";
        DROP TABLE IF EXISTS "Movies";
        DROP TABLE IF EXISTS "Categories";
        CREATE TABLE "Categories"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
        CREATE TABLE "Movies"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category_id INTEGER REFERENCES "Categories"(id)
        );
        CREATE TABLE "Descriptions"(
            id INTEGER PRIMARY KEY,
            bio VARCHAR(500) NOT NULL,
            rating VARCHAR(100) NOT NULL,
            movies_id INTEGER REFERENCES "Movies"(id)        
            );

        INSERT INTO "Categories"(id,name) VALUES(1, 'Horror');
        INSERT INTO "Categories"(id,name) VALUES(2, 'Disney');
        INSERT INTO "Categories"(id,name) VALUES(3, 'Life Changing');
        INSERT INTO "Movies"(id,name,category_id) VALUES(1,'Annabelle',1);
        INSERT INTO "Movies"(id,name,category_id) VALUES(2,'Paranormal Activity',1);
        INSERT INTO "Movies"(id,name,category_id) VALUES(3,'Treasure Planet',2);
        INSERT INTO "Movies"(id,name,category_id) VALUES(4,'Atlantis',2);
        INSERT INTO "Movies"(id,name,category_id) VALUES(5,'Shrek',3);
        INSERT INTO "Movies"(id,name,category_id) VALUES(6,'Shrek 2',3);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(1,'ANNA BIO','**',1);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(2,'PA BIO','****',1);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(3,'TP BIO','*****',2);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(4,'AT BIO','****',2);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(5,'SHREK BIO','*****',3);
        INSERT INTO "Descriptions"(id,bio,rating, movies_id) VALUES(6,'SHREK 2 BIO','**',3);
 
    
    `;
    await client.query(SQL);
}

module.exports = {
    client,
    syncAndSeed
}
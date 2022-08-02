let pool = require("./bd");


async function todasLasPeliculas(){
    
        let query ="select * from peliculas";
        let rows = await pool.query(query);
        //console.log(rows)
        return rows
    
}
async function agregarProducto(obj){
    try{
        let query ="insert into peliculas set ?";
        let rows = await pool.query(query, [obj])
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {todasLasPeliculas, agregarProducto}
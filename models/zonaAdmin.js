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
async function borrar(id){
    let query = "delete from peliculas where id = ?";
    let rows = await pool.query(query, [id]);
    return rows
}

async function actualizar(id) {
    let query = "select * from peliculas where id = ?"
    let rows = await pool.query(query, [id]);
    return rows[0]
}

async function modificarecho(obj, id){
    try{
        let query = "update peliculas set ? where id=?";
        let rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        throw error
    }
}



module.exports = {todasLasPeliculas, agregarProducto, borrar, actualizar, modificarecho}
import { client } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    let insertedUser = null;
    try{
        await client.connect()
        const insertQuery = "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *"
        const values = [username, password, name];
        const result = await client.query(insertQuery, values);
        insertedUser = result.rows[0];
    }catch(err){
        console.log(err);
    }finally{
        await client.end();
    }
    return insertedUser;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try{
        await client.connect();
        const query = "SELECT * FROM users WHERE id = $1";
        const values = [userId];
        const result = await client.query(query, values);
        
        if(result.rows.length>0){
            return result.rows[0];
        } else{
            return null;
        }
    } catch(err){
        console.log('Error retrieving user', err);
    }
    finally{
        await client.end();
    }
}

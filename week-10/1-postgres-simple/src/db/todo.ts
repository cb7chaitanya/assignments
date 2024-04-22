import { client } from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    let insertedTodo = null;
    try{
        await client.connect();
        const insertQuery = "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *";
        const values = [userId, title, description];
        const result = await client.query(insertQuery, values);
        insertedTodo = result.rows[0];
    } catch(err){
        console.log(err);
    } finally{
        await client.end();
    }
    return insertedTodo;
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    let updatedTodo = null;
    try{
        await client.connect();
        const query = 'UPDATE todos SET done = true WHERE id = $1 RETURNING *';
        const values = [todoId];
        const result = await client.query(query, values);
        updatedTodo = result.rows[0]
    } catch(err){
        console.log(err);
    } finally{
        await client.end();
    }
    return updatedTodo;
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    let allTodos = null;
    try{
        await client.connect();
        const query = "SELECT * FROM todos WHERE user_id = $1";
        const values = [userId]
        const result = await client.query(query, values);
        allTodos = result.rows[0];
    } catch(err){
        console.log(err);
    } finally {
        await client.end();
    }
    return allTodos;
}
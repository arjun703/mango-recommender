import { databaseConnection, executeQuery } from "@/app/lib/db";
import { filterAlphanumeric, generateRandomString } from "@/app/lib/helpers";

export  async function POST(request:any) {

    let connection:any = false

    try{    

        connection = await databaseConnection()
        
        const data = await request.formData()

        const name = data.get('name').replaceAll("'", '')

        const bio = data.get('bio').replaceAll("'", '')

        const handle = name.trim().toLowerCase().replaceAll(' ', '-') + '-' + generateRandomString()

        let query = `
            INSERT INTO characters (handle, name, bio)
            VALUES ('${handle}', '${name}', '${bio}')
        `
        await executeQuery(connection, query)
  
        let verificationQuery = `SELECT * FROM characters WHERE handle='${handle}'`

        const justInsertedCharacter:any = await executeQuery(connection, verificationQuery)

        if(justInsertedCharacter.length !== 1) throw new Error("Errow inserting character")

        return new Response(JSON.stringify({ success: true, character: justInsertedCharacter[0] }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });
    
    }catch(error:any){

        return new Response(JSON.stringify({ success: false, msg: error.message}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    }finally{
        if(connection){
            connection.end()
        }
    }   

}


export  async function GET() {

    let connection:any = false

    try{    

        connection =  await databaseConnection();

        const query=  `SELECT * from characters ORDER BY id DESC`;

        const characters = await executeQuery( connection, query);

        // const character = data.get('character_id')

        return new Response(JSON.stringify({ success: true, characters: characters}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });
    
    }catch(error){

        return new Response(JSON.stringify({ success: false}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201
        });

    }finally{
        if(connection){
            connection.end()
        }
    }

}

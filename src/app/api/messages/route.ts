import { databaseConnection, executeQuery } from "@/app/lib/db";
import promptOpenAI from "./prompt-openai";

export  async function POST(request:any) {

    let connection:any  = false

    try{    

        const data = await request.formData()

        const message = data.get('message')
        
        const character_name = data.get('character_name')
        const character_bio = data.get('character_name')

        const system_supposed_to_be = 'You are playing the role of ' + character_name + ', ' + character_bio;

        const reply = await promptOpenAI(message, system_supposed_to_be)

        // const character = data.get('character_id')

        return new Response(JSON.stringify({ success: true, reply: reply}), {
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

export  async function GET(request:any) {

    let connection:any  = false

    const { searchParams } = new URL(request.url)
    const character_handle = searchParams.get('character_handle')

    try{    

        connection = await databaseConnection()

        let query = `SELECT * FROM characters WHERE handle ='${character_handle}' `

        const characterResponse:any = await executeQuery(connection, query)

        if(characterResponse.length !== 1) throw new Error("Character not found.")

        return new Response(JSON.stringify({ success: true, character_info: characterResponse[0], messages: []}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
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

// dbSetup.js
import { databaseConnection, executeQuery } from "@/app/lib/db";
import { queries } from "./queries";

export async function GET(){

    let connection:any = false 

    try{

        connection= await databaseConnection();

        for (let query of queries) {
            console.log(query)
            await executeQuery(connection, query);
        }

        return new Response(JSON.stringify({ success: true}), {
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
            connection.end();
        }
    }

}


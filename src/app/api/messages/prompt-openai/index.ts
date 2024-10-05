
import OpenAI from 'openai';


export default async function promptOpenAI(prompt: string, system_supposed_to_be:string){

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Make sure to set your API key in the .env.local file
        });
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { 
                    role: 'system',             
                    content: system_supposed_to_be
                },
                { 
                    role: 'user', 
                    content: prompt 
                }
            ]
        });

        return completion.choices[0].message.content

    }catch(error:any){
        throw new Error(error.message)
    }finally{

    }
    
}
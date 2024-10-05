export async function GET(request:any,  { params }: { params: { handle: string } }){

    const {handle} = params;



    return new Response(JSON.stringify({ success: true }), {
        headers: {
            "Content-Type": "application/json"
        },
        status: 201
    });
    
}
import { Box, Paper, Typography } from "@mui/material";

export default function  Messages({messages}:any){

  if(messages.length == 0){
    return(
      <div style={{textAlign:'center'}}>
        Empty as of now. Start a solid chat with your favourite character
      </div>
    )
  }

    return(
        <>
          <div style={{ flexGrow: 1, overflow: 'auto', padding: 2, marginBottom: 2 }}>
            {messages.map((msg:any) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor: msg.sender === 'You' ? '#e1f5fe' : '#eeeeee',
                    borderRadius: 2,
                    padding: 1,
                    maxWidth: '60%',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </div>
        </>
    )

}
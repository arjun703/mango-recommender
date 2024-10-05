'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Messages from './messages';
import { getRequest, postRequest } from '@/app/lib/rest-api';
import toast from 'react-hot-toast';
import TypingBubble from './typing-bubble';

type Message = {
  id: number;
  text: string;
  sender: string;
};

const Chat = ({ params }: any) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Ref for the messages container
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to detect Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if(isWaitingForResponse) return
      e.preventDefault(); // Prevent form submission or newline creation
      handleSendMessage(); // Trigger send on Enter key
    }
  };

  const handleSendMessage = async () => {
    try {

      if(isWaitingForResponse) return

      if (!inputMessage.trim()) throw new Error("Message can't be empty");
  
      const messageToSend = inputMessage; // Capture the message before resetting
  
      // Add new message (from user)
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: messageToSend, sender: 'You' },
      ]);
  
      setIsWaitingForResponse(true);
      setInputMessage(''); // Clear input after sending
      scrollToBottom(); // Scroll after sending
  
      // Send the message to the server
      const response = await postRequest(
        { message: messageToSend, character_name: characterInfo.name, character_bio: characterInfo.bio }, 
        '/api/messages/');
  
      if (response.success !== true) throw new Error("Error - " + response.msg);
  
      // Add new message (from server response)
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: response.reply, sender: params.handle },
      ]);
  
    } catch (error:any) {
      toast(error.message);
    } finally {
      setIsWaitingForResponse(false);
    }
  };
  
  const [isLoadingConversation, setisLoadingConversation] = useState(true)
  const [characterInfo,setCharacterInfo] = useState<any>({})

  useEffect(()=> {

    async function loadcharacterInfo(){

      try{

        const conversationsInfoResponse = await getRequest(`/api/messages?character_handle=${params.handle}`)
        if(conversationsInfoResponse.success !== true) throw new Error(conversationsInfoResponse.msg) 
        setCharacterInfo(conversationsInfoResponse.character_info)

      }catch(error:any){
        toast(error.message)
      }finally{
        setisLoadingConversation(false)
      }

    }
    loadcharacterInfo()

  }, [])

  if(isLoadingConversation){
    return(
      <>
        <h1>Loading Conversation</h1>
      </>
    )
  }

  if(!isLoadingConversation && !characterInfo ){
    return(
      <>
        <h1>Error Loading Conversation</h1>
      </>
    )
  }

  return (
    <Container maxWidth={'md'} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          overflowY: 'auto',
          marginBottom: '60px', // Make room for the input box
          // Hide scrollbar styles
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Safari, etc.
        }}
      >
        {/* Chat Header */}
        <Box sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: 2, marginBottom: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Chat with {params.handle    }
          </Typography>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingBottom: '30px',
            borderRadius: '8px',
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome, Safari
          }}
        >
          <Messages messages={messages} />
          {isWaitingForResponse && (
            <Box sx={{ textAlign: 'center', fontStyle: 'italic', color: '#888' }}>
              <TypingBubble />
            </Box>
          )}
          {/* Empty div at the end of messages to scroll to */}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>

      {/* Message Input Field - Fixed at the bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fafafa',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #e0e0e0',
          zIndex: 10, // Ensure it stays on top
        }}
      >
        <Container maxWidth={'md'} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            onKeyPress={handleKeyPress} // Listen for Enter key press
            size="small"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{ mr: 1, padding:'20px', background: 'white', borderRadius: '8px' }}
          />
          <IconButton disabled={isWaitingForResponse} color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Container>
      </Box>
    </Container>
  );
};

export default Chat;

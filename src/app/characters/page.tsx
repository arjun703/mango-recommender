'use client'
import { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Modal,
  Box,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

import { Button } from '@mui/joy';

import Link from 'next/link';

import toast from 'react-hot-toast';
import { getRequest, postRequest } from '../lib/rest-api';

// Styles for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Character = {
    id: number;
    handle: string;
    image_url: string;
    name: string;
    manga_title:string;
    bio: string;
    created_at: string;
    updated_at: string;
};

export default function Characters() {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isLoadingCharacters, setIsLoadingCharacters] = useState(true)
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isAddingNewCharacter, setIsAddingNewCharacter]= useState(false)

    useEffect(() => {

        async function loadCharacters(){

            try{   
                const charactersResponse  = await getRequest('/api/characters')
                if(charactersResponse.success !== true ) throw new Error(charactersResponse.msg)
                setCharacters(charactersResponse.characters)
            }catch(error:any){
                toast(error.message)
            }finally{
                setIsLoadingCharacters(false)
            }
        }

        loadCharacters()

    }, [])


    // Handle modal open/close
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setName(''); // Clear fields on close
        setBio('');
    };

    // Function to handle form submission
    const handleSubmit = async (e:any) => {

        try{
            e.preventDefault();
            setIsAddingNewCharacter(true)
            const addCharacterResponse = await postRequest({
                name,
                bio        
            }, '/api/characters' )
            if(addCharacterResponse.success !== true) throw new Error(addCharacterResponse.msg)
            setCharacters((prevCharacters) => [...prevCharacters, addCharacterResponse.character])
            handleClose(); // Close modal after submission
        }catch(error:any){
            toast(error.message)
        }finally{
            setIsAddingNewCharacter(false)
        }
    };

    if(isLoadingCharacters){
        return(
            <>
                <h1>Loading Characters</h1>
            </>
        )
    }

  return (
    <>
      <Container>
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={2}>
            {characters.map((character, index) => (
              <Link key={index} href={`/chat/${character.handle}`}>
                <Button variant="outlined" color="primary">
                  Chat with {character.name}
                </Button>
              </Link>
            ))}
            <Button   onClick={handleOpen}>
              Add your own Character
            </Button>
          </Stack>
        </div>
      </Container>

      {/* Modal for adding a new character */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Character
          </Typography>
          <Alert severity='info'>
            Hey, this form is just for testing whether the chat depends on character context.
          </Alert>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Character Name"
              variant="outlined"
              fullWidth
              disabled={isAddingNewCharacter}
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Character Bio"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={bio}
              disabled={isAddingNewCharacter}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button disabled={isAddingNewCharacter} variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button loading={isAddingNewCharacter} type="submit" color="primary">
                Add Character
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

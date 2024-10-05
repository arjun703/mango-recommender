import { Button, Container } from "@mui/material";
import Link from "next/link";

export default function Home(){
  return(
    <>
      <Container>
        
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
          <Link href={'/characters'}><h1>Chat with Manga Characters</h1></Link>
        </div>
      </Container>
    </>
  )
}


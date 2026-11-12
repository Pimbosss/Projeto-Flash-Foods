
import { Image } from 'expo-image'

export default function Imagem(){
    return(
    <Image
        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYv1yNoVl_lToa7qbS9dben3D-t2He1uiPuxWyJdmH8g&s=10'}}
         style={{ width: 100, height: 100, borderRadius:100, marginTop: 20, marginLeft:20 }}
    />
        
    
    )
}
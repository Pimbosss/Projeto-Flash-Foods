import './Main.css'
import Header from "./header.jsx"

export default function Main(props){
    return(
        <>
        <Header/>
        <main>
            <div>
                {props.children}
            </div>
        </main>
        </>
    )
}
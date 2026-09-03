import './main.css'
import Header from "./header.jsx"

export default function Main(props) {
    return (
        <>
            <Header />
            <main id={props.id}>
                {props.children}
            </main>
        </>
    )
}
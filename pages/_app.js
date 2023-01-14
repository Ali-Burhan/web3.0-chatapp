import '../styles/globals.css'



//INTERNAL IMPORT
import { ChatAppProvider} from "../context/ChatAppContext";
import {Navbar} from "../component/index";



const MyApp = ({ Component, pageProps }) => (
<div>
    <ChatAppProvider>
        <Navbar/>
<Component {...pageProps} />
    </ChatAppProvider>
</div>

)


export default MyApp

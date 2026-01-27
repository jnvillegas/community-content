import Nav from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './index.css'
import Theme from './components/Theme/Theme'

export default function WebLayout({ children }) {
    return (
        <div className="web-layout">
            <Nav />
            <Theme />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
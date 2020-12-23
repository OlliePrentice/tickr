
import Alert from '../components/alert'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
    return (
        <>
            <Meta />
            <Alert preview={preview} />
            <Header />
            <div className="min-h-screen bg-gray-100">
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}

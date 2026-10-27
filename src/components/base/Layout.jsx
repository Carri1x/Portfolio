import './Layout.scss';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
    return (
        <div className="page-layout">
            <Header />
            <main className="page-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
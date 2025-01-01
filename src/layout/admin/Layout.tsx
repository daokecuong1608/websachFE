import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;

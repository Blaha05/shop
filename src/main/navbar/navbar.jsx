import "./navbar.css"

export default function NavBar(){
    return(
        <div className="sidebar">
            <div className="logo">
                <i className="material-icons">dashboard</i>
                ByteMarket
            </div>
            <div className="line"></div>
            <a href="#" className="nav-item active">
                <i className="material-icons">house</i>
                Home
            </a>
            <a href="#" className="nav-item">
                <i className="material-icons">chat</i>
                Chat
            </a>
            <a href="#" className="nav-item">
                <i className="material-icons">receipt</i>
                Filter
            </a>
            <a href="#" className="nav-item">
                <i className="material-icons">save</i>
                Following
            </a>
            <a href="#" className="nav-item">
                <i className="material-icons">person</i>
                Profile
            </a>
            <a href="login" className="nav-item">
                <i className="material-icons">login</i>
                Sign In
            </a>
            <a href="/register" className="nav-item">
                <i className="material-icons">person_add</i>
                Sign Up
            </a>
            <a href="#" className="upgrade-btn">
                Conect us
            </a>
        </div>
    )
}
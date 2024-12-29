import { NavLink, Outlet } from "react-router"

const Dashboard = () => {
  return (
    <>
      <Outlet />

      <div className="footer">
        <NavLink className="footer-option" to="/">
          <img src="/assets/home.png" alt="Home Icon" className="footer-icon" />
          <p>INICIO</p>
        </NavLink>
        <NavLink className="footer-option" to="/progreso">
          <img src="/assets/Progreso.png" alt="Progreso Icon" className="footer-icon" />
          <p>PROGRESO</p>
        </NavLink>
        <NavLink className="footer-option" to="/perfil">
          <img src="/assets/editar_perfil.png" alt="Perfil Icon" className="footer-icon" />
          <p>PERFIL</p>
        </NavLink>
      </div>
    </>
  )
}

export { Dashboard }

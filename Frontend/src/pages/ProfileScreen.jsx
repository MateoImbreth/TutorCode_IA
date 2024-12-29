import './ProfileScreen.css'
import { useUserStore } from '../stores/user.store'

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user)

  return (
    <div className="profile-screen-container">
      <div className="profile-header">
        <img src="/assets/perfil.png" alt="Perfil" className="profile-image" />
        <div className="profile-username">
          <p>{user?.nombre || "Usuario"}</p>
          <img src="/assets/editar_perfil.png" alt="Editar perfil" className="edit-profile-icon" />
        </div>
      </div>
      <div className="profile-info">
        <h3>DATOS</h3>
        <p><strong>Nombre:</strong> {user?.nombre}</p>
        <p><strong>Correo electrónico:</strong> {user?.email}</p>
      </div>
    </div>
  )
}

export default ProfileScreen

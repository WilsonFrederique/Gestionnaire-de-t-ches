import { useParams, Link } from 'react-router-dom';

const users = [
  { id: 1, nom: 'Rakoto', prenom: 'Alice', password: 'alice123', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, nom: 'Randria', prenom: 'Bob', password: 'bob456', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, nom: 'Rasoanaivo', prenom: 'Charlie', password: 'charlie789', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, nom: 'Andriamasy', prenom: 'Dina', password: 'dina321', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, nom: 'Ravelo', prenom: 'Ella', password: 'ella654', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, nom: 'Rakotoniaina', prenom: 'Franck', password: 'franck007', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 7, nom: 'Raharison', prenom: 'Gina', password: 'gina000', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 8, nom: 'Rasolo', prenom: 'Hery', password: 'herypass', avatar: 'https://i.pravatar.cc/150?img=8' },
];

function UserDetail() {
  const { id } = useParams();
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return (
      <div className="container">
        <p>Utilisateur introuvable.</p>
        <Link to="/">Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="container user-detail">
      <h2>Détail de l’utilisateur</h2>
      <div className="bloc">
        <div>
          <img
            src={user.avatar}
            alt={`${user.prenom} ${user.nom}`}
            className="avatar"
          />
        </div>
        <div>
          <p><strong>Nom :</strong> {user.nom}</p>
          <p><strong>Prénom :</strong> {user.prenom}</p>
          <p><strong>Mot de passe :</strong> {user.password}</p>
        </div>
      </div>
      <Link to="/" className="back-link">← Retour à la liste</Link>
    </div>
  );
}

export default UserDetail;

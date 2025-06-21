import { Link } from 'react-router-dom';

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

function Home() {
  return (
    <div className="container">
      <h2>Liste des utilisateurs</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <Link to={`/user/${user.id}`}>{user.prenom} {user.nom}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

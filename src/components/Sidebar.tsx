import { FiSearch, FiX, FiHome } from 'react-icons/fi';

interface Props {
  search: string;
  setSearch: (val: string) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export default function Sidebar({ search, setSearch, isMobileMenuOpen, onCloseMobileMenu }: Props) {
  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <h2>Task Manager</h2>
        </div>
        <button 
          className="close-mobile-menu" 
          onClick={onCloseMobileMenu}
          aria-label="Fermer le menu"
        >
          <FiX size={24} />
        </button>
      </div>
      
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher des tâches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          aria-label="Rechercher des tâches"
        />
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <FiHome />
            <span>Toutes les tâches</span>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">WL</div>
          <div className="user-info">
            <span className="username">Wils Dev</span>
            <span className="email">wils@gmail.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

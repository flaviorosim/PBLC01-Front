import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Importa o hook de autenticação

export const MenuPage: React.FC = () => {
    // Pega o usuário (que contém o nome) e a função de logout do contexto
    const { user, logout } = useAuth();

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'poppins' }}>
            {/* SIDEBAR */}
            <div style={{ width: '400px', backgroundColor: '#5D8D5B', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="/nextExchangeLogo.png" alt="Logo" style={{ width: '200px', height: '190px', borderRadius: '12px' }} />
                </div>

                {/* MENU */}
                <div style={{ padding: '0 1rem' }}>
                    <p style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Menu</p>

                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { label: '📅 Reservation', path: '/reservation' },
                            { label: '🏠 Accommodation', path: '/accommodation' },
                            { label: '💬 Messages', path: '/messages' },
                            { label: '👥 Community', path: '/community' }
                        ].map((item, index) => (
                            <Link key={index} to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                                <li
                                    style={{
                                        backgroundColor: '#4d7749',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ÁREA PRINCIPAL */}
            <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
                {/* TOPO COM BARRA VERDE CLARA */}
                <div style={{ backgroundColor: '#A2BFA1', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem', color: 'white' }}>Home</h1>
                    {/* ✅ Exibe o nome do usuário logado e o ícone de logout */}
                    <div style={{ backgroundColor: '#dcdcdc', padding: '0.5rem 1rem', borderRadius: '20px', color: '#333', display: 'flex', alignItems: 'center' }}>
                        <span role="img" aria-label="user">👤</span>
                        <span style={{ marginLeft: '0.5rem', marginRight: '1rem' }}>{user ? user.name : 'User'}</span>
                        <button 
                            onClick={logout} 
                            title="Logout"
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                cursor: 'pointer',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#333'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* CONTEÚDO */}
                <div style={{ padding: '2rem' }}>
                    <h2>Bem-vindo!</h2>
                    <p>Selecione uma opção no menu para navegar.</p>
                </div>
            </div>
        </div>
    );
};

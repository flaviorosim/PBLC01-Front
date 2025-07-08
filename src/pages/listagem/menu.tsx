import React from 'react';

export const MenuPage: React.FC = () => {

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
                            { label: '📅 Reservation' },
                            { label: '🏠 Accommodation' },
                            { label: '💬 Messages' },
                            { label: '👥 Community' }
                        ].map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    backgroundColor: '#4d7749',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '8px',
                                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#426B40')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4d7749')}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ÁREA PRINCIPAL */}
            <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
                {/* TOPO COM BARRA VERDE CLARA */}
                <div style={{ backgroundColor: '#A2BFA1', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem', color: 'white' }}>Home</h1>
                    <div style={{ backgroundColor: '#dcdcdc', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                        <span role="img" aria-label="user">👤</span> Username
                    </div>
                </div>

            </div>
        </div>
    );
};

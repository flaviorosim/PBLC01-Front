import React from 'react';

export const ReservationPage: React.FC = () => {
    const reservations = [
        {
            family: 'Family name',
            location: 'Country, city',
            dateIn: '13/06/2022',
            dateOut: '27/04/2023',
            status: 'Confirmed',
        },
        {
            family: 'Family name',
            location: 'Country, city',
            dateIn: '04/06/2023',
            dateOut: '11/02/2024',
            status: 'Pending',
        },

    ];

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
                    <h1 style={{ fontSize: '2rem', color: 'white' }}>Reservation</h1>
                    <div style={{ backgroundColor: '#dcdcdc', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                        <span role="img" aria-label="user">👤</span> Username
                    </div>
                </div>

                {/* CONTEÚDO */}
                <div style={{ padding: '2rem 3rem', flex: 1 }}>
                    {/* BARRA DE BUSCA E BOTÃO */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="🔍 Search"
                            style={{
                                padding: '0.5rem',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                width: '300px',
                            }}
                        />
                        <button
                            style={{
                                backgroundColor: '#456D3A',
                                color: 'white',
                                padding: '0.75rem 1.25rem',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            + New Reservation
                        </button>
                    </div>

                    {/* TÍTULOS DAS COLUNAS */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        padding: '0 1rem'
                    }}>
                        <div>Family</div>
                        <div>Location</div>
                        <div>Date in</div>
                        <div>Date out</div>
                        <div>Status</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                    </div>

                    {/* CARDS DAS RESERVAS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {reservations.map((r, i) => (
                            <div
                                key={i}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '1rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto',
                                    alignItems: 'center',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <div>{r.family}</div>
                                <div>{r.location}</div>
                                <div>{r.dateIn}</div>
                                <div>{r.dateOut}</div>
                                <div>{r.status}</div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    alignItems: 'flex-end'
                                }}>
                                    <button
                                        style={{
                                            backgroundColor: '#e0e0e0',
                                            border: 'none',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '10px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d5d5d5')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: '#e0e0e0',
                                            border: 'none',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '10px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d5d5d5')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                                    >
                                        Delete   
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

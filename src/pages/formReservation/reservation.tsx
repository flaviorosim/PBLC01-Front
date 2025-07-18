import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../auth/AuthContext'; 

interface Reservation {
    id: number;
    beginDate: string;
    endDate: string;
    status: string;
    calendar: {
        host: {
            user: {
                name: string;
            };
            address: {
                country: string;
                city: string;
            } | null;
        }
    };
}

type ReservationFormData = {
    beginDate: string;
    endDate: string;
    status: string;
    exchangeStudentId: number;
    calendarId: number;
};

export const ReservationPage: React.FC = () => {
    const { user, logout } = useAuth();
    
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<ReservationFormData>({
        beginDate: '',
        endDate: '',
        status: 'pendente',
        exchangeStudentId: 1,
        calendarId: 1,
    });

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await api.get('/reservations');
            setReservations(response.data);
            setError(null);
        } catch (err) {
            setError('Error loading reservations.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await api.delete(`/reservations/${id}`);
                fetchReservations();
            } catch (err) {
                setError('Error deleting reservation.');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewClick = () => {
        setEditingId(null);
        setFormData({
            beginDate: '',
            endDate: '',
            status: 'pendente',
            exchangeStudentId: 1,
            calendarId: 1,
        });
        setIsFormVisible(true);
    };

    const handleEditClick = (reservation: Reservation) => {
        setEditingId(reservation.id);
        setFormData({
            beginDate: new Date(reservation.beginDate).toISOString().split('T')[0],
            endDate: new Date(reservation.endDate).toISOString().split('T')[0],
            status: reservation.status,
            exchangeStudentId: 1, 
            calendarId: 1,      
        });
        setIsFormVisible(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const submissionData = {
            ...formData,
            exchangeStudentId: Number(formData.exchangeStudentId),
            calendarId: Number(formData.calendarId),
        };

        try {
            if (editingId) {
                await api.put(`/reservations/${editingId}`, submissionData);
            } else {
                await api.post('/reservations', submissionData);
            }
            setIsFormVisible(false);
            fetchReservations();
        } catch (err) {
            setError(editingId ? 'Error updating reservation.' : 'Error creating reservation.');
        }
    };
    
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'poppins' }}>
            {/* SIDEBAR */}
            <div style={{ width: '400px', backgroundColor: '#5D8D5B', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to="/menu">
                        <img src="/nextExchangeLogo.png" alt="Logo" style={{ width: '200px', height: '190px', borderRadius: '12px' }} />
                    </Link>
                </div>
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
                                <li style={{ backgroundColor: '#4d7749', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                                    {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ÁREA PRINCIPAL */}
            <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
                <div style={{ backgroundColor: '#A2BFA1', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem', color: 'white' }}>Reservation</h1>
                    {/* ✅ Exibe o nome do usuário logado */}
                    <div style={{ backgroundColor: '#dcdcdc', padding: '0.5rem 1rem', borderRadius: '20px', color: '#333', display: 'flex', alignItems: 'center' }}>
                        <span role="img" aria-label="user">👤</span>
                        <span style={{ marginLeft: '0.5rem', marginRight: '1rem' }}>{user ? user.name : 'User'}</span>
                        {/* ✅ Ícone de Logout */}
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
                <div style={{ padding: '2rem 3rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <input type="text" placeholder="🔍 Search" style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '300px' }} />
                        <button onClick={handleNewClick} style={{ backgroundColor: '#456D3A', color: 'white', padding: '0.75rem 1.25rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            + New Reservation
                        </button>
                    </div>

                    {isFormVisible && (
                        <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
                            <h3>{editingId ? 'Editar Reserva' : 'Criar Nova Reserva'}</h3>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{display: 'flex', gap: '1rem'}}>
                                    <input type="date" name="beginDate" value={formData.beginDate} onChange={handleInputChange} required style={{flex: 1, padding: '0.5rem'}}/>
                                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required style={{flex: 1, padding: '0.5rem'}}/>
                                    <select name="status" value={formData.status} onChange={handleInputChange} style={{flex: 1, padding: '0.5rem'}}>
                                        <option value="pendente">Pendente</option>
                                        <option value="confirmada">Confirmada</option>
                                        <option value="cancelada">Cancelada</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="button" onClick={() => setIsFormVisible(false)} style={{ padding: '0.5rem 1rem'}}>Cancelar</button>
                                    <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#456D3A', color: 'white', border: 'none' }}>{editingId ? 'Salvar Alterações' : 'Criar Reserva'}</button>
                                </div>
                            </form>
                        </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto', fontWeight: 'bold', marginBottom: '1rem', padding: '0 1rem' }}>
                        <div>Family</div>
                        <div>Location</div>
                        <div>Date in</div>
                        <div>Date out</div>
                        <div>Status</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                    </div>

                    {loading && <p>Carregando...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {reservations.map((r) => (
                                <div key={r.id} style={{ backgroundColor: 'white', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <div>{r.calendar.host.user.name}</div>
                                    <div>{r.calendar.host.address ? `${r.calendar.host.address.country}, ${r.calendar.host.address.city}` : 'N/A'}</div>
                                    <div>{new Date(r.beginDate).toLocaleDateString()}</div>
                                    <div>{new Date(r.endDate).toLocaleDateString()}</div>
                                    <div>{r.status}</div>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button onClick={() => handleEditClick(r)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Update</button>
                                        <button onClick={() => handleDelete(r.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

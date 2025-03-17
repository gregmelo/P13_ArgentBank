import Button from "../Components/button/Button";
import userData from "../data/data"; // 🔥 Simule les comptes bancaires
import AccountCard from "../Components/accountCard/AccountCard";
import Input from "../Components/input/Input";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyUserProfile } from "../redux/slices/userSlice"; // 🔥 Action Redux pour modifier le profil utilisateur
import { updateUserData } from "../redux/services/apiService"; // 🔥 Service API pour mettre à jour les données utilisateur

export default function Dashboard() {
    const dispatch = useDispatch();

    // Récupération du token d'authentification depuis Redux
    const { token } = useSelector((state) => state.authentification) ?? null;

    // Récupération des informations de l'utilisateur depuis Redux
    const { user } = useSelector((state) => state.userProfile);

    // Gestion de l'état du formulaire de modification du profil utilisateur
    const [editingUser, setEditingUser] = useState(false);
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");    
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Synchronisation des champs avec les données utilisateur lorsqu'elles changent
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName ?? "");
            setLastName(user.lastName ?? "");
        }   
    }, [user]);

    // Extraction des comptes depuis les données simulées
    const { account } = userData;

    // Active le mode édition
    const handleEditName = () => {
        setEditingUser(true);
    };

    // Annule la modification et réinitialise les champs
    const handleCancelEdit = () => {
        setEditingUser(false);
        if (user) {
            setFirstName(user.firstName ?? "");
            setLastName(user.lastName ?? "");
        }
        setError('');
        setSuccess('');
    };

    // Sauvegarde les modifications du profil utilisateur
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation des champs
        if (!firstName.trim() && !lastName.trim()) {
            setError('The “First name” and “Last name” fields cannot be empty.');
            return;
        } else if (!firstName.trim()) {
            setError('The “First Name” field cannot be empty.');
            return;
        } else if (!lastName.trim()) {
            setError('The “Last Name” field cannot be empty.');
            return;
        }

        try {
            // Mise à jour des données utilisateur via l'API
            const updatedUser = await updateUserData(token, { firstName, lastName });
            
            // Mise à jour de Redux avec les nouvelles informations utilisateur
            dispatch(modifyUserProfile(updatedUser.body));

            setSuccess('User updated successfully');
            setEditingUser(false);
        } catch (error) {
            console.error("Erreur updateUserData:", error);
            setError(error.message);
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {editingUser ? (
                        <form onSubmit={handleSaveEdit} className="edit-form">
                            <div className='form-inputs'>
                                <Input
                                    type="text"
                                    id="firstname"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoComplete='firstname'
                                    placeholder={user?.firstName || 'First name'}
                                    className="input-wrapper"
                                />
                                <Input
                                    type="text"
                                    id="lastname"
                                    className="input-wrapper"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    autoComplete='lastname'
                                    placeholder={user?.lastName || 'Last name'}
                                />
                            </div>
                            <div className="form-buttons">
                                <Button text="Save" type="submit" className="save-button" />
                                <Button text="Cancel" type="button" className="cancel-button" onClick={handleCancelEdit} />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}
                        </form>
                    ) : (
                        <>
                            {user?.firstName} {user?.lastName}!
                            <br />
                            <Button text="Edit Name" className="edit-button" onClick={handleEditName} />
                        </>
                    )}
                </h1>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {Array.isArray(account) ? (
                account.map((account, index) => (
                    <AccountCard
                        key={index}
                        title={account.title}
                        amount={account.amount}
                        description={account.description}
                    />
                ))
            ) : (
                <p>Aucun compte disponible.</p>
            )}
        </main>
    );
}

import Button from "../Components/button/Button";
import userData from "../data/data"; // 🔥 Simule les comptes bancaires
import AccountCard from "../Components/accountCard/AccountCard";
import Input from "../Components/input/Input";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // 🔥 Pour rediriger si pas connecté
import { useSelector, useDispatch } from "react-redux";
import { modifyUserProfile } from "../redux/slices/userSlice"; // 🔥 Importe l'action pour modifier le profil
import { updateUserData } from "../redux/services/apiService"; // 🔥 Importe le service pour mettre à jour les données utilisateur

export default function Dashboard() {
    
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('Token dans localStorage avant Dashboard :', localStorage.getItem('authentificationToken'));
    const { token } = useSelector((state) => state.authentification) ?? null;
    console.log('Token dans Dashboard :', token);
    const { user } = useSelector((state) => state.userProfile); // 🔥 Récupère l’état user depuis Redux

    //gestion de l'état du profil utilisateur
    const [editingUser, setEditingUser] = useState(false);
    const [firstName, setfirstName] = useState(user?.firstName ?? "");
    const [lastName, setlastName] = useState(user?.lastName ?? "");    
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Synchronise les états locaux avec user lorsque user change
    useEffect(() => {
        if (user) {
            setfirstName(user.firstName ?? "");
            setlastName(user.lastName ?? "");
        }   
    }, [user]);

    const { account } = userData;



    const handleEditName = () => {
        setEditingUser(true);
    };

    const handleCancelEdit = () => {
        setEditingUser(false);
    // Réinitialise toujours aux valeurs actuelles de user
    if (user) {
        setfirstName(user.firstName ?? "");
        setlastName(user.lastName ?? "");
    }
    setError(''); // Réinitialise aussi les messages d'erreur
    setSuccess('');
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        console.log('handleSaveEdit appelé - Token actuel :', token);

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
          const updatedUser = await updateUserData(token, { firstName: firstName, lastName: lastName });
          console.log("Données utilisateur mises à jour:", updatedUser);
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
                                onChange={(e) => setfirstName(e.target.value)}
                                autoComplete='fistname'
                                placeholder={user?.firstName || 'firstname'}
                                className="input-wrapper"
                            />
                            <Input
                                type="text"
                                id="lastname"
                                className="input-wrapper"
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}
                                autoComplete='lastname'
                                placeholder={user?.lastName || 'lastname'}
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
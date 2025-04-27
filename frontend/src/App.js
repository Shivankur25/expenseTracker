import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from './services/expenseService';
import { setExpenses } from './store/slices/expenseSlice';
import Dashboard from './components/Dashboard';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import PrivateRoute from './components/Login/PrivateRoute';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { loginSuccess } from './store/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenseList } = useSelector(state => state.expenses);
  const { user, token, isAuthenticated } = useSelector(state => state.auth)


  const loadExpenses = async () => {
    const res = await fetchExpenses();
    console.log(res.data);
    dispatch(setExpenses(res.data));
  };

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess({ user,token }));
    }
  }, [token, user]);

  useEffect(() => {
    console.log(user, token, isAuthenticated);
    if (user && token && isAuthenticated) {
      loadExpenses().then(() => {
        navigate('/dashboard');
      });
    }
  }, [user, token, isAuthenticated, navigate]);



  return (
      <div className="App">
        <h1>{user?.username ? `${user.username}'s Expenses` : 'Expense Tracker'}</h1>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
              path="/dashboard"
              element={
                <PrivateRoute
                    component={(props) => <Dashboard {...props} expenses={expenseList} />}
                    user={user}
                />
              }
          />

          <Route path="/" element={user && token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
  );
}

export default App;

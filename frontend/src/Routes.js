import LoginPage from './core/LoginPage'
import StudentHome from './core/StudentHome'
import AdminHome from  './core/AdminHome'
import ChangeRequestForm from './Components/ChangeRequestForm'

const routes=[
    { path: '/', exact: true, name: 'Login' },
    { path: '/studentHome', name: 'StudentHome', component: StudentHome, exact: true },
    { path: '/adminHome', name: 'AdminHome', component: AdminHome, exact: true },
    { path: '/branchChangeRequest', name: 'BranchChangeRequest', component: ChangeRequestForm, exact: true }
]

export default routes;

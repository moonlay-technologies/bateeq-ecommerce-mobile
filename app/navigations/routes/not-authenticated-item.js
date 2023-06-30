import ResetPassword from '../../screens/Auth/ResetPassword';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import Onboarding from '../../screens/Onboarding/Onboarding';

export default [
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    name: 'Onboarding',
    component: Onboarding,
  },
];

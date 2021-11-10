import { Context } from 'lib/auth';
import { useContext } from 'react';

export const useAuth = () => useContext(Context);

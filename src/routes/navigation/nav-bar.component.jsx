import { Fragment, useContext } from 'react';
import { Outlet } from "react-router";
import { Link } from 'react-router-dom';
import './nav-bar.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const NavBar = () => {
    const {currentUser, setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
         await signOutUser();
         setCurrentUser(null);
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' 
                            onClick={signOutHandler}>SIGN OUT</span> )
                            : ( <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default NavBar;
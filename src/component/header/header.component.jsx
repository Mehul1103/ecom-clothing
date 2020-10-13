import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart-selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to = '/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
        <Link className='option' to='/shop'>SHOP</Link>
        <Link className='option' to='/shop'>CONTACT</Link>
        {currentUser ?
            (<div className='option' onClick={() => auth.signOut()}>SIGNOUT</div>)
            :
            (<Link className='option' to='/signup'>SIGNIN</Link>)
        }
        <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown/>
        }
    </div>
);

//it will update the component whenever store state is updated or changed. It will take the state from the store and return the updated object
const mapStateToProps = createStructuredSelector({          //createStrucutedState will automatically pass the state
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
})

export default connect(mapStateToProps) (Header);
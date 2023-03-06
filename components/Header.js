import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/">
            <a className="item">FoodChain</a>
            </Link>
            
            

        <Menu.Menu position="right">
            <Link route="/viewStatus">  
             <a className="item">View Status</a>
            </Link>  

            <Link route="/statusTable">  
             <a className="item">#</a>
            </Link>

            <Link route="/QRCode">  
             <a className="item">QR</a>
            </Link>      
        </Menu.Menu>
        </Menu>
    );
};

export default Header;
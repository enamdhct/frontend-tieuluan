export const metadata = {
    title: 'ArgiShop',
};

import { Providers } from "./providers";
import { metadata } from "./metadata"; // Import metadata from the new file
const inter = Inter({ subsets: ['latin'] });

function Layout({ children }) {
    return (
        <Providers>
            <div className={inter.className}>{children}</div>
        </Providers>
    );
}

export default Layout;

// In a server-side file where you can use metadata
import { metadata } from './metadata';

// Use metadata here

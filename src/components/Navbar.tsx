
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Distribution and Availability',
      path: '/distribution/dashboard'
    },
    {
      title: 'Content',
      path: '/content/dashboard'
    },
    {
      title: 'Price and Promotions',
      path: '/price-promotions/dashboard'
    },
    {
      title: 'Search Media',
      path: '/search-media/dashboard'
    }
  ];

  return (
    <nav className="bg-brand-navy shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-brand-brick rounded-lg flex items-center justify-center mr-3">
                <span className="text-brand-cream font-bold text-lg">M</span>
              </div>
              <span className="text-brand-cream text-xl font-bold">Meobyr</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`text-brand-cream hover:text-brand-light py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname.startsWith(item.path.split('/')[1]) ? 'text-brand-light' : ''
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

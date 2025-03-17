import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import { Link } from "react-router-dom";

const Footer = () => {
  // Helper function to render the appropriate link type (internal or external)
  const renderLink = (link) => {
    const isExternal = link.href.startsWith("http");
    
    if (isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-300 hover:text-orange-500 transition-colors"
        >
          {link.text}
        </a>
      );
    } else if (link.href.startsWith("/")) {
      return (
        <Link
          to={link.href}
          className="text-neutral-300 hover:text-orange-500 transition-colors"
        >
          {link.text}
        </Link>
      );
    } else {
      return (
        <a
          href={link.href}
          className="text-neutral-300 hover:text-orange-500 transition-colors"
        >
          {link.text}
        </a>
      );
    }
  };

  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-4">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <div className="group">
                  {renderLink(link)}
                  {link.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {link.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-4">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <div className="group">
                  {renderLink(link)}
                  {link.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {link.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-4">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <div className="group">
                  {renderLink(link)}
                  {link.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {link.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} XTX Train. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

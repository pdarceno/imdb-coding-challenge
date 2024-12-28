import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";
import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src="/imdb.svg"
              alt="IMDb logo"
              className="h-5 w-10 object-contain"
            />
            <span className="text-sm text-muted-foreground">Movie Search</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/pdarceno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/prosyarceno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://stackoverflow.com/users/12415287/real-quick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaStackOverflow size={20} />
            </a>
            <a
              href="mailto:pdarceno@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Built by Prosy Arceno • Pioneer Dev AI: IMDB Coding Challenge
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by OMDB API • Built with React, TypeScript & Tailwind
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border px-5 py-8 md:px-6">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Samuel Bonifacio.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="flex items-center text-sm text-muted-foreground">
              Hecho con <Heart className="h-4 w-4 text-primary mx-1" /> y mucho código
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

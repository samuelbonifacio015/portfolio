
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-border bg-muted/80 dark:bg-black/80">
      <div className="container mx-auto max-w-6xl">
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

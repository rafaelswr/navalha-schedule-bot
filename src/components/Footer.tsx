
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react";
import { useCompanyStore } from "@/store/companyStore";
import { GoogleMap } from "@/components/GoogleMap";

export const Footer = () => {
  const { info } = useCompanyStore();
  
  return (
    <footer className="bg-background text-foreground py-12 border-t">
      <div className="container mx-auto px-6 max-w-8xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-foreground text-xl font-semibold mb-4">{info.name}</h3>
            <p className="text-gray-300 mb-4">
              {info.description}
            </p>
            <div className="flex space-x-4">
              <a href={info.socialMedia.facebook} className="text-foreground hover:text-foreground transition-colors">
                <Facebook size={20} />
              </a>
              <a href={info.socialMedia.instagram} className="text-foreground hover:text-foreground transition-colors">
                <Instagram size={20} />
              </a>
              <a href={info.socialMedia.twitter} className="text-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground text-xl font-semibold mb-4">Horário</h3>
            <p className="text-gray-300 mb-2">Terça a Sexta: {info.workHours.weekdays}</p>
            <p className="text-gray-300 mb-2">Sábado: {info.workHours.saturday}</p>
            <p className="text-gray-300 mb-2">Domingo: {info.workHours.sunday}</p>
            <p className="text-gray-300">Segunda: {info.workHours.monday}</p>
          </div>

          <div>
            <h3 className="text-foreground text-xl font-semibold mb-4">Ligações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-600 hover:text-foreground transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/agendamento" className="text-gray-600 hover:text-foreground transition-colors">
                  Agendamento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-xl font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300 mb-2">
              <MapPin size={16} className="inline mr-1" /> {info.address}
            </p>
            <p className="text-gray-300 mb-2">{info.city}, {info.country}</p>
            <p className="text-gray-300 mb-2">Tel: {info.phone}</p>
            <p className="text-gray-300 mb-4">Email: {info.email}</p>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-8 rounded-lg overflow-hidden h-64 w-full">
          <GoogleMap 
            initialLat={info.location.lat} 
            initialLng={info.location.lng} 
            onLocationChange={null}
          />
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-gray-500">
          <p className="mb-2">&copy; {new Date().getFullYear()} {info.name}. Todos os direitos reservados.</p>
          <span className="font-semibold">
            Criado por <a href="https://norteweb.pt" target="_blank" rel="noopener noreferrer" aria-label="Visitar NorteWeb" className="text-foreground hover:opacity-80 underline">NorteWeb</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

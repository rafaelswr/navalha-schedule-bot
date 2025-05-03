
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react";
import { useCompanyStore } from "@/store/companyStore";
import { GoogleMap } from "@/components/GoogleMap";

export const Footer = () => {
  const { info } = useCompanyStore();
  
  return (
    <footer className="bg-navalha-black text-white py-12">
      <div className="container mx-auto px-6 max-w-8xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">{info.name}</h3>
            <p className="text-gray-300 mb-4">
              {info.description}
            </p>
            <div className="flex space-x-4">
              <a href={info.socialMedia.facebook} className="text-white hover:text-navalha-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href={info.socialMedia.instagram} className="text-white hover:text-navalha-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href={info.socialMedia.twitter} className="text-white hover:text-navalha-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Horário</h3>
            <p className="text-gray-300 mb-2">Terça a Sexta: {info.workHours.weekdays}</p>
            <p className="text-gray-300 mb-2">Sábado: {info.workHours.saturday}</p>
            <p className="text-gray-300 mb-2">Domingo: {info.workHours.sunday}</p>
            <p className="text-gray-300">Segunda: {info.workHours.monday}</p>
          </div>

          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Ligações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-navalha-gold transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-navalha-gold transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/agendamento" className="text-gray-300 hover:text-navalha-gold transition-colors">
                  Agendamento
                </Link>
              </li>
              <li>
                <Link to="/loja" className="text-gray-300 hover:text-navalha-gold transition-colors">
                  Loja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Contacto</h3>
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

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} {info.name}. Todos os direitos reservados.</p>
          <span className="font-semibold">
            Criado por <a href="https://norteweb.pt" target="_blank" rel="noopener noreferrer" aria-label="Visitar NorteWeb" className="text-blue-600 hover:text-blue-800">NorteWeb</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

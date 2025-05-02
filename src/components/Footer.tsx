
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-navalha-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Clube da Navalha</h3>
            <p className="text-gray-300 mb-4">
              Barbearia moderna com serviços de qualidade premium para homens exigentes.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-navalha-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-navalha-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-navalha-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Horário</h3>
            <p className="text-gray-300 mb-2">Terça a Sexta: 10h - 19h</p>
            <p className="text-gray-300 mb-2">Sábado: 10h - 19h</p>
            <p className="text-gray-300 mb-2">Domingo: Fechado</p>
            <p className="text-gray-300">Segunda: Fechado</p>
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
                <Link to="/contactos" className="text-gray-300 hover:text-navalha-gold transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-navalha-gold text-xl font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300 mb-2">Rua da Barbearia, 123</p>
            <p className="text-gray-300 mb-2">Lisboa, Portugal</p>
            <p className="text-gray-300 mb-2">Tel: +351 912 345 678</p>
            <p className="text-gray-300">Email: info@clubedanavalha.pt</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Clube da Navalha. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

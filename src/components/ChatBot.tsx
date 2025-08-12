
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const INITIAL_BOT_MESSAGE = {
  text: "Olá! Queres marcar um corte? Diz-me um dia e hora, e vejo já se está disponível.",
  isUser: false,
  timestamp: new Date(),
};

// Mock dos horários ocupados
const OCCUPIED_SLOTS: { [key: string]: string[] } = {
  "2025-05-03": ["10:30", "11:00", "15:00", "15:30"],
  "2025-05-06": ["14:00", "14:30", "16:00", "16:30"],
  "2025-05-07": ["12:00", "12:30", "17:00", "17:30"],
};

// Função para checar se um horário está disponível
const isSlotAvailable = (date: Date): boolean => {
  const dateStr = format(date, "yyyy-MM-dd");
  const timeStr = format(date, "HH:mm");
  
  // Se não há registro para essa data, todos os horários estão disponíveis
  if (!OCCUPIED_SLOTS[dateStr]) return true;
  
  // Verificar se o horário específico está ocupado
  return !OCCUPIED_SLOTS[dateStr].includes(timeStr);
};

// Função para encontrar o próximo horário disponível
const findNextAvailableSlot = (date: Date): Date => {
  let currentSlot = new Date(date);
  
  // Tentar os próximos slots em incrementos de 30 minutos
  for (let i = 0; i < 8; i++) { // Verifica os próximos 4 horas (8 slots de 30 min)
    currentSlot = new Date(currentSlot.getTime() + 30 * 60 * 1000);
    
    // Se sair do horário de funcionamento, ir para o próximo dia
    const hours = currentSlot.getHours();
    if (hours >= 19) {
      // Ir para o próximo dia às 10:00
      currentSlot.setDate(currentSlot.getDate() + 1);
      currentSlot.setHours(10, 0, 0, 0);
      
      // Pular domingo e segunda
      const dayOfWeek = currentSlot.getDay();
      if (dayOfWeek === 0) { // Domingo
        currentSlot.setDate(currentSlot.getDate() + 2);
      } else if (dayOfWeek === 1) { // Segunda
        currentSlot.setDate(currentSlot.getDate() + 1);
      }
    }
    
    if (isSlotAvailable(currentSlot)) {
      return currentSlot;
    }
  }
  
  // Se não encontrar nos próximos slots, retornar uma data no dia seguinte
  currentSlot.setDate(currentSlot.getDate() + 1);
  currentSlot.setHours(10, 0, 0, 0);
  return currentSlot;
};

// Função para processar a mensagem do usuário
const processUserMessage = (messageText: string): string => {
  const lowerText = messageText.toLowerCase();
  
  // Verificar se menciona uma data
  const dateRegex = /(\d{1,2})[/\s-](\d{1,2})(?:[/\s-](\d{2,4}))?/;
  const timeRegex = /(\d{1,2})(?:[h:.](\d{0,2}))?/;
  
  const dateMatch = lowerText.match(dateRegex);
  const timeMatch = lowerText.match(timeRegex);
  
  if (dateMatch && timeMatch) {
    // Extrair informações de data e hora
    const day = parseInt(dateMatch[1]);
    const month = parseInt(dateMatch[2]);
    const year = dateMatch[3] ? parseInt(dateMatch[3]) : new Date().getFullYear();
    const fullYear = year < 100 ? 2000 + year : year;
    
    const hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
    
    // Criar objeto de data
    const requestedDate = new Date(fullYear, month - 1, day, hours, minutes);
    
    // Verificar se é dia válido (terça a sábado)
    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return "Desculpa, estamos fechados aos domingos e segundas. Podemos marcar para outro dia da semana?";
    }
    
    // Verificar se está dentro do horário de funcionamento
    if (hours < 10 || hours >= 19) {
      return "O nosso horário de funcionamento é das 10h00 às 19h00. Podemos marcar para um horário dentro deste período?";
    }
    
    // Verificar disponibilidade
    if (isSlotAvailable(requestedDate)) {
      const formattedDate = format(requestedDate, "EEEE, d 'de' MMMM 'às' HH:mm", { locale: ptBR });
      return `Perfeito! Temos disponibilidade para ${formattedDate}. Para confirmar a marcação, por favor fornece o teu nome e número de telefone.`;
    } else {
      // Encontrar próximo horário disponível
      const nextSlot = findNextAvailableSlot(requestedDate);
      const formattedNextSlot = format(nextSlot, "EEEE, d 'de' MMMM 'às' HH:mm", { locale: ptBR });
      return `Desculpa, mas esse horário já está ocupado. O próximo horário disponível é ${formattedNextSlot}. Queres marcar para esse horário?`;
    }
  }
  
  if (lowerText.includes("preço") || lowerText.includes("custo") || lowerText.includes("valor")) {
    return "Os nossos cortes de cabelo começam nos 15€, e o serviço completo de barba e cabelo é 25€. Posso ajudar-te a marcar um horário?";
  }
  
  if (lowerText.includes("duração") || lowerText.includes("tempo") || lowerText.includes("demora")) {
    return "Os nossos serviços de corte de cabelo demoram cerca de 30 minutos. Queres agendar um horário?";
  }
  
  if (lowerText.includes("obrigado") || lowerText.includes("adeus") || lowerText.includes("até logo")) {
    return "Sempre ao dispor! Se precisares de mais alguma coisa, é só dizer. Até breve!";
  }
  
  return "Como posso ajudar com a tua marcação? Se quiseres agendar um corte, diz-me qual o dia e hora que preferes (ex: 10/05 às 14h).";
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Adicionar mensagem do usuário
    const userMessage = {
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Processar resposta do bot
    setTimeout(() => {
      const botResponse = {
        text: processUserMessage(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed right-6 bottom-6 rounded-full w-14 h-14 flex items-center justify-center bg-primary hover:bg-primary/90 shadow-lg z-40"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <div className="fixed right-6 bottom-6 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40 border border-gray-200">
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center rounded-t-lg">
            <div>
              <h3 className="font-semibold">Clube da Navalha</h3>
              <p className="text-xs text-gray-300">Assistente de Agendamento</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "mb-4 max-w-[75%] rounded-lg p-3", 
                  msg.isUser 
                    ? "ml-auto bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-gray-800"
                )}
              >
                {msg.text}
                <div className={cn(
                  "text-xs mt-1",
                  msg.isUser ? "text-gray-800" : "text-gray-500"
                )}>
                  {format(msg.timestamp, "HH:mm")}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escreve a tua mensagem..."
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
              <Button 
                onClick={handleSendMessage}
              >
              Enviar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

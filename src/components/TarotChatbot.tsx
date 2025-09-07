import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  card?: TarotCard;
}

interface TarotCard {
  name: string;
  image: string;
  meaning: string;
  keywords: string[];
  reversed?: boolean;
}

const tarotCards: TarotCard[] = [
  {
    name: 'Дурак',
    image: '🃏',
    meaning: 'Новые начинания, спонтанность, свобода. Время для нового путешествия в жизни.',
    keywords: ['новое начало', 'спонтанность', 'свобода', 'неопытность']
  },
  {
    name: 'Маг',
    image: '🎩',
    meaning: 'Сила воли, творчество, умение. У вас есть все инструменты для достижения целей.',
    keywords: ['сила воли', 'творчество', 'мастерство', 'концентрация']
  },
  {
    name: 'Верховная Жрица',
    image: '🌙',
    meaning: 'Интуиция, тайны, внутренняя мудрость. Доверьтесь своему внутреннему голосу.',
    keywords: ['интуиция', 'тайна', 'внутренняя мудрость', 'подсознание']
  },
  {
    name: 'Императрица',
    image: '👑',
    meaning: 'Плодородие, творчество, материнство. Время процветания и изобилия.',
    keywords: ['плодородие', 'творчество', 'забота', 'изобилие']
  },
  {
    name: 'Император',
    image: '⚡',
    meaning: 'Власть, стабильность, лидерство. Время взять контроль в свои руки.',
    keywords: ['власть', 'стабильность', 'лидерство', 'порядок']
  },
  {
    name: 'Влюбленные',
    image: '💕',
    meaning: 'Любовь, выбор, гармония. Важные решения в отношениях или партнерстве.',
    keywords: ['любовь', 'выбор', 'партнерство', 'гармония']
  },
  {
    name: 'Колесо Фортуны',
    image: '🎡',
    meaning: 'Удача, перемены, циклы. Поворотный момент в вашей судьбе.',
    keywords: ['удача', 'перемены', 'судьба', 'циклы']
  },
  {
    name: 'Звезда',
    image: '⭐',
    meaning: 'Надежда, вдохновение, духовность. Время исполнения желаний.',
    keywords: ['надежда', 'вдохновение', 'мечты', 'духовность']
  },
  {
    name: 'Солнце',
    image: '☀️',
    meaning: 'Радость, успех, позитив. Период счастья и достижений.',
    keywords: ['радость', 'успех', 'оптимизм', 'энергия']
  },
  {
    name: 'Мир',
    image: '🌍',
    meaning: 'Завершение, достижение, гармония. Успешное окончание важного этапа.',
    keywords: ['завершение', 'достижение', 'гармония', 'целостность']
  }
];

const TarotChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Добро пожаловать! Я ваш персональный таролог. Задайте вопрос о вашей жизни, и я вытяну карту для вас. 🔮✨',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getRandomCard = (): TarotCard => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const card = { ...tarotCards[randomIndex] };
    card.reversed = Math.random() < 0.3; // 30% шанс на перевернутую карту
    return card;
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('любов') || lowerQuestion.includes('отношени') || lowerQuestion.includes('сердц')) {
      return 'Вопросы сердца всегда сложны. Эта карта раскроет тайны ваших чувств.';
    }
    
    if (lowerQuestion.includes('работ') || lowerQuestion.includes('карьер') || lowerQuestion.includes('деньг') || lowerQuestion.includes('финанс')) {
      return 'Материальные вопросы требуют мудрости. Позвольте картам указать вам путь к процветанию.';
    }
    
    if (lowerQuestion.includes('здоров') || lowerQuestion.includes('болез')) {
      return 'Тело и дух связаны. Эта карта покажет, что влияет на ваше благополучие.';
    }
    
    if (lowerQuestion.includes('будущ') || lowerQuestion.includes('судьб')) {
      return 'Будущее туманно, но карты могут приоткрыть завесу тайны.';
    }
    
    const responses = [
      'Вселенная услышала ваш вопрос. Позвольте этой карте стать вашим проводником.',
      'Энергии сходятся вокруг вашего вопроса. Эта карта несет важное послание.',
      'Древняя мудрость Таро откликается на ваш зов. Внимательно изучите эту карту.',
      'Карты выбрали именно эту для ответа на ваш вопрос. Доверьтесь их мудрости.',
      'Ваша душа готова к получению знания. Эта карта раскроет скрытые аспекты ситуации.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Имитируем задержку для более реалистичного общения
    setTimeout(() => {
      const card = getRandomCard();
      const response = generateResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        card: card
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-mystical-purple to-mystical-purple-light hover:from-mystical-purple-light hover:to-purple-600 shadow-2xl border-0 z-50 animate-pulse"
          size="lg"
        >
          <Icon name="MessageCircle" size={24} className="text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm z-50 animate-scale-in">
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-mystical-purple to-mystical-purple-light rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔮</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Таролог ИИ</h3>
                  <p className="text-xs text-purple-100">Онлайн</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-3 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-mystical-purple text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      
                      {/* Tarot Card */}
                      {message.card && (
                        <div className="mt-2 p-3 bg-gradient-to-br from-mystical-purple-soft to-purple-100 rounded-lg border border-mystical-purple-light/20">
                          <div className="text-center">
                            <div className="text-4xl mb-2 transform hover:scale-110 transition-transform cursor-pointer">
                              {message.card.reversed ? '🔄' : ''} {message.card.image}
                            </div>
                            <h4 className="font-bold text-mystical-purple mb-1">
                              {message.card.name}
                              {message.card.reversed && <span className="text-xs ml-1">(перевернутая)</span>}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">{message.card.meaning}</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {message.card.keywords.slice(0, 3).map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-mystical-purple/10 text-mystical-purple px-2 py-1 rounded-full"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-3 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос картам..."
                  className="flex-1 border-mystical-purple/20 focus:border-mystical-purple"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-mystical-purple hover:bg-mystical-purple-light"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default TarotChatbot;
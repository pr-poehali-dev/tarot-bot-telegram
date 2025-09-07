import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import TarotChatbot from '@/components/TarotChatbot';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const sections = [
    {
      title: 'Расклады Таро',
      description: 'Интерактивные расклады на разные жизненные ситуации',
      icon: 'Sparkles',
      gradient: 'from-mystical-purple via-mystical-purple-light to-mystical-purple-soft'
    },
    {
      title: 'Галерея Карт',
      description: 'Изучайте значения и символику карт Таро',
      icon: 'Image',
      gradient: 'from-mystical-purple-light via-purple-400 to-mystical-purple-soft'
    },
    {
      title: 'Обучение',
      description: 'Курсы и мастер-классы по тарологии',
      icon: 'BookOpen',
      gradient: 'from-purple-500 via-mystical-purple-light to-purple-300'
    },
    {
      title: 'Блог',
      description: 'Статьи о Таро, астрологии и эзотерике',
      icon: 'FileText',
      gradient: 'from-mystical-purple via-purple-600 to-mystical-purple-light'
    },
    {
      title: 'Контакты',
      description: 'Свяжитесь с нами для получения консультации',
      icon: 'MessageCircle',
      gradient: 'from-purple-600 via-mystical-purple to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystical-purple-soft via-white to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mystical-purple via-mystical-purple-light to-purple-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
              Таролог Чат-Бот
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Откройте тайны вселенной с помощью древнего искусства Таро. 
              Персональные расклады, консультации и обучение в одном месте.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-mystical-purple hover:bg-purple-50 font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                    <Icon name="Calendar" className="mr-2" />
                    Записаться на консультацию
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-mystical-purple">Запись на консультацию</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Ваше имя" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+7 (999) 999-99-99" />
                    </div>
                    <div>
                      <Label htmlFor="message">Ваш вопрос</Label>
                      <Textarea id="message" placeholder="Опишите вашу ситуацию..." />
                    </div>
                    <Button type="submit" className="w-full bg-mystical-purple hover:bg-mystical-purple-light">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-mystical-purple px-8 py-3 rounded-full transition-all duration-200">
                <Icon name="Play" className="mr-2" />
                Начать расклад
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-mystical-purple-soft to-transparent"></div>
      </header>

      {/* Hero Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-scale-in">
            <img 
              src="/img/d9926254-9023-4d99-bfd2-4db54616a14e.jpg" 
              alt="Mystical Tarot Cards" 
              className="rounded-2xl shadow-2xl mx-auto mb-8 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-mystical-purple">
            Наши Услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sections.map((section, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${section.gradient}`}></div>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-mystical-purple-soft group-hover:bg-mystical-purple-light transition-colors duration-300">
                    <Icon name={section.icon as any} size={28} className="text-mystical-purple" />
                  </div>
                  <CardTitle className="text-xl font-bold text-mystical-purple group-hover:text-mystical-purple-light transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-mystical-purple hover:bg-mystical-purple-light transition-colors">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mystical-purple to-mystical-purple-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Готовы узнать свое будущее?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Начните свой путь к самопознанию с персональной консультации таролога
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-mystical-purple hover:bg-purple-50 px-8 py-3 rounded-full transform hover:scale-105 transition-all">
                <Icon name="Star" className="mr-2" />
                Получить расклад
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-mystical-purple px-8 py-3 rounded-full transition-all">
                <Icon name="Users" className="mr-2" />
                Присоединиться к сообществу
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mystical-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-mystical-purple-light">Таролог Чат-Бот</h3>
              <p className="text-gray-300">
                Ваш персональный гид в мире Таро и эзотерики
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Расклады</a></li>
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Консультации</a></li>
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Обучение</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ресурсы</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Карты</a></li>
                <li><a href="#" className="hover:text-mystical-purple-light transition-colors">Гайды</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2" />
                  info@tarochatbot.ru
                </p>
                <p className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (999) 123-45-67
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Таролог Чат-Бот. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Tarot Chatbot */}
      <TarotChatbot />
    </div>
  );
};

export default Index;
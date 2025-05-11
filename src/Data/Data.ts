// Data.ts
import Car1 from "../assets/Img/car1.jpg";
import Car2 from "../assets/Img/car2.jpg";
import Car3 from "../assets/Img/car3.jpg";
import Car4 from "../assets/Img/car4.jpg";
import Car5 from "../assets/Img/car5.jpg";
import Car6 from "../assets/Img/car6.jpg";
import Car7 from "../assets/Img/car7.jpg";
import Car8 from "../assets/Img/car8.jpg";

import Mountains1 from "../assets/Img/mountains1.jpg";
import Mountains2 from "../assets/Img/mountains2.jpg";
import Mountains3 from "../assets/Img/mountains3.jpg";
import Mountains4 from "../assets/Img/mountains4.jpg";
import Mountains5 from "../assets/Img/mountains5.jpg";
import Mountains6 from "../assets/Img/mountains6.jpg";
import Mountains7 from "../assets/Img/mountains7.jpg";
import Mountains8 from "../assets/Img/mountains8.jpg";
import Mountains9 from "../assets/Img/mountains9.jpg";

import Dog1 from "../assets/Img/dog1.jpg";
import Dog2 from "../assets/Img/dog2.jpg";
import Dog3 from "../assets/Img/dog3.jpg";
import Dog4 from "../assets/Img/dog4.jpg";
import Dog5 from "../assets/Img/dog5.jpg";
import Dog6 from "../assets/Img/dog6.jpg";
import Dog7 from "../assets/Img/dog7.jpg";
import Dog8 from "../assets/Img/dog8.jpg";
import Dog9 from "../assets/Img/dog9.jpg";

// Интерфейс для фотографий
export interface Photo {
  id: number;
  photo: string;
  category: string;
  tags?: string[];
}

// Интерфейс для категорий
export interface Category {
  id: number;
  category: string;
  link: string;
}

// Массивы с данными
export const Photos: Photo[] = [
  { id: 1, photo: Car1, category: 'Car', tags: ['автомобиль', 'скорость', 'спорткар', 'драйв', 'мощность', 'гонки', 'адреналин', 'бмв', 'эстетика'] },
  { id: 2, photo: Car2, category: 'Car', tags: ['машина', 'город', 'дорога', 'автострада', 'ночной город', 'трасса', 'фары'] },
  { id: 3, photo: Car3, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт'] },
  { id: 4, photo: Car4, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт', 'бмв', 'эстетика'] },
  { id: 5, photo: Car5, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт', 'черно-белая', 'чб', 'эстетика'] },
  { id: 6, photo: Car6, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт', 'бмв', 'черно-белая', 'чб', 'фары'] },
  { id: 7, photo: Car7, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт', 'бмв', 'фары'] },
  { id: 8, photo: Car8, category: 'Car', tags: ['авто', 'гонка', 'трек', 'спортивная машина', 'дрифтер', 'турбо', 'асфальт', 'гонки'] },

  { id: 9, photo: Mountains1, category: 'Mountain', tags: ['горы', 'пейзаж', 'природа', 'воздух', 'панорама', 'экология', 'свобода'] },
  { id: 10, photo: Mountains2, category: 'Mountain', tags: ['горы', 'лето', 'путешествие', 'отдых', 'приключение', 'высота', 'каньон'] },
  { id: 11, photo: Mountains3, category: 'Mountain', tags: ['горы', 'снег', 'холод', 'горы', 'альпы', 'экстремальный туризм', 'ледники', 'зима'] },
  { id: 12, photo: Mountains4, category: 'Mountain', tags: ['горы', 'снег', 'красота', 'туризм', 'пейзаж', 'тропа', 'поход', 'лес', 'чистый воздух', 'черно-белая', 'чб'] },
  { id: 13, photo: Mountains5, category: 'Mountain', tags: ['горы', 'снег', 'горы', 'пейзаж', 'природа', 'воздух', 'панорама', 'экология', 'свобода'] },
  { id: 14, photo: Mountains6, category: 'Mountain', tags: ['горы', 'снег', 'скалы', 'лето', 'путешествие', 'отдых', 'приключение', 'высота', 'каньон'] },
  { id: 15, photo: Mountains7, category: 'Mountain', tags: ['горы', 'альпы', 'экстремальный туризм', 'цветы', 'зелень'] },
  { id: 16, photo: Mountains8, category: 'Mountain', tags: ['горы', 'красота', 'туризм', 'пейзаж', 'тропа', 'поход', 'лес', 'чистый воздух', 'черно-белая', 'чб', 'эстетика'] },
  { id: 17, photo: Mountains9, category: 'Mountain', tags: ['горы', 'красота', 'туризм', 'пейзаж', 'тропа', 'поход', 'лес', 'чистый воздух', 'зелень', 'речка'] },

  { id: 18, photo: Dog1, category: 'Dog', tags: ['собака', 'собаки', 'животные', 'питомец', 'дружба', 'верность', 'ласка', 'щенок'] },
  { id: 19, photo: Dog2, category: 'Dog', tags: ['собака', 'мило', 'улыбка', 'шерсть', 'домашний любимец', 'хвостик', 'радость'] },
  { id: 20, photo: Dog3, category: 'Dog', tags: ['собака', 'доберман', 'сторожевой', 'энергия', 'интеллект', 'мускулы', 'охрана', 'черно-белая', 'чб', 'эстетика'] },
  { id: 21, photo: Dog4, category: 'Dog', tags: ['собака', 'такса', 'короткие лапы', 'охотничья порода', 'преданность', 'компаньон', 'активность'] },
  { id: 22, photo: Dog5, category: 'Dog', tags: ['собака', 'такса', 'короткие лапы', 'охотничья порода', 'преданность', 'компаньон', 'активность', 'черно-белая', 'чб'] },
  { id: 23, photo: Dog6, category: 'Dog', tags: ['собака', 'животные', 'питомец', 'дружба', 'верность', 'ласка', 'щенок'] },
  { id: 24, photo: Dog7, category: 'Dog', tags: ['собака', 'мило', 'сторожевой', 'энергия', 'интеллект', 'мускулы', 'охрана', 'шерсть', 'домашний любимец', 'хвостик', 'радость'] },
  { id: 25, photo: Dog8, category: 'Dog', tags: ['собака', 'доберман', 'сторожевой', 'энергия', 'интеллект', 'мускулы', 'охрана', 'эстетика'] },
  { id: 26, photo: Dog9, category: 'Dog', tags: ['собака', 'собаки', 'добрая', 'смешная', 'улыбка', 'охотничья порода', 'преданность', 'компаньон', 'активность'] }
];

export const Categories = [
    { id: 1, category: "Горы", link: "/mountains" }, 
    { id: 2, category: "Машины", link: "/car" },     
    { id: 3, category: "Собаки", link: "/dog" },      
    {id: 4, category: "Избранное", link: "/fav"}  
  ];
  

import { BookOpen, Utensils, MessageCircle, ShieldAlert, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const etiquetteData = [
  {
    icon: <BookOpen className="w-6 h-6 text-theme-accent" />,
    title: "Local Customs",
    content: "Respect the indigenous Tujia traditions. Always ask permission before photographing locals in traditional dress. The region's 'Crying Marriage' is now a cultural performance—observe it with respectful curiosity."
  },
  {
    icon: <Utensils className="w-6 h-6 text-theme-accent" />,
    title: "Dining Manners",
    content: "Meals are typically served family-style on a lazy Susan. Use the provided serving chopsticks to transfer food to your bowl. Toasting is common—lower your glass below elders to show respect."
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-theme-accent" />,
    title: "Essential Phrases",
    content: "Nǐ hǎo (Hello), Xiè xiè (Thank you), Duō shǎo qián? (How much?), Tīng bù dǒng (I don't understand), Mǐ fàn (Rice), and Mǎi dān (Bill, please). Locals appreciate the effort!"
  },
  {
    icon: <Smartphone className="w-6 h-6 text-theme-accent" />,
    title: "Communication & Payments",
    content: "Cash is rarely used. Download Alipay and bind your international credit card before arrival. Western apps are blocked in China; download WeChat for communication and use a VPN."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-theme-accent" />,
    title: "Safety & Practicalities",
    content: "Enshi is incredibly safe for foreigners. However, hiking trails in the Grand Canyon involve thousands of steep stairs—sturdy footwear and summer hydration are absolute necessities."
  }
];

export default function Etiquette() {
  return (
    <section className="py-24 bg-theme-bg border-t border-[#eee]" id="etiquette">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="inline-block uppercase tracking-[2px] text-[11px] text-theme-accent font-bold mb-4">Know Before You Go</span>
          <h2 className="font-serif text-[36px] text-theme-primary mb-4">Cultural Etiquette & Practical Tips</h2>
          <p className="text-[16px] text-[#666] max-w-2xl leading-[1.6]">
            Navigating rural China is a profound experience. A little cultural awareness goes a long way in connecting with the Tujia people and making your journey smooth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {etiquetteData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 border border-[#eee] rounded-[4px] hover:border-theme-accent hover:shadow-[8px_8px_0px_rgba(176,141,87,0.1)] transition-all"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="font-serif text-[20px] text-theme-primary mb-3">{item.title}</h3>
              <p className="text-[14px] text-[#777] leading-[1.6]">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

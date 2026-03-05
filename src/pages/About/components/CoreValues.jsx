import { motion } from 'framer-motion'
import SectionWrapper from '../../../components/SectionWrapper'

const values = [
  {
    index: '01',
    title: 'The Art of Resilience',
    body: "One of my oldest and biggest passions is skateboarding. In that world, a trick isn't finished until it's landed cleanly. I apply this to web development by obsessing over the final user experience — viewing every bug as a necessary step toward perfect execution.",
    accent: '#2dd4bf',
  },
  {
    index: '02',
    title: 'Uncompromising Detail',
    body: "Quality isn't an afterthought; it's the blueprint. With 9 years of experience in technical testing, I see the 'invisible' details — page speed, security, and responsive breaks — that others miss. My work is engineered to be unbreakable.",
    accent: '#22b8c7',
  },
  {
    index: '03',
    title: 'Intentional Craftsmanship',
    body: "I love making music. Much like producing a track, great web development requires a balance of structure and soul. I build scaffolded code that is organized and scalable, ensuring the backend logic supports a beautiful, rhythmic front-end experience.",
    accent: '#2dd4bf',
  },
]

export default function CoreValues() {
  return (
    <SectionWrapper id="values" label="// core values">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] mb-14 leading-tight">
        What Drives <span className="text-[#2dd4bf]">My Work</span>
      </h2>

      <div className="flex flex-col gap-px bg-black/5">
        {values.map((v, i) => (
          <motion.div
            key={v.index}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-[#f9f7f7] p-8 md:p-10 group hover:bg-[#eeece9] transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              <span className="font-mono text-6xl font-bold text-black/5 group-hover:text-[#2dd4bf]/20 transition-colors duration-500 select-none shrink-0 leading-none">
                {v.index}
              </span>
              <div>
                <h3 className="font-sans font-bold text-2xl text-[#1e1e1e] mb-3">
                  {v.title}
                </h3>
                <p className="font-mono text-base font-medium text-[#555555] leading-relaxed max-w-2xl">
                  {v.body}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

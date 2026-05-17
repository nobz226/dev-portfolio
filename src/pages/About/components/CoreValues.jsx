import ModelLodCard from '../../../components/ModelLodCard'
import SectionWrapper from '../../../components/SectionWrapper'

const values = [
  {
    index: '01',
    title: 'The Art of Resilience',
    body: "One of my oldest and biggest passions is skateboarding. In that world, a trick isn't finished until it's landed cleanly. I apply this to web development by obsessing over the final user experience — viewing every bug as a necessary step toward perfect execution.",
    accent: '#2dd4bf',
    modelSrc: '/assets/3d/skateboard_-_used.glb',
  },
  {
    index: '02',
    title: 'Uncompromising Detail',
    body: "Quality isn't an afterthought; it's the blueprint. With 9 years of experience in technical testing, I see the 'invisible' details — page speed, security, and responsive breaks — that others miss. My work is engineered to be unbreakable.",
    accent: '#22b8c7',
    modelSrc: '/assets/3d/macbook_air_notebook_pbr.glb',
  },
  {
    index: '03',
    title: 'Intentional Craftsmanship',
    body: "I love making music. Much like producing a track, great web development requires a balance of structure and soul. I build scaffolded code that is organized and scalable, ensuring the backend logic supports a beautiful, rhythmic front-end experience.",
    accent: '#2dd4bf',
    modelSrc: '/assets/3d/midi_keyboard__piano__instrument.glb',
  },
]

export default function CoreValues() {
  return (
    <SectionWrapper id="values" label="// core values">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] mb-14 leading-tight">
        What Drives <span className="text-[#2dd4bf]">My Work</span>
      </h2>

      <div className="flex flex-col gap-px bg-black/5">
        {values.map((v) => (
          <ModelLodCard
            key={v.index}
            index={v.index}
            title={v.title}
            body={v.body}
            modelSrc={v.modelSrc}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

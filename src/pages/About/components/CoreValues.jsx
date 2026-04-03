import ModelViewerCard from '../../../components/ModelViewerCard'
import SectionWrapper from '../../../components/SectionWrapper'

const values = [
  {
    index: '01',
    title: 'The Art of Resilience',
    body: "One of my oldest and biggest passions is skateboarding. In that world, a trick isn't finished until it's landed cleanly. I apply this to web development by obsessing over the final user experience — viewing every bug as a necessary step toward perfect execution.",
    accent: '#2dd4bf',
    modelSrc: '/assets/3d_assets/skateboard_-_used.glb',
    hotspots: [
      { position: '0 0.05 0.1', normal: '0 0 1', label: 'Grip Tape' },
      { position: '0.15 0 -0.05', normal: '0 1 0', label: 'Wheels' },
      { position: '-0.15 0 -0.05', normal: '0 1 0', label: 'Bearings' },
    ],
  },
  {
    index: '02',
    title: 'Uncompromising Detail',
    body: "Quality isn't an afterthought; it's the blueprint. With 9 years of experience in technical testing, I see the 'invisible' details — page speed, security, and responsive breaks — that others miss. My work is engineered to be unbreakable.",
    accent: '#22b8c7',
    modelSrc: '/assets/3d_assets/macbook_air_notebook_pbr.glb',
    hotspots: [
      { position: '0.05 0.1 0.02', normal: '0 1 0', label: 'Display' },
      { position: '-0.1 0 0', normal: '1 0 0', label: 'Keyboard' },
      { position: '-0.15 -0.1 0', normal: '0 -1 0', label: 'Trackpad' },
    ],
  },
  {
    index: '03',
    title: 'Intentional Craftsmanship',
    body: "I love making music. Much like producing a track, great web development requires a balance of structure and soul. I build scaffolded code that is organized and scalable, ensuring the backend logic supports a beautiful, rhythmic front-end experience.",
    accent: '#2dd4bf',
    modelSrc: '/assets/3d_assets/midi_keyboard__piano__instrument.glb',
    hotspots: [
      { position: '0 0.05 0.1', normal: '0 0 1', label: 'Keys' },
      { position: '0.2 0.08 0', normal: '1 0 0', label: 'Knobs' },
      { position: '-0.2 0.08 0', normal: '-1 0 0', label: 'Faders' },
    ],
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
          <ModelViewerCard
            key={v.index}
            index={v.index}
            title={v.title}
            body={v.body}
            accentColor={v.accent}
            modelSrc={v.modelSrc}
            hotspots={v.hotspots}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

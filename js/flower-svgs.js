/**
 * POSYTEXTS.COM — Botanical Sketch SVG Engine
 * Hand-drawn botanical sketches with delicate line work, watercolor fills,
 * realistic stem geometry, and blooming/swaying animation classes.
 */

const FLOWER_SVGS = {
  // A - Anemone (Windflower)
  A: (uid) => `
    <g class="flower-bloom flower-anemone">
      <!-- Stem & Leaf -->
      <path class="botanical-stem" d="M100,105 Q98,160 100,240" stroke="#52796F" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M99,165 C85,155 65,158 55,170 C70,175 88,175 99,170" fill="#74A892" stroke="#354F52" stroke-width="1.2"/>
      <path class="botanical-leaf" d="M100,195 C115,185 135,188 145,200 C130,205 112,205 100,200" fill="#74A892" stroke="#354F52" stroke-width="1.2"/>
      <!-- Flower Head -->
      <g class="flower-head" transform="translate(100, 100)">
        <!-- Back Petals -->
        <path d="M0,0 C-35,-45 -55,-25 -45,10 C-35,35 0,0 0,0" fill="#E63946" stroke="#8D0801" stroke-width="1.5" opacity="0.95"/>
        <path d="M0,0 C-15,-60 25,-60 35,-20 C40,5 0,0 0,0" fill="#F72585" stroke="#7209B7" stroke-width="1.5" opacity="0.95"/>
        <path d="M0,0 C25,-40 55,-10 45,25 C30,45 0,0 0,0" fill="#D90429" stroke="#590D22" stroke-width="1.5"/>
        <path d="M0,0 C-30,20 -15,55 15,50 C35,45 0,0 0,0" fill="#FF4D6D" stroke="#A4161A" stroke-width="1.5"/>
        <path d="M0,0 C-50,-5 -45,35 -20,45 C-5,50 0,0 0,0" fill="#EF233C" stroke="#800F2F" stroke-width="1.5"/>
        <!-- Inner Details & Petal Veins -->
        <path d="M0,0 Q-25,-30 -35,-15" stroke="#590D22" stroke-width="0.8" fill="none" stroke-dasharray="1 2"/>
        <path d="M0,0 Q15,-40 20,-20" stroke="#590D22" stroke-width="0.8" fill="none" stroke-dasharray="1 2"/>
        <!-- Center Stamen Ring & Seed Pod -->
        <circle cx="0" cy="0" r="14" fill="#2B1E3A" stroke="#10002B" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="#48CAE4" stroke="#0077B6" stroke-width="1"/>
        <g stroke="#F8F9FA" stroke-width="1.2">
          <line x1="-12" y1="-8" x2="-8" y2="-5"/><line x1="12" y1="-8" x2="8" y2="-5"/>
          <line x1="-12" y1="8" x2="-8" y2="5"/><line x1="12" y1="8" x2="8" y2="5"/>
          <line x1="0" y1="-14" x2="0" y2="-9"/><line x1="0" y1="14" x2="0" y2="9"/>
          <line x1="-14" y1="0" x2="-9" y2="0"/><line x1="14" y1="0" x2="9" y2="0"/>
        </g>
      </g>
    </g>
  `,

  // B - Buttercup
  B: (uid) => `
    <g class="flower-bloom flower-buttercup">
      <path class="botanical-stem" d="M100,105 Q104,170 100,240" stroke="#52796F" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,175 C85,160 70,165 60,180 C80,185 95,182 101,175" fill="#84A98C" stroke="#354F52" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Layered Cups -->
        <ellipse cx="0" cy="0" rx="36" ry="32" fill="#FFD166" stroke="#D48B00" stroke-width="1.5"/>
        <path d="M-30,-5 C-25,-32 0,-38 22,-25 C35,-5 25,25 -5,30 C-25,28 -35,15 -30,-5 Z" fill="#FFB703" stroke="#C67D00" stroke-width="1.5"/>
        <path d="M-18,-15 C-10,-32 15,-28 20,-10 C25,12 5,22 -12,18 C-22,12 -22,-5 -18,-15 Z" fill="#FEE440" stroke="#B87700" stroke-width="1.3"/>
        <!-- Golden Stamens -->
        <circle cx="0" cy="0" r="10" fill="#52796F" stroke="#2F3E46" stroke-width="1"/>
        <circle cx="-4" cy="-3" r="2.5" fill="#FF7B00"/><circle cx="4" cy="-3" r="2.5" fill="#FF7B00"/>
        <circle cx="-3" cy="4" r="2.5" fill="#FF7B00"/><circle cx="4" cy="3" r="2.5" fill="#FF7B00"/>
        <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
      </g>
    </g>
  `,

  // C - Chamomile
  C: (uid) => `
    <g class="flower-bloom flower-chamomile">
      <path class="botanical-stem" d="M100,105 Q96,165 100,240" stroke="#52796F" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,160 C80,152 65,158 55,168 C75,170 90,166 98,160" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <path class="botanical-leaf" d="M101,190 C118,182 135,188 142,198 C122,200 108,196 101,190" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Radiating Ray Petals -->
        <g stroke="#CBD5E1" stroke-width="1.2" fill="#FFFFFF">
          <ellipse cx="0" cy="-34" rx="8" ry="18"/>
          <ellipse cx="24" cy="-24" rx="8" ry="18" transform="rotate(45 24 -24)"/>
          <ellipse cx="34" cy="0" rx="18" ry="8"/>
          <ellipse cx="24" cy="24" rx="8" ry="18" transform="rotate(-45 24 24)"/>
          <ellipse cx="0" cy="34" rx="8" ry="18"/>
          <ellipse cx="-24" cy="24" rx="8" ry="18" transform="rotate(45 -24 24)"/>
          <ellipse cx="-34" cy="0" rx="18" ry="8"/>
          <ellipse cx="-24" cy="-24" rx="8" ry="18" transform="rotate(-45 -24 -24)"/>
        </g>
        <!-- Center Golden Pincushion Dome -->
        <ellipse cx="0" cy="0" rx="18" ry="16" fill="#F4A261" stroke="#E76F51" stroke-width="1.5"/>
        <ellipse cx="0" cy="-2" rx="14" ry="12" fill="#E9C46A"/>
        <g fill="#DDA15E" opacity="0.85">
          <circle cx="-5" cy="-3" r="1.8"/><circle cx="5" cy="-3" r="1.8"/>
          <circle cx="0" cy="4" r="1.8"/><circle cx="-6" cy="3" r="1.5"/><circle cx="6" cy="3" r="1.5"/>
        </g>
      </g>
    </g>
  `,

  // D - Dahlia
  D: (uid) => `
    <g class="flower-bloom flower-dahlia">
      <path class="botanical-stem" d="M100,105 Q103,170 100,240" stroke="#52796F" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M99,170 C78,160 62,170 54,185 C75,190 92,180 99,170" fill="#74A892" stroke="#2F3E46" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Outer Star Petals -->
        <g fill="#FF8C66" stroke="#D84A28" stroke-width="1.2">
          <path d="M0,-46 Q-8,-25 0,0 Q8,-25 0,-46 Z"/>
          <path d="M33,-33 Q18,-18 0,0 Q28,-5 33,-33 Z"/>
          <path d="M46,0 Q25,-8 0,0 Q25,8 46,0 Z"/>
          <path d="M33,33 Q18,18 0,0 Q5,28 33,33 Z"/>
          <path d="M0,46 Q-8,25 0,0 Q8,25 0,46 Z"/>
          <path d="M-33,33 Q-18,18 0,0 Q-28,5 -33,33 Z"/>
          <path d="M-46,0 Q-25,-8 0,0 Q-25,8 -46,0 Z"/>
          <path d="M-33,-33 Q-18,-18 0,0 Q-5,-28 -33,-33 Z"/>
        </g>
        <!-- Mid Layer Petals -->
        <g fill="#FFA07A" stroke="#E65100" stroke-width="1">
          <circle cx="0" cy="-22" r="10"/><circle cx="22" cy="0" r="10"/>
          <circle cx="0" cy="22" r="10"/><circle cx="-22" cy="0" r="10"/>
          <circle cx="15" cy="-15" r="9"/><circle cx="15" cy="15" r="9"/>
          <circle cx="-15" cy="15" r="9"/><circle cx="-15" cy="-15" r="9"/>
        </g>
        <!-- Tight Center Rosette -->
        <circle cx="0" cy="0" r="15" fill="#FF6F00" stroke="#BF360C" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="8" fill="#FFE082" stroke="#FF8F00" stroke-width="1"/>
      </g>
    </g>
  `,

  // E - Edelweiss
  E: (uid) => `
    <g class="flower-bloom flower-edelweiss">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#6C8A74" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,175 C82,168 68,175 60,188 C80,190 92,185 98,175" fill="#90B494" stroke="#4F6D55" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Starry Woolly Bracts -->
        <g fill="#FAF9F6" stroke="#94A3B8" stroke-width="1.3">
          <path d="M0,0 C-12,-48 0,-55 6,-46 C10,-32 0,0 0,0 Z"/>
          <path d="M0,0 C28,-40 38,-42 38,-30 C32,-18 0,0 0,0 Z"/>
          <path d="M0,0 C45,-16 52,-8 44,4 C32,10 0,0 0,0 Z"/>
          <path d="M0,0 C40,24 38,36 26,34 C16,24 0,0 0,0 Z"/>
          <path d="M0,0 C6,48 -4,52 -10,42 C-12,28 0,0 0,0 Z"/>
          <path d="M0,0 C-32,36 -42,32 -38,20 C-28,12 0,0 0,0 Z"/>
          <path d="M0,0 C-48,10 -52,-2 -42,-8 C-28,-10 0,0 0,0 Z"/>
          <path d="M0,0 C-36,-30 -30,-42 -20,-36 C-12,-22 0,0 0,0 Z"/>
        </g>
        <!-- Center Woolly Yellow Dots -->
        <g fill="#E9C46A" stroke="#B8860B" stroke-width="1">
          <circle cx="0" cy="0" r="4"/>
          <circle cx="-5" cy="-5" r="3.2"/><circle cx="5" cy="-5" r="3.2"/>
          <circle cx="-6" cy="4" r="3.2"/><circle cx="6" cy="4" r="3.2"/>
          <circle cx="0" cy="-7" r="2.8"/><circle cx="0" cy="7" r="2.8"/>
        </g>
      </g>
    </g>
  `,

  // F - Forget-Me-Not
  F: (uid) => `
    <g class="flower-bloom flower-forgetmenot">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#52796F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,180 C116,170 130,175 138,188 C120,192 108,188 101,180" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Cluster of 3 Sky-Blue Florets -->
        <!-- Main Center Floret -->
        <g transform="translate(0, -6)">
          <g fill="#4EA8DE" stroke="#0077B6" stroke-width="1.2">
            <circle cx="0" cy="-14" r="7.5"/>
            <circle cx="13" cy="-4" r="7.5"/>
            <circle cx="8" cy="12" r="7.5"/>
            <circle cx="-8" cy="12" r="7.5"/>
            <circle cx="-13" cy="-4" r="7.5"/>
          </g>
          <circle cx="0" cy="0" r="5" fill="#FFF3B0" stroke="#E0A96D" stroke-width="1"/>
          <circle cx="0" cy="0" r="2" fill="#E63946"/>
        </g>
        <!-- Little Side Florets -->
        <g transform="translate(-24, 14) scale(0.65)">
          <g fill="#80BEEA" stroke="#0077B6" stroke-width="1.2">
            <circle cx="0" cy="-14" r="7.5"/><circle cx="13" cy="-4" r="7.5"/>
            <circle cx="8" cy="12" r="7.5"/><circle cx="-8" cy="12" r="7.5"/>
            <circle cx="-13" cy="-4" r="7.5"/>
          </g>
          <circle cx="0" cy="0" r="4.5" fill="#FFE66D" stroke="#DDA15E" stroke-width="1"/>
        </g>
        <g transform="translate(24, 12) scale(0.65)">
          <g fill="#90E0EF" stroke="#0077B6" stroke-width="1.2">
            <circle cx="0" cy="-14" r="7.5"/><circle cx="13" cy="-4" r="7.5"/>
            <circle cx="8" cy="12" r="7.5"/><circle cx="-8" cy="12" r="7.5"/>
            <circle cx="-13" cy="-4" r="7.5"/>
          </g>
          <circle cx="0" cy="0" r="4.5" fill="#FFE66D" stroke="#DDA15E" stroke-width="1"/>
        </g>
      </g>
    </g>
  `,

  // G - Gardenia
  G: (uid) => `
    <g class="flower-bloom flower-gardenia">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#3D5A40" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Glossy deep leaves -->
      <path d="M99,150 C70,135 50,145 42,165 C65,170 85,162 99,150" fill="#3A5A40" stroke="#1B4332" stroke-width="1.3"/>
      <path d="M101,175 C125,160 148,168 155,188 C135,192 115,185 101,175" fill="#3A5A40" stroke="#1B4332" stroke-width="1.3"/>
      <g class="flower-head" transform="translate(100, 92)">
        <!-- Swirling Ivory Rose Petals -->
        <g fill="#FFFDF2" stroke="#C2B89B" stroke-width="1.3">
          <ellipse cx="0" cy="-25" rx="20" ry="16"/>
          <ellipse cx="24" cy="-12" rx="18" ry="16" transform="rotate(30 24 -12)"/>
          <ellipse cx="22" cy="18" rx="19" ry="15" transform="rotate(65 22 18)"/>
          <ellipse cx="-4" cy="28" rx="20" ry="14"/>
          <ellipse cx="-25" cy="14" rx="18" ry="15" transform="rotate(-40 -25 14)"/>
          <ellipse cx="-22" cy="-16" rx="18" ry="15" transform="rotate(-25 -22 -16)"/>
        </g>
        <!-- Center Swirl -->
        <path d="M-12,-8 C-8,-18 10,-18 14,-6 C16,6 4,14 -6,10 C-14,6 -10,-4 -2,-6" fill="#F7F1DE" stroke="#B8A985" stroke-width="1.4"/>
        <circle cx="0" cy="0" r="5" fill="#FFEAA7" opacity="0.6"/>
      </g>
    </g>
  `,

  // H - Hydrangea
  H: (uid) => `
    <g class="flower-bloom flower-hydrangea">
      <path class="botanical-stem" d="M100,110 Q98,175 100,240" stroke="#52796F" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,170 C72,158 54,168 45,185 C70,190 90,182 98,170" fill="#74A892" stroke="#2F3E46" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 88)">
        <!-- Cloud of 4-petal florets in lavender & periwinkle -->
        <!-- Floret helper macro inside -->
        <g stroke="#6A4C93" stroke-width="0.9">
          <!-- Floret 1 -->
          <g transform="translate(0, -28)" fill="#B8B8FF">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
          <!-- Floret 2 -->
          <g transform="translate(-22, -14)" fill="#C8B6FF">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
          <!-- Floret 3 -->
          <g transform="translate(22, -14)" fill="#9381FF">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
          <!-- Floret 4 (Center) -->
          <g transform="translate(0, 0)" fill="#B8B8FF">
            <circle cx="-7" cy="0" r="6"/><circle cx="7" cy="0" r="6"/><circle cx="0" cy="-7" r="6"/><circle cx="0" cy="7" r="6"/>
            <circle cx="0" cy="0" r="2.5" fill="#FFEAA7"/>
          </g>
          <!-- Floret 5 -->
          <g transform="translate(-24, 12)" fill="#9381FF">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
          <!-- Floret 6 -->
          <g transform="translate(24, 12)" fill="#C8B6FF">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
          <!-- Floret 7 -->
          <g transform="translate(0, 24)" fill="#E8D7F1">
            <circle cx="-6" cy="0" r="5.5"/><circle cx="6" cy="0" r="5.5"/><circle cx="0" cy="-6" r="5.5"/><circle cx="0" cy="6" r="5.5"/>
            <circle cx="0" cy="0" r="2" fill="#FFEAA7"/>
          </g>
        </g>
      </g>
    </g>
  `,

  // I - Iris
  I: (uid) => `
    <g class="flower-bloom flower-iris">
      <path class="botanical-stem" d="M100,105 Q102,170 100,240" stroke="#3D5A40" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- Slender sword leaf -->
      <path d="M101,165 C120,120 135,130 145,90 C135,135 120,175 101,210" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Drooping Falls (Lower Petals) -->
        <g fill="#7B2CBF" stroke="#3C096C" stroke-width="1.4">
          <path d="M0,0 C-24,10 -35,32 -30,50 C-18,52 -10,32 0,0 Z"/>
          <path d="M0,0 C24,10 35,32 30,50 C18,52 10,32 0,0 Z"/>
          <path d="M0,0 C-10,20 0,48 0,55 C10,48 10,20 0,0 Z"/>
        </g>
        <!-- Golden Beard on Falls -->
        <ellipse cx="-20" cy="30" rx="3" ry="8" fill="#FFD166" transform="rotate(-20 -20 30)"/>
        <ellipse cx="20" cy="30" rx="3" ry="8" fill="#FFD166" transform="rotate(20 20 30)"/>
        <ellipse cx="0" cy="35" rx="3" ry="8" fill="#FFD166"/>
        <!-- Upright Standards (Top Petals) -->
        <g fill="#9D4EDD" stroke="#5A189A" stroke-width="1.4">
          <path d="M0,-5 C-22,-18 -18,-45 -4,-50 C-2,-30 0,-5 0,-5 Z"/>
          <path d="M0,-5 C22,-18 18,-45 4,-50 C2,-30 0,-5 0,-5 Z"/>
          <path d="M0,-5 C-8,-25 0,-55 0,-55 C8,-25 0,-5 0,-5 Z" fill="#C77DFF"/>
        </g>
      </g>
    </g>
  `,

  // J - Jasmine
  J: (uid) => `
    <g class="flower-bloom flower-jasmine">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,170 C80,160 70,165 60,178 C80,180 92,176 98,170" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Starry Pinwheel Petals -->
        <g fill="#FFFFFC" stroke="#CCD5AE" stroke-width="1.3">
          <path d="M0,0 C-8,-15 -12,-35 -3,-40 C4,-35 4,-15 0,0 Z"/>
          <path d="M0,0 C15,-8 35,-12 40,-3 C35,4 15,4 0,0 Z"/>
          <path d="M0,0 C18,12 28,30 20,38 C12,35 6,15 0,0 Z"/>
          <path d="M0,0 C-10,18 -26,30 -35,24 C-32,15 -14,6 0,0 Z"/>
          <path d="M0,0 C-20,-2 -38,-10 -35,-20 C-28,-22 -14,-10 0,0 Z"/>
        </g>
        <!-- Center Eye -->
        <circle cx="0" cy="0" r="4.5" fill="#E9EDC9" stroke="#CCD5AE" stroke-width="1"/>
        <circle cx="0" cy="0" r="2" fill="#D4A373"/>
      </g>
    </g>
  `,

  // K - King Protea
  K: (uid) => `
    <g class="flower-bloom flower-protea">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#3D5A40" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,170 C125,155 145,165 152,185 C132,190 114,182 101,170" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 90)">
        <!-- Artichoke Cup Base -->
        <path d="M-28,25 C-32,45 32,45 28,25 Z" fill="#588157" stroke="#344E41" stroke-width="1.3"/>
        <!-- Dramatic Spiky Pointed Bracts -->
        <g stroke="#800F2F" stroke-width="1.2">
          <!-- Back Bracts -->
          <path d="M-30,20 C-40,-5 -35,-25 -25,-40 C-22,-20 -15,10 -30,20 Z" fill="#A4161A"/>
          <path d="M30,20 C40,-5 35,-25 25,-40 C22,-20 15,10 30,20 Z" fill="#A4161A"/>
          <!-- Mid Spikes -->
          <path d="M-20,15 C-28,-15 -20,-38 -12,-52 C-8,-30 -8,10 -20,15 Z" fill="#C9184A"/>
          <path d="M20,15 C28,-15 20,-38 12,-52 C8,-30 8,10 20,15 Z" fill="#C9184A"/>
          <!-- Center Crown -->
          <path d="M-8,12 C-10,-20 -5,-45 0,-58 C5,-45 10,-20 8,12 Z" fill="#FF4D6D"/>
        </g>
        <!-- Center White/Gold Fluff -->
        <ellipse cx="0" cy="-5" rx="14" ry="18" fill="#FFF0F3" stroke="#FFB3C1" stroke-width="1"/>
        <path d="M-6,-20 L0,-32 L6,-20" stroke="#FF758F" stroke-width="1.2" fill="none"/>
      </g>
    </g>
  `,

  // L - Lavender
  L: (uid) => `
    <g class="flower-bloom flower-lavender">
      <path class="botanical-stem" d="M100,60 Q100,150 100,240" stroke="#52796F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Slender leaves -->
      <path d="M99,170 C88,150 78,160 70,175 C82,176 92,174 99,170" fill="#74A892" stroke="#354F52" stroke-width="1"/>
      <path d="M101,190 C112,170 122,180 130,195 C118,196 108,194 101,190" fill="#74A892" stroke="#354F52" stroke-width="1"/>
      <!-- Stack of purple florets along top wand -->
      <g stroke="#5A189A" stroke-width="1" fill="#9D4EDD">
        <ellipse cx="94" cy="65" rx="6" ry="4"/><ellipse cx="106" cy="63" rx="6" ry="4"/>
        <ellipse cx="100" cy="55" rx="5" ry="4" fill="#C77DFF"/>
        <ellipse cx="93" cy="78" rx="7" ry="5"/><ellipse cx="107" cy="76" rx="7" ry="5"/>
        <ellipse cx="92" cy="92" rx="8" ry="5.5"/><ellipse cx="108" cy="90" rx="8" ry="5.5"/>
        <ellipse cx="92" cy="106" rx="8" ry="5.5" fill="#7B2CBF"/><ellipse cx="108" cy="105" rx="8" ry="5.5" fill="#7B2CBF"/>
        <ellipse cx="93" cy="120" rx="7" ry="5"/><ellipse cx="107" cy="119" rx="7" ry="5"/>
        <ellipse cx="95" cy="133" rx="6" ry="4.5"/><ellipse cx="105" cy="132" rx="6" ry="4.5"/>
      </g>
    </g>
  `,

  // M - Marigold
  M: (uid) => `
    <g class="flower-bloom flower-marigold">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#3D5A40" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,165 C76,155 60,165 52,180 C74,184 88,176 98,165" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Fluffy ruffled pompom petals -->
        <g fill="#FB8500" stroke="#D00000" stroke-width="1.2">
          <circle cx="0" cy="-26" r="14"/><circle cx="24" cy="-12" r="14"/>
          <circle cx="24" cy="14" r="14"/><circle cx="0" cy="26" r="14"/>
          <circle cx="-24" cy="14" r="14"/><circle cx="-24" cy="-12" r="14"/>
        </g>
        <g fill="#FFB703" stroke="#E85D04" stroke-width="1.1">
          <circle cx="0" cy="-14" r="11"/><circle cx="14" cy="-6" r="11"/>
          <circle cx="12" cy="10" r="11"/><circle cx="-6" cy="14" r="11"/>
          <circle cx="-14" cy="-4" r="11"/>
        </g>
        <!-- Golden ruffled core -->
        <circle cx="0" cy="0" r="12" fill="#FFD166" stroke="#D48B00" stroke-width="1.3"/>
        <circle cx="0" cy="0" r="6" fill="#F48C06"/>
      </g>
    </g>
  `,

  // N - Narcissus (Daffodil)
  N: (uid) => `
    <g class="flower-bloom flower-narcissus">
      <path class="botanical-stem" d="M100,105 Q102,170 100,240" stroke="#52796F" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,160 C118,135 125,110 135,80 C128,125 116,165 101,200" fill="#74A892" stroke="#354F52" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- 6 Cream Star Petals -->
        <g fill="#FFFBEA" stroke="#E9C46A" stroke-width="1.3">
          <path d="M0,0 C-12,-20 -15,-42 0,-48 C15,-42 12,-20 0,0 Z"/>
          <path d="M0,0 C12,-18 38,-30 46,-18 C40,-5 20,4 0,0 Z"/>
          <path d="M0,0 C20,8 42,20 38,34 C24,35 10,18 0,0 Z"/>
          <path d="M0,0 C10,20 8,44 -4,48 C-14,40 -10,20 0,0 Z"/>
          <path d="M0,0 C-18,12 -38,26 -44,14 C-38,2 -18,-4 0,0 Z"/>
          <path d="M0,0 C-20,-10 -38,-28 -32,-38 C-18,-35 -8,-15 0,0 Z"/>
        </g>
        <!-- Frilled Golden Corona Trumpet -->
        <ellipse cx="0" cy="0" rx="16" ry="14" fill="#FFB703" stroke="#D48B00" stroke-width="1.4"/>
        <path d="M-15,-6 Q0,-12 15,-6 Q12,12 0,14 Q-12,12 -15,-6 Z" fill="#FB8500" opacity="0.8"/>
        <circle cx="0" cy="0" r="4" fill="#FFD166"/>
      </g>
    </g>
  `,

  // O - Orchid
  O: (uid) => `
    <g class="flower-bloom flower-orchid">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,180 C75,170 58,180 48,198 C72,202 88,192 98,180" fill="#74A892" stroke="#2F3E46" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Top Dorsal Sepal -->
        <path d="M0,0 C-15,-20 -12,-48 0,-52 C12,-48 15,-20 0,0 Z" fill="#F72585" stroke="#7209B7" stroke-width="1.3"/>
        <!-- Broad Lateral Wing Petals -->
        <ellipse cx="-26" cy="-12" rx="20" ry="16" fill="#FF70A6" stroke="#9D4EDD" stroke-width="1.3" transform="rotate(-15 -26 -12)"/>
        <ellipse cx="26" cy="-12" rx="20" ry="16" fill="#FF70A6" stroke="#9D4EDD" stroke-width="1.3" transform="rotate(15 26 -12)"/>
        <!-- Lower Lateral Sepals -->
        <path d="M0,0 C-15,10 -30,35 -24,44 C-12,40 -4,20 0,0 Z" fill="#B5179E" stroke="#560BAD" stroke-width="1.2"/>
        <path d="M0,0 C15,10 30,35 24,44 C12,40 4,20 0,0 Z" fill="#B5179E" stroke="#560BAD" stroke-width="1.2"/>
        <!-- Complex Labellum Lip Center -->
        <path d="M-10,4 C-12,18 0,26 0,26 C0,26 12,18 10,4 C5,8 -5,8 -10,4 Z" fill="#7209B7" stroke="#3A0CA3" stroke-width="1.3"/>
        <circle cx="0" cy="8" r="4.5" fill="#FFD166" stroke="#FB8500" stroke-width="1"/>
      </g>
    </g>
  `,

  // P - Peony
  P: (uid) => `
    <g class="flower-bloom flower-peony">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#3D5A40" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,165 C125,150 148,160 156,180 C136,186 116,178 101,165" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 92)">
        <!-- Lush ruffled layered petals -->
        <g stroke="#C9184A" stroke-width="1.3">
          <ellipse cx="0" cy="-22" rx="24" ry="18" fill="#FFB3C1"/>
          <ellipse cx="22" cy="-10" rx="22" ry="18" fill="#FF758F" transform="rotate(25 22 -10)"/>
          <ellipse cx="20" cy="14" rx="22" ry="18" fill="#FF4D6D" transform="rotate(55 20 14)"/>
          <ellipse cx="-4" cy="24" rx="24" ry="16" fill="#FF4D6D"/>
          <ellipse cx="-22" cy="12" rx="22" ry="18" fill="#FF758F" transform="rotate(-45 -22 12)"/>
          <ellipse cx="-20" cy="-12" rx="22" ry="18" fill="#FFB3C1" transform="rotate(-20 -20 -12)"/>
        </g>
        <!-- Center Cabbage Whirl -->
        <path d="M-12,-6 C-8,-16 12,-16 14,-4 C16,8 4,16 -4,12 C-12,8 -8,-2 -2,-4" fill="#FFF0F3" stroke="#A4161A" stroke-width="1.4"/>
        <circle cx="0" cy="0" r="4" fill="#FFD166"/>
      </g>
    </g>
  `,

  // Q - Queen Anne’s Lace
  Q: (uid) => `
    <g class="flower-bloom flower-queenanne">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,165 C80,152 65,160 55,172 C78,176 92,172 98,165" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <!-- Delicate parasol rib branches -->
      <g stroke="#74A892" stroke-width="1.2">
        <line x1="100" y1="105" x2="60" y2="70"/>
        <line x1="100" y1="105" x2="75" y2="60"/>
        <line x1="100" y1="105" x2="100" y2="55"/>
        <line x1="100" y1="105" x2="125" y2="60"/>
        <line x1="100" y1="105" x2="140" y2="70"/>
      </g>
      <!-- Tiny filigree white florets umbrella -->
      <g fill="#FFFFFF" stroke="#CBD5E1" stroke-width="0.8">
        <circle cx="55" cy="68" r="4"/><circle cx="62" cy="66" r="4"/><circle cx="58" cy="74" r="4"/>
        <circle cx="72" cy="58" r="4"/><circle cx="78" cy="56" r="4"/><circle cx="75" cy="64" r="4"/>
        <circle cx="95" cy="53" r="4.5"/><circle cx="105" cy="53" r="4.5"/><circle cx="100" cy="48" r="4.5"/>
        <circle cx="122" cy="58" r="4"/><circle cx="128" cy="56" r="4"/><circle cx="125" cy="64" r="4"/>
        <circle cx="138" cy="68" r="4"/><circle cx="145" cy="66" r="4"/><circle cx="142" cy="74" r="4"/>
      </g>
      <!-- Solitary Dark Garnet Jewel Dot in Center -->
      <circle cx="100" cy="66" r="3.5" fill="#590D22" stroke="#800F2F" stroke-width="1"/>
    </g>
  `,

  // R - Rose
  R: (uid) => `
    <g class="flower-bloom flower-rose">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#3D5A40" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,165 C124,152 144,162 152,180 C132,186 114,178 101,165" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Outer Romantic Velvet Petals -->
        <g fill="#D90429" stroke="#590D22" stroke-width="1.4">
          <ellipse cx="0" cy="-20" rx="26" ry="18"/>
          <ellipse cx="22" cy="-8" rx="22" ry="18" transform="rotate(30 22 -8)"/>
          <ellipse cx="20" cy="14" rx="22" ry="18" transform="rotate(60 20 14)"/>
          <ellipse cx="-4" cy="22" rx="24" ry="16"/>
          <ellipse cx="-22" cy="10" rx="22" ry="18" transform="rotate(-45 -22 10)"/>
          <ellipse cx="-20" cy="-12" rx="22" ry="18" transform="rotate(-20 -20 -12)"/>
        </g>
        <!-- Mid Velvet Petal Swirl -->
        <g fill="#EF233C" stroke="#800F2F" stroke-width="1.2">
          <circle cx="0" cy="-8" r="14"/><circle cx="10" cy="4" r="14"/><circle cx="-10" cy="4" r="14"/>
        </g>
        <!-- Center Spiral Rosebud -->
        <path d="M-8,-4 C-6,-12 8,-12 10,-2 C12,6 2,12 -4,8 C-10,6 -6,0 0,-2" fill="#FF4D6D" stroke="#590D22" stroke-width="1.5"/>
      </g>
    </g>
  `,

  // S - Sweet Pea
  S: (uid) => `
    <g class="flower-bloom flower-sweetpea">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Whimsical Curly Tendril -->
      <path d="M100,150 Q120,140 125,125 Q130,110 118,105 Q110,110 115,120" stroke="#74A892" stroke-width="1.4" fill="none"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Top Wide Banner/Standard Petal -->
        <path d="M-30,-8 C-35,-42 35,-42 30,-8 C20,-2 0,4 -30,-8 Z" fill="#FF70A6" stroke="#C9184A" stroke-width="1.4"/>
        <!-- Side Wing Petals (Fluttering) -->
        <ellipse cx="-16" cy="6" rx="15" ry="18" fill="#FF9770" stroke="#E85D04" stroke-width="1.3" transform="rotate(-15 -16 6)"/>
        <ellipse cx="16" cy="6" rx="15" ry="18" fill="#FF9770" stroke="#E85D04" stroke-width="1.3" transform="rotate(15 16 6)"/>
        <!-- Center Boat Keel Petal -->
        <ellipse cx="0" cy="12" rx="10" ry="14" fill="#FFD670" stroke="#D48B00" stroke-width="1.2"/>
      </g>
    </g>
  `,

  // T - Tulip
  T: (uid) => `
    <g class="flower-bloom flower-tulip">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#52796F" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M101,160 C128,130 138,100 148,65 C138,120 120,170 101,210" fill="#74A892" stroke="#354F52" stroke-width="1.3"/>
      <g class="flower-head" transform="translate(100, 92)">
        <!-- Stately Goblet Petals -->
        <!-- Back petal -->
        <path d="M-15,10 C-18,-25 0,-45 0,-45 C0,-45 18,-25 15,10 Z" fill="#FB5607" stroke="#9E2A2B" stroke-width="1.3"/>
        <!-- Left Wing -->
        <path d="M-28,-15 C-24,-45 -5,-35 0,-2 C-8,15 -22,10 -28,-15 Z" fill="#FF8500" stroke="#D00000" stroke-width="1.4"/>
        <!-- Right Wing -->
        <path d="M28,-15 C24,-45 5,-35 0,-2 C8,15 22,10 28,-15 Z" fill="#FF8500" stroke="#D00000" stroke-width="1.4"/>
        <!-- Front Rounded Petal -->
        <path d="M-18,-8 C-12,-38 12,-38 18,-8 C14,18 -14,18 -18,-8 Z" fill="#FFB703" stroke="#E85D04" stroke-width="1.4"/>
      </g>
    </g>
  `,

  // U - Ursinia
  U: (uid) => `
    <g class="flower-bloom flower-ursinia">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,165 C78,155 64,162 55,175 C75,178 90,172 98,165" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Copper/Orange Radiating Daisy Petals -->
        <g fill="#FB923C" stroke="#C2410C" stroke-width="1.2">
          <ellipse cx="0" cy="-35" rx="7" ry="17"/>
          <ellipse cx="25" cy="-25" rx="7" ry="17" transform="rotate(45 25 -25)"/>
          <ellipse cx="35" cy="0" rx="17" ry="7"/>
          <ellipse cx="25" cy="25" rx="7" ry="17" transform="rotate(-45 25 25)"/>
          <ellipse cx="0" cy="35" rx="7" ry="17"/>
          <ellipse cx="-25" cy="25" rx="7" ry="17" transform="rotate(45 -25 25)"/>
          <ellipse cx="-35" cy="0" rx="17" ry="7"/>
          <ellipse cx="-25" cy="-25" rx="7" ry="17" transform="rotate(-45 -25 -25)"/>
        </g>
        <!-- Dark Ruby Halo Ring -->
        <circle cx="0" cy="0" r="16" fill="#7C2D12" stroke="#451A03" stroke-width="1.2"/>
        <!-- Golden Center -->
        <circle cx="0" cy="0" r="9" fill="#FDE047" stroke="#CA8A04" stroke-width="1"/>
      </g>
    </g>
  `,

  // V - Violet
  V: (uid) => `
    <g class="flower-bloom flower-violet">
      <path class="botanical-stem" d="M100,105 Q102,175 100,240" stroke="#52796F" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <!-- Heart-shaped basal leaf -->
      <path d="M101,170 C118,155 135,160 142,175 C145,190 128,198 101,185" fill="#74A892" stroke="#354F52" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Two Upper Petals -->
        <ellipse cx="-14" cy="-22" rx="14" ry="18" fill="#795290" stroke="#3C096C" stroke-width="1.3" transform="rotate(-15 -14 -22)"/>
        <ellipse cx="14" cy="-22" rx="14" ry="18" fill="#795290" stroke="#3C096C" stroke-width="1.3" transform="rotate(15 14 -22)"/>
        <!-- Two Lateral Petals -->
        <ellipse cx="-20" cy="4" rx="14" ry="16" fill="#5E2CA5" stroke="#240046" stroke-width="1.3"/>
        <ellipse cx="20" cy="4" rx="14" ry="16" fill="#5E2CA5" stroke="#240046" stroke-width="1.3"/>
        <!-- Large Lower Spurred Petal with Violet Whiskers -->
        <path d="M-16,10 C-18,34 0,38 0,38 C0,38 18,34 16,10 Z" fill="#480CA8" stroke="#10002B" stroke-width="1.4"/>
        <!-- Golden-Yellow Throat Eye -->
        <circle cx="0" cy="4" r="5" fill="#FFEAA7" stroke="#FFD166" stroke-width="1"/>
        <g stroke="#10002B" stroke-width="0.9">
          <line x1="-3" y1="8" x2="-6" y2="18"/><line x1="0" y1="9" x2="0" y2="20"/><line x1="3" y1="8" x2="6" y2="18"/>
        </g>
      </g>
    </g>
  `,

  // W - Wisteria
  W: (uid) => `
    <g class="flower-bloom flower-wisteria">
      <path class="botanical-stem" d="M100,60 Q100,150 100,240" stroke="#52796F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Cascading raceme florets -->
      <g stroke="#5A189A" stroke-width="1">
        <!-- Top wider florets -->
        <path d="M85,75 C80,68 95,62 100,75 Z" fill="#CDB4DB"/>
        <path d="M115,75 C120,68 105,62 100,75 Z" fill="#CDB4DB"/>
        <ellipse cx="88" cy="90" rx="9" ry="8" fill="#B5A0D6"/><ellipse cx="112" cy="90" rx="9" ry="8" fill="#B5A0D6"/>
        <ellipse cx="89" cy="108" rx="8.5" ry="7.5" fill="#9D81BA"/><ellipse cx="111" cy="108" rx="8.5" ry="7.5" fill="#9D81BA"/>
        <ellipse cx="91" cy="125" rx="8" ry="7" fill="#845EC2"/><ellipse cx="109" cy="125" rx="8" ry="7" fill="#845EC2"/>
        <ellipse cx="93" cy="140" rx="7" ry="6" fill="#6F568C"/><ellipse cx="107" cy="140" rx="7" ry="6" fill="#6F568C"/>
        <!-- Slender hanging tip buds -->
        <circle cx="100" cy="154" r="5" fill="#5A189A"/>
        <circle cx="100" cy="164" r="3.5" fill="#5A189A"/>
      </g>
    </g>
  `,

  // X - Xeranthemum
  X: (uid) => `
    <g class="flower-bloom flower-xeranthemum">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#52796F" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,170 C80,160 68,168 58,180 C80,184 92,178 98,170" fill="#84A98C" stroke="#354F52" stroke-width="1"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Pointed Everlasting Paper Petals -->
        <g fill="#F0ABFC" stroke="#A855F7" stroke-width="1.2">
          <polygon points="0,-42 6,-18 -6,-18"/>
          <polygon points="28,-28 14,-10 4,-18"/>
          <polygon points="42,0 18,6 18,-6"/>
          <polygon points="28,28 4,18 14,10"/>
          <polygon points="0,42 -6,18 6,18"/>
          <polygon points="-28,28 -14,10 -4,18"/>
          <polygon points="-42,0 -18,-6 -18,6"/>
          <polygon points="-28,-28 -4,-18 -14,-10"/>
        </g>
        <!-- Inner Petal Row -->
        <g fill="#E879F9" stroke="#7E22CE" stroke-width="1">
          <circle cx="0" cy="-14" r="7"/><circle cx="14" cy="0" r="7"/>
          <circle cx="0" cy="14" r="7"/><circle cx="-14" cy="0" r="7"/>
        </g>
        <circle cx="0" cy="0" r="10" fill="#FFD166" stroke="#D97706" stroke-width="1.2"/>
      </g>
    </g>
  `,

  // Y - Yarrow
  Y: (uid) => `
    <g class="flower-bloom flower-yarrow">
      <path class="botanical-stem" d="M100,105 Q100,170 100,240" stroke="#52796F" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Feathery botanical leaves -->
      <path d="M99,165 C85,155 70,165 60,175 C80,178 95,172 99,165" fill="#74A892" stroke="#354F52" stroke-width="1"/>
      <path d="M101,185 C115,175 130,185 140,195 C120,198 105,192 101,185" fill="#74A892" stroke="#354F52" stroke-width="1"/>
      <!-- Flat-topped umbrella cluster branches -->
      <g stroke="#74A892" stroke-width="1.3">
        <line x1="100" y1="105" x2="65" y2="78"/>
        <line x1="100" y1="105" x2="82" y2="72"/>
        <line x1="100" y1="105" x2="100" y2="70"/>
        <line x1="100" y1="105" x2="118" y2="72"/>
        <line x1="100" y1="105" x2="135" y2="78"/>
      </g>
      <!-- Dense sunny flat clusters -->
      <g fill="#FDE047" stroke="#CA8A04" stroke-width="0.9">
        <circle cx="62" cy="76" r="6"/><circle cx="70" cy="74" r="6"/><circle cx="66" cy="82" r="6"/>
        <circle cx="80" cy="70" r="6.5"/><circle cx="88" cy="68" r="6.5"/>
        <circle cx="97" cy="67" r="7"/><circle cx="105" cy="67" r="7"/><circle cx="101" cy="63" r="6.5"/>
        <circle cx="114" cy="70" r="6.5"/><circle cx="122" cy="70" r="6.5"/>
        <circle cx="132" cy="76" r="6"/><circle cx="140" cy="74" r="6"/><circle cx="136" cy="82" r="6"/>
      </g>
    </g>
  `,

  // Z - Zinnia
  Z: (uid) => `
    <g class="flower-bloom flower-zinnia">
      <path class="botanical-stem" d="M100,105 Q98,170 100,240" stroke="#3D5A40" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path class="botanical-leaf" d="M98,165 C76,155 60,165 52,180 C74,185 88,176 98,165" fill="#588157" stroke="#344E41" stroke-width="1.2"/>
      <g class="flower-head" transform="translate(100, 95)">
        <!-- Tiered overlapping pompom petals -->
        <g fill="#FB7185" stroke="#9F1239" stroke-width="1.2">
          <circle cx="0" cy="-25" r="12"/><circle cx="22" cy="-12" r="12"/>
          <circle cx="22" cy="14" r="12"/><circle cx="0" cy="25" r="12"/>
          <circle cx="-22" cy="14" r="12"/><circle cx="-22" cy="-12" r="12"/>
        </g>
        <g fill="#F43F5E" stroke="#881337" stroke-width="1.1">
          <circle cx="0" cy="-14" r="9.5"/><circle cx="14" cy="-6" r="9.5"/>
          <circle cx="12" cy="10" r="9.5"/><circle cx="-6" cy="14" r="9.5"/>
          <circle cx="-14" cy="-4" r="9.5"/>
        </g>
        <!-- Golden Star Ring in Center -->
        <circle cx="0" cy="0" r="11" fill="#E11D48" stroke="#4C0519" stroke-width="1.3"/>
        <circle cx="0" cy="0" r="7" fill="#FACC15" stroke="#CA8A04" stroke-width="1"/>
        <circle cx="0" cy="0" r="3" fill="#713F12"/>
      </g>
    </g>
  `
};

/**
 * Generates an SVG string for a given letter A-Z with botanical sketch styling.
 * @param {string} letter - A letter from A to Z
 * @param {object} options - Configuration options (width, height, delay, customClass)
 */
function getFlowerSVG(letter, options = {}) {
  const upper = (letter || 'A').toUpperCase();
  const renderFn = FLOWER_SVGS[upper] || FLOWER_SVGS['A'];
  const uid = 'flw_' + Math.random().toString(36).substr(2, 6);
  const width = options.width || 200;
  const height = options.height || 260;
  const delay = options.delay || '0s';
  const customClass = options.customClass || '';

  return `
    <svg class="botanical-flower-svg ${customClass}" 
         data-letter="${upper}" 
         viewBox="0 0 200 260" 
         width="${width}" 
         height="${height}" 
         style="--bloom-delay: ${delay};" 
         xmlns="http://www.w3.org/2000/svg">
      ${renderFn(uid)}
    </svg>
  `;
}

if (typeof module !== 'undefined') {
  module.exports = { FLOWER_SVGS, getFlowerSVG };
}

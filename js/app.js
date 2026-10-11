
/* Data pengurus dan dokumentasi kegiatan organisasi. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================= rendering ========================= */
function initials(name){
  return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
}
function avatarNode(person, sizeClass){
  if(person.img){
    const img = document.createElement('img');
    img.src = person.img; img.alt = person.name;
    img.className = sizeClass;
    return img;
  }
  const div = document.createElement('div');
  div.className = sizeClass;
  div.textContent = initials(person.name);
  return div;
}

function sparkBurst(x, y, color){
  for(let i=0; i<9; i++){
    const s = document.createElement('div');
    s.className = 'spark-particle';
    const angle = Math.random()*Math.PI*2;
    const dist = 26 + Math.random()*38;
    s.style.left = x+'px'; s.style.top = y+'px';
    s.style.background = color;
    s.style.setProperty('--dx', Math.cos(angle)*dist+'px');
    s.style.setProperty('--dy', Math.sin(angle)*dist+'px');
    s.style.animation = 'sparkOut 0.6s ease-out forwards';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 650);
  }
}

let profileReturnFocus = null;
function openProfile(person){
  const modal = document.getElementById('profileModal');
  modal.className = `profile-modal open ${person.org}`;
  profileReturnFocus = document.activeElement;
  document.getElementById('profileOrg').textContent = `${person.orgName} · ${person.division}`;
  document.getElementById('profileTitle').textContent = person.name;
  document.getElementById('profileRole').textContent = person.role;

  const portraitWrap = document.getElementById('profilePortraitWrap');
  portraitWrap.innerHTML = '';
  const portrait = avatarNode(person, 'profile-portrait');
  if(portrait instanceof HTMLImageElement){
    portrait.onerror = ()=>{
      const fallback = document.createElement('div');
      fallback.className = 'profile-portrait';
      fallback.textContent = initials(person.name);
      portrait.replaceWith(fallback);
    };
  }
  portraitWrap.appendChild(portrait);

  const facts = document.getElementById('profileFacts');
  facts.innerHTML = '';
  [{label:'Asal', value:person.origin}, {label:'Bidang', value:person.division}].forEach(fact=>{
    if(!fact.value) return;
    const item = document.createElement('div');
    item.className = 'profile-fact';
    const label = document.createElement('dt'); label.textContent = fact.label;
    const value = document.createElement('dd'); value.textContent = fact.value;
    item.append(label, value); facts.appendChild(item);
  });

  const bio = document.getElementById('profileBio');
  bio.textContent = person.bio || '';
  bio.hidden = !person.bio;
  const instagram = document.getElementById('profileInstagram');
  const handle = String(person.instagram || '').trim().replace(/^@/, '');
  if(/^[A-Za-z0-9._]{1,30}$/.test(handle)){
    instagram.href = `https://www.instagram.com/${encodeURIComponent(handle)}/`;
    instagram.textContent = `Instagram · @${handle}`;
    instagram.hidden = false;
  }else{
    instagram.removeAttribute('href');
    instagram.textContent = '';
    instagram.hidden = true;
  }

  const gallery = document.getElementById('profileGallery');
  const galleryGrid = document.getElementById('profileGalleryGrid');
  galleryGrid.innerHTML = '';
  const images = Array.isArray(person.gallery) ? person.gallery.filter(Boolean) : [];
  images.forEach((src, index)=>{
    const image = document.createElement('img');
    image.src = src; image.alt = `${person.name}, foto ${index + 1}`;
    galleryGrid.appendChild(image);
  });
  gallery.hidden = images.length === 0;
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  document.getElementById('profileClose').focus();
}

function closeProfile(){
  const modal = document.getElementById('profileModal');
  if(!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
  if(profileReturnFocus instanceof HTMLElement) profileReturnFocus.focus();
}

function renderLeaders(orgKey){
  const org = ORGS[orgKey];
  const row = document.getElementById(orgKey+'Leaders');
  [org.leader, org.coLeader].forEach(p=>{
    const card = document.createElement('div');
    card.className = 'leader-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Balik kartu profil ${p.name}`);
    card.setAttribute('aria-pressed', 'false');

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const front = document.createElement('div');
    front.className = 'card-face front';
    const av = avatarNode(p, 'leader-avatar');
    const info = document.createElement('div');
    info.className = 'leader-info';
    info.innerHTML = `<div class="role">${p.role}</div><div class="name">${p.name}</div><div class="line">${p.line}</div>`;
    front.appendChild(av); front.appendChild(info);

    const back = document.createElement('div');
    back.className = 'card-face back';
    const backRole = document.createElement('div');
    backRole.className = 'leader-back-role';
    backRole.textContent = p.role;
    const backName = document.createElement('div');
    backName.className = 'leader-back-name';
    backName.textContent = p.name;
    const backLine = document.createElement('div');
    backLine.className = 'leader-back-line';
    const backOrigin = document.createElement('div');
    backOrigin.className = 'quote';
    if(p.role === 'Ketua' || p.role === 'Wakil Ketua'){
      backLine.textContent = 'Motto: [akan ditambahkan]';
      back.append(backRole, backName, backLine);
    }else{
      backLine.textContent = p.line;
      backOrigin.textContent = p.quote;
      back.append(backRole, backName, backLine, backOrigin);
    }
    const handle = String(p.instagram || '').trim().replace(/^@/, '');
    if(/^[A-Za-z0-9._]{1,30}$/.test(handle)){
      const instagram = document.createElement('a');
      instagram.className = 'leader-back-instagram';
      instagram.href = `https://www.instagram.com/${encodeURIComponent(handle)}/`;
      instagram.target = '_blank';
      instagram.rel = 'noopener';
      instagram.textContent = `Instagram · @${handle}`;
      instagram.addEventListener('click', event=>event.stopPropagation());
      back.appendChild(instagram);
    }
    const backHint = document.createElement('div');
    backHint.className = 'quote-hint';
    backHint.textContent = 'Klik untuk kembali';
    back.appendChild(backHint);

    inner.appendChild(front); inner.appendChild(back);
    card.appendChild(inner);

    const cue = document.createElement('span');
    cue.className = 'flip-cue';
    cue.textContent = '↻';
    card.appendChild(cue);

    card.addEventListener('click', (e)=>{
      card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(card.classList.contains('flipped')));
      if(!reduceMotion) sparkBurst(e.clientX, e.clientY, orgKey === 'slc' ? '#f0a83c' : '#e07a2a');
    });
    card.addEventListener('keydown', event=>{
      if((event.key === 'Enter' || event.key === ' ') && !event.target.closest('a, button')){
        event.preventDefault();
        card.click();
      }
    });
    row.appendChild(card);
  });
}

function isDivisionLeader(orgKey, divisionName, index){
  return index === 0 && !(
    (orgKey === 'slc' && divisionName === 'Daily Manager') ||
    (orgKey === 'tvc' && ['ANKUSET', 'ANKUKUANG'].includes(divisionName))
  );
}

function createMemberCard(member, orgKey, divisionName, index, { searchResult = false } = {}){
  const card = document.createElement('div');
  card.className = 'member-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Lihat profil ${member.name}`);
  card.style.animationDelay = (index*0.045)+'s';
  const av = avatarNode(member, 'member-avatar');
  if(av instanceof HTMLImageElement){
    av.loading = 'lazy';
    av.decoding = 'async';
  }
  card.appendChild(av);
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = member.name;
  card.appendChild(name);
  if(searchResult && (member.divisionLeader || member.unit)){
    const unit = document.createElement('div');
    unit.className = 'unit';
    unit.textContent = member.divisionLeader ? 'Ketua Bidang' : member.unit;
    card.appendChild(unit);
  }else if(!searchResult && (member.divisionLeader || member.unit)){
    const unit = document.createElement('div');
    unit.className = 'unit';
    unit.textContent = member.divisionLeader ? 'Ketua Bidang' : member.unit;
    card.appendChild(unit);
  }
  const role = document.createElement('div');
  role.className = 'role';
  role.textContent = searchResult ? divisionName : member.role;
  card.appendChild(role);
  const person = {
    ...member,
    org:orgKey,
    orgName:orgKey === 'slc' ? 'SLC' : 'TVC',
    division:divisionName,
    role:member.divisionLeader
      ? `Ketua Bidang · ${divisionName}`
      : (member.unit ? `${member.unit} · ${divisionName}` : `Anggota · ${divisionName}`),
    origin:member.role
  };
  card.addEventListener('click', ()=>openProfile(person));
  card.addEventListener('keydown', event=>{
    if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); openProfile(person); }
  });
  return card;
}

function renderMemberSearch(orgKey){
  const org = ORGS[orgKey];
  const input = document.getElementById(orgKey+'MemberSearch');
  const resultsEl = document.getElementById(orgKey+'MemberSearchResults');
  const divisionSelect = document.getElementById(orgKey+'DivisionSelect');
  const overviewEl = document.getElementById(orgKey+'DivisionOverview');
  const panelEl = document.getElementById(orgKey+'Members');
  const searchingOption = document.createElement('option');
  searchingOption.value = 'searching';
  searchingOption.textContent = 'Searching';
  searchingOption.disabled = true;
  let searchActive = false;
  let previousDivision = divisionSelect.value;
  const searchRecords = org.divisions.flatMap(division=>
    division.members.map((member,index)=>({
      member:{...member, divisionLeader:isDivisionLeader(orgKey, division.name, index)},
      division:division.name
    }))
  );
  input.addEventListener('input', ()=>{
    const query = input.value.trim().toLocaleLowerCase('id-ID');
    resultsEl.replaceChildren();
    if(!query){
      if(searchActive){
        divisionSelect.disabled = false;
        searchingOption.remove();
        divisionSelect.value = previousDivision;
        searchActive = false;
      }
      overviewEl.hidden = false;
      panelEl.hidden = false;
      resultsEl.hidden = true;
      return;
    }
    if(!searchActive){
      previousDivision = divisionSelect.value;
      divisionSelect.appendChild(searchingOption);
      searchActive = true;
    }
    divisionSelect.value = searchingOption.value;
    divisionSelect.disabled = true;
    overviewEl.hidden = true;
    panelEl.hidden = true;
    resultsEl.hidden = false;
    const message = document.createElement('p');
    message.className = 'member-search-message';
    if(query.length < 2){
      message.textContent = 'Ketik minimal 2 karakter untuk mencari pengurus.';
      resultsEl.appendChild(message);
      return;
    }
    const matches = searchRecords.filter(({member})=>
      member.name.toLocaleLowerCase('id-ID').includes(query)
    );
    if(matches.length === 0){
      message.textContent = 'Pengurus tidak ditemukan.';
      resultsEl.appendChild(message);
      return;
    }
    const visibleMatches = matches.slice(0, 12);
    message.textContent = matches.length > visibleMatches.length
      ? `Ditemukan ${matches.length} pengurus. Menampilkan 12 hasil pertama:`
      : `Ditemukan ${matches.length} pengurus:`;
    const grid = document.createElement('div');
    grid.className = 'member-search-grid';
    visibleMatches.forEach(({member, division}, index)=>
      grid.appendChild(createMemberCard(member, orgKey, division, index, {searchResult:true}))
    );
    resultsEl.append(message, grid);
  });
}

function renderDivisions(orgKey){
  const org = ORGS[orgKey];
  const divisionSelect = document.getElementById(orgKey+'DivisionSelect');
  const descriptionEl = document.getElementById(orgKey+'DivisionDescription');
  const photoSlot = document.getElementById(orgKey+'DivisionPhoto');
  const panelEl = document.getElementById(orgKey+'Members');

  function showDivision(idx){
    divisionSelect.value = String(idx);
    panelEl.innerHTML = '';
    const division = org.divisions[idx];
    const label = document.createElement('span');
    label.className = 'division-description-label';
    label.textContent = 'Tugas Bidang';
    const title = document.createElement('h3');
    title.textContent = division.name;
    const fullName = division.fullName ? document.createElement('p') : null;
    if(fullName){
      fullName.className = 'division-name-expansion';
      fullName.textContent = division.fullName;
    }
    const description = document.createElement('p');
    description.textContent = division.description || 'Deskripsi tugas bidang ini belum tersedia.';
    descriptionEl.replaceChildren(label, title, ...(fullName ? [fullName] : []), description);
    const groupPhoto = document.createElement('figure');
    groupPhoto.className = 'division-group-photo';
    groupPhoto.setAttribute('aria-label', `Foto bersama bidang ${division.name}`);
    if(division.groupPhoto){
      const image = document.createElement('img');
      image.src = division.groupPhoto;
      image.alt = `Foto bersama bidang ${division.name}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      groupPhoto.appendChild(image);
    }else{
      const placeholder = document.createElement('div');
      placeholder.className = 'division-group-photo-placeholder';
      const icon = document.createElement('span');
      icon.className = 'division-group-photo-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '＋';
      const title = document.createElement('strong');
      title.textContent = 'COMING SOON';
      placeholder.append(icon, title);
      groupPhoto.appendChild(placeholder);
    }
    const caption = document.createElement('figcaption');
    caption.textContent = `Foto bersama · ${division.name}`;
    groupPhoto.appendChild(caption);
    const grid = document.createElement('div');
    grid.className = 'members-grid';
    division.members.forEach((member,index)=>
      grid.appendChild(createMemberCard({
        ...member,
        divisionLeader:isDivisionLeader(orgKey, division.name, index)
      }, orgKey, division.name, index))
    );
    photoSlot.replaceChildren(groupPhoto);
    panelEl.appendChild(grid);
  }

  org.divisions.forEach((d,i)=>{
    const option = document.createElement('option');
    option.value = String(i);
    option.textContent = d.name;
    divisionSelect.appendChild(option);
  });
  divisionSelect.addEventListener('change', ()=>showDivision(Number(divisionSelect.value)));
  showDivision(0);
  renderMemberSearch(orgKey);
}

function formatNewsDate(date){
  return new Intl.DateTimeFormat('id-ID', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`));
}

function renderEventOrgLogos(container, org, logoPath, logoAlt){
  container.replaceChildren();
  const orgs = logoPath ? [{key:org, src:logoPath, alt:logoAlt || `Logo ${org.toUpperCase()}`}]
    : (org === 'joint' ? ['slc','tvc'] : [org]).map(key=>({key, src:`image/Logo/Logo_${key.toUpperCase()}.png`, alt:`Logo ${key.toUpperCase()}`}));
  orgs.forEach(({key,src,alt})=>{
    const logo = document.createElement('img');
    logo.className = `event-org-logo ${key}`;
    logo.src = src;
    logo.alt = alt;
    container.appendChild(logo);
  });
}

function renderNews(){
  const list = document.getElementById('newsList');
  [...NEWS].sort((a,b)=>(b.date || '').localeCompare(a.date || '')).forEach((item,index)=>{
    const card = document.createElement('article');
    card.className = `news-card ${item.org}`;
    card.style.animationDelay = `${index * 0.05}s`;
    card.hidden = index >= 3;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.innerHTML = `<div class="news-thumb ${item.org}" data-label="${item.type.toUpperCase()}"></div><div class="news-body"><div class="news-tags"><span class="news-tag org-${item.org}">${item.organization || (item.org === 'joint' ? 'SLC & TVC' : item.org.toUpperCase())}</span><span class="news-tag type">${item.type}</span></div><h3 class="news-title">${item.title}</h3><p class="news-excerpt">${item.excerpt}</p><div class="news-date-line">${item.date ? formatNewsDate(item.date) : item.status || ''}</div></div>`;
    const thumb = card.querySelector('.news-thumb');
    const tagRow = card.querySelector('.news-tags');
    if(item.images?.length){
      const image = document.createElement('img');
      image.className = 'news-thumb-image';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.src = item.images[0];
      image.alt = '';
      if(item.focusUp?.includes(0)) image.style.objectPosition = 'center 35%';
      thumb.appendChild(image);
    }
    const logos = document.createElement('div');
    logos.className = 'event-org-logos';
    logos.setAttribute('aria-label', 'Organisasi penyelenggara');
    renderEventOrgLogos(logos, item.org, item.logo, item.logoAlt);
    tagRow.appendChild(logos);
    card.addEventListener('click', ()=>openNews(item));
    card.addEventListener('keydown', event=>{
      if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); openNews(item); }
    });
    list.appendChild(card);
  });
}

function renderLatestCompletedEvent(){
  const section = document.querySelector('.recent-event-section');
  const item = [...NEWS]
    .filter(event=>event.status === 'Sudah terlaksana' && event.date)
    .sort((a,b)=>b.date.localeCompare(a.date))[0];
  if(!item){
    section.hidden = true;
    return;
  }
  const image = document.getElementById('recentEventImage');
  image.loading = 'lazy';
  image.decoding = 'async';
  image.src = item.images?.[0] || '';
  image.alt = item.images?.length ? `Dokumentasi ${item.title}` : '';
  renderEventOrgLogos(document.getElementById('recentEventLogos'), item.org, item.logo, item.logoAlt);
  document.getElementById('recentEventDate').textContent = formatNewsDate(item.date);
  document.getElementById('recentEventHeading').textContent = item.title;
  document.getElementById('recentEventDescription').textContent = item.excerpt;
  document.getElementById('recentEventButton').addEventListener('click', ()=>openNews(item));
}

let newsGalleryRequestId = 0;
function openNews(item){
  const modal = document.getElementById('newsModal');
  const hero = document.getElementById('newsModalHero');
  hero.className = `news-modal-hero ${item.org}`;
  hero.dataset.label = item.type.toUpperCase();
  const images = item.images?.length ? item.images : [];
  const image = document.getElementById('newsModalImage');
  let activeImage = 0;
  const updateGallery = (animate = false)=>{
    const requestId = ++newsGalleryRequestId;
    image.classList.remove('visible');
    if(images.length){
      image.alt = `${item.title}, foto ${activeImage + 1}`;
      image.style.objectPosition = item.focusUp?.includes(activeImage) ? 'center 35%' : 'center';
      const revealImage = ()=>{
        if(requestId !== newsGalleryRequestId) return;
        image.onload = ()=>{
          if(requestId === newsGalleryRequestId){
            requestAnimationFrame(()=>{
              if(requestId === newsGalleryRequestId) image.classList.add('visible');
            });
          }
        };
        image.onerror = ()=>{
          if(requestId === newsGalleryRequestId) image.classList.remove('visible');
        };
        image.src = images[activeImage];
        if(image.complete && image.naturalWidth > 0){
          requestAnimationFrame(()=>{
            if(requestId === newsGalleryRequestId) image.classList.add('visible');
          });
        }
      };
      if(animate && !reduceMotion){
        let fallback;
        const finishFadeOut = event=>{
          if(event && (event.target !== image || event.propertyName !== 'opacity')) return;
          clearTimeout(fallback);
          image.removeEventListener('transitionend', finishFadeOut);
          revealImage();
        };
        image.addEventListener('transitionend', finishFadeOut);
        image.classList.remove('visible');
        fallback = setTimeout(()=>finishFadeOut(), 400);
      }else{
        revealImage();
      }
    }else{
      image.onload = null;
      image.onerror = null;
      image.removeAttribute('src');
      image.alt = '';
    }
    document.getElementById('newsGalleryCount').textContent = images.length > 1 ? `${String(activeImage + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}` : '';
    document.getElementById('newsGalleryPrev').hidden = images.length < 2;
    document.getElementById('newsGalleryNext').hidden = images.length < 2;
  };
  updateGallery();
  document.getElementById('newsGalleryPrev').onclick = ()=>{ activeImage = (activeImage - 1 + images.length) % images.length; updateGallery(true); };
  document.getElementById('newsGalleryNext').onclick = ()=>{ activeImage = (activeImage + 1) % images.length; updateGallery(true); };
  document.getElementById('newsModalTags').innerHTML = `<span class="news-tag org-${item.org}">${item.organization || (item.org === 'joint' ? 'SLC & TVC' : item.org.toUpperCase())}</span><span class="news-tag type">${item.type}</span><div class="event-org-logos" id="newsModalLogos" aria-label="Organisasi penyelenggara"></div>`;
  renderEventOrgLogos(document.getElementById('newsModalLogos'), item.org, item.logo, item.logoAlt);
  document.getElementById('newsModalTitle').textContent = item.title;
  document.getElementById('newsModalDate').textContent = item.date ? formatNewsDate(item.date) : item.status || '';
  document.getElementById('newsModalDesc').textContent = item.body;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  document.getElementById('newsModalClose').focus();
}

function closeNews(){
  document.getElementById('newsModal').classList.remove('open');
  document.getElementById('newsModal').setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
}

document.getElementById('newsModalClose').addEventListener('click', closeNews);
document.getElementById('newsModalBackdrop').addEventListener('click', closeNews);
document.getElementById('profileClose').addEventListener('click', closeProfile);
document.getElementById('profileBackdrop').addEventListener('click', closeProfile);
document.addEventListener('keydown', event=>{
  if(event.key === 'Escape'){ closeProfile(); closeNews(); }
});

const newsToggle = document.getElementById('newsToggle');
const newsCards = () => [...document.querySelectorAll('#newsList .news-card')];
const syncNewsToggle = () => {
  const cards = newsCards();
  const hasMore = cards.length > 3;
  newsToggle.hidden = !hasMore;
  if(!hasMore){
    newsToggle.setAttribute('aria-expanded', 'false');
    newsToggle.querySelector('.news-toggle-label').textContent = 'Tampilkan lainnya';
    return;
  }
  const expanded = newsToggle.getAttribute('aria-expanded') === 'true';
  cards.forEach((card, index)=>{
    if(index >= 3){
      card.hidden = !expanded;
      card.classList.toggle('is-revealing', expanded);
      if(expanded) card.style.animationDelay = `${(index - 3) * 0.07}s`;
    }
  });
  newsToggle.querySelector('.news-toggle-label').textContent = expanded ? 'Tampilkan lebih sedikit' : 'Tampilkan lainnya';
};
newsToggle.addEventListener('click', ()=>{
  const expanded = newsToggle.getAttribute('aria-expanded') === 'true';
  newsToggle.setAttribute('aria-expanded', String(!expanded));
  syncNewsToggle();
});
renderNews();
renderLatestCompletedEvent();
syncNewsToggle();

['slc','tvc'].forEach(key=>{
  renderLeaders(key);
  renderDivisions(key);
});

/* ========================= page switching ========================= */
const pageKeys = ['home', 'slc', 'tvc'];
const pageFromUrl = new URLSearchParams(window.location.search).get('page');
let currentPage = pageKeys.includes(pageFromUrl) ? pageFromUrl : 'home';
const curtain = document.getElementById('curtain');
const curtainMark = document.getElementById('curtainMark');
const navButtons = document.querySelectorAll('.nav-links button');
const startedField = { home:false, slc:false, tvc:false };

function ensureField(key){
  if(reduceMotion || startedField[key]) return;
  startedField[key] = true;
  if(key === 'home'){
    createEmberField(document.getElementById('particles'), {count:46, colors:['240,168,60','224,122,42'], speedMin:0.18, speedMax:0.68});
    createEmberField(document.getElementById('particlesNews'), {count:22, colors:['240,168,60','224,122,42'], speedMin:0.1, speedMax:0.35});
  }else if(key === 'slc'){
    createEmberField(document.getElementById('particlesSlc'), {count:24, colors:['240,168,60'], speedMin:0.1, speedMax:0.35});
  }else if(key === 'tvc'){
    createEmberField(document.getElementById('particlesTvc'), {count:24, colors:['224,122,42'], speedMin:0.1, speedMax:0.35});
  }
}

function setMark(key){
  if(key === 'home'){ curtainMark.textContent = '✦'; curtainMark.style.color = 'var(--paper)'; curtainMark.style.fontSize = '24px'; }
  else if(key === 'slc'){ curtainMark.textContent = 'SLC'; curtainMark.style.color = 'var(--gold)'; curtainMark.style.fontSize = '19px'; }
  else if(key === 'tvc'){ curtainMark.textContent = 'TVC'; curtainMark.style.color = 'var(--ember)'; curtainMark.style.fontSize = '19px'; }
}

function swapPage(key){
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.dataset.page === key));
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === key));
  const siteCredit = document.querySelector('.site-credit');
  siteCredit.classList.remove(...pageKeys);
  siteCredit.classList.add(key);
  currentPage = key;
  window.scrollTo(0, 0);
  ensureField(key);
}

function goToPage(key, { updateUrl = true } = {}){
  if(key === currentPage) return;
  if(updateUrl){
    const url = new URL(window.location.href);
    if(key === 'home') url.searchParams.delete('page');
    else url.searchParams.set('page', key);
    window.history.pushState({ page:key }, '', url);
  }
  if(reduceMotion){ swapPage(key); return; }
  setMark(key);
  curtain.classList.add('mark-show');
  curtain.classList.remove('open');
  setTimeout(()=>{
    swapPage(key);
    setTimeout(()=>{
      curtain.classList.remove('mark-show');
      curtain.classList.add('open');
    }, 240);
  }, 560);
}

navButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>goToPage(btn.dataset.target));
});
document.querySelector('.nav-mark').addEventListener('click', ()=>goToPage('home'));
document.querySelectorAll('[data-goto]').forEach(el=>{
  el.addEventListener('click', ()=>goToPage(el.dataset.goto));
});
window.addEventListener('popstate', ()=>goToPage(
  pageKeys.includes(new URLSearchParams(window.location.search).get('page'))
    ? new URLSearchParams(window.location.search).get('page')
    : 'home',
  { updateUrl:false }
));
document.querySelector('.hero-index-link[href="#footerContact"]').addEventListener('click', event=>{
  event.preventDefault();
  document.getElementById('footerContact').scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
});

/* ========================= curtain reveal (initial load) ========================= */
swapPage(currentPage);
if(reduceMotion){
  curtain.classList.add('open');
  ensureField(currentPage);
}else{
  document.documentElement.style.overflow = 'hidden';
  setMark(currentPage);
  setTimeout(()=> curtain.classList.add('mark-show'), 50);
  setTimeout(()=>{
    curtain.classList.remove('mark-show');
    curtain.classList.add('open');
    document.documentElement.style.overflow = '';
  }, 650);
  ensureField(currentPage);
}

/* ========================= custom cursor ========================= */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if(finePointer && !reduceMotion){
  document.body.classList.add('has-cursor');
  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');
  let rx=innerWidth/2, ry=innerHeight/2, mx=rx, my=ry;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  window.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  (function loop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  })();
  const hoverables = 'a, button, select, .member-card, .leader-card, .hero-crest, .nav-mark, .news-card, .news-modal-close';
  document.addEventListener('mouseover', e=>{
    if(e.target.closest(hoverables)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', e=>{
    if(e.target.closest(hoverables)) ring.classList.remove('hover');
  });
}

/* ========================= tilt + mouse glow ========================= */
if(!reduceMotion){
  const hero = document.getElementById('home');
  const heroGlow = document.getElementById('heroGlow');
  hero.addEventListener('mousemove', e=>{
    const r = hero.getBoundingClientRect();
    heroGlow.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    heroGlow.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  function attachTilt(el, max){
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-py*max).toFixed(2)}deg) rotateY(${(px*max).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
  }
  document.querySelectorAll('.hero-crest img').forEach(im => attachTilt(im, 16));
  document.querySelectorAll('.leader-card').forEach(c => attachTilt(c, 5));
}

/* ========================= stat count-up ========================= */
/* ========================= nav scroll progress ========================= */
const progressBar = document.getElementById('navProgress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive:true });

/* ========================= ember particles ========================= */
function createEmberField(canvasEl, opts){
  if(!canvasEl) return;
  const cfg = Object.assign({count:40, colors:['240,168,60'], speedMin:0.15, speedMax:0.55}, opts);
  const ctx = canvasEl.getContext('2d');
  let w,h,particles;
  function resize(){
    w = canvasEl.width = canvasEl.offsetWidth;
    h = canvasEl.height = canvasEl.offsetHeight;
  }
  function makeParticles(){
    particles = Array.from({length: cfg.count}, ()=>({
      x: Math.random()*w,
      y: h + Math.random()*h,
      r: 1 + Math.random()*2.2,
      speed: cfg.speedMin + Math.random()*(cfg.speedMax-cfg.speedMin),
      drift: (Math.random()-0.5)*0.3,
      alpha: 0.12 + Math.random()*0.35,
      hue: cfg.colors[Math.floor(Math.random()*cfg.colors.length)]
    }));
  }
  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.y -= p.speed;
      p.x += p.drift;
      if(p.y < -10){ p.y = h + 10; p.x = Math.random()*w; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  resize(); makeParticles(); tick();
}

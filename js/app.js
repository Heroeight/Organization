
/* Organization leadership and event archive data. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const JAKARTA_TZ = 'Asia/Jakarta';

function jakartaTodayParts(){
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:JAKARTA_TZ, year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
  const value = type => Number(parts.find(part => part.type === type).value);
  return {y:value('year'), m:value('month'), d:value('day')};
}
function parseISODateParts(dateStr){
  const [y, m, d] = String(dateStr).split('-').map(Number);
  return {y, m, d};
}
function dayIndex(parts){
  return Date.UTC(parts.y, parts.m - 1, parts.d) / 86400000;
}
function daysFromToday(dateStr){
  return dayIndex(parseISODateParts(dateStr)) - dayIndex(jakartaTodayParts());
}
function eventStatusLabel(dateStr){
  if(!dateStr) return '';
  const diff = daysFromToday(dateStr);
  if(diff > 0) return 'Upcoming';
  if(diff === 0) return 'Today';
  if(diff >= -30) return 'Recently Held';
  return '';
}
function isFutureEvent(item){
  return Boolean(item.date) && daysFromToday(item.date) > 0;
}
function isPastOrTodayEvent(item){
  return Boolean(item.date) && daysFromToday(item.date) <= 0;
}
function eventImageList(item){
  return (item.images || []).map(image => typeof image === 'string' ? {src:image, caption:''} : {src:image.src, caption:image.caption || ''}).filter(image => image.src);
}
function countOrgOfficers(org){
  return 2 + org.divisions.reduce((sum, division) => sum + division.members.length, 0);
}

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
  [{label:'From', value:SITE.showMemberOrigin ? person.origin : ''}, {label:'Division', value:person.division}].forEach(fact=>{
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
    image.src = src;     image.alt = `${person.name}, photo ${index + 1}`;
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
    card.setAttribute('aria-label', `Flip ${p.name}'s profile card`);
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
    back.append(backRole, backName);
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
    backHint.textContent = 'Click to flip back';
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
  card.setAttribute('aria-label', `View ${member.name}'s profile`);
  card.style.animationDelay = (index*0.045)+'s';
  const av = avatarNode(member, 'member-avatar');
  if(av instanceof HTMLImageElement){
    av.loading = 'lazy';
    av.decoding = 'async';
    const frame = document.createElement('span');
    frame.className = 'member-avatar-frame';
    frame.appendChild(av);
    card.appendChild(frame);
  }else{
    card.appendChild(av);
  }
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = member.name;
  card.appendChild(name);
  const unitLabel = member.unit === 'Anggota' ? 'Member' : member.unit;
  if(member.divisionLeader || unitLabel){
    const unit = document.createElement('div');
    unit.className = 'unit';
    unit.textContent = member.divisionLeader ? 'Division Lead' : unitLabel;
    card.appendChild(unit);
  }
  const role = document.createElement('div');
  role.className = 'role';
  if(searchResult){
    role.textContent = divisionName;
    card.appendChild(role);
  }else if(SITE.showMemberOrigin && member.role){
    role.textContent = member.role;
    card.appendChild(role);
  }
  const person = {
    ...member,
    org:orgKey,
    orgName:orgKey === 'slc' ? 'SLC' : 'TVC',
    division:divisionName,
    role:member.divisionLeader
      ? `Division Lead · ${divisionName}`
      : (unitLabel ? `${unitLabel} · ${divisionName}` : `Member · ${divisionName}`),
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
    const query = input.value.trim().toLocaleLowerCase('en');
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
      message.textContent = 'Enter at least 2 characters to search members.';
      resultsEl.appendChild(message);
      return;
    }
    const matches = searchRecords.filter(({member})=>
      member.name.toLocaleLowerCase('en').includes(query)
    );
    if(matches.length === 0){
      message.textContent = 'No members found.';
      resultsEl.appendChild(message);
      return;
    }
    const visibleMatches = matches.slice(0, 12);
    message.textContent = matches.length > visibleMatches.length
      ? `${matches.length} members found. Showing the first 12 results:`
      : `${matches.length} members found:`;
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
  const panelEl = document.getElementById(orgKey+'Members');

  function showDivision(idx){
    divisionSelect.value = String(idx);
    panelEl.innerHTML = '';
    const division = org.divisions[idx];
    const label = document.createElement('span');
    label.className = 'division-description-label';
    label.textContent = 'Division Responsibilities';
    const title = document.createElement('h3');
    title.textContent = division.name;
    const fullName = division.fullName ? document.createElement('p') : null;
    if(fullName){
      fullName.className = 'division-name-expansion';
      fullName.textContent = division.fullName;
    }
    const description = document.createElement('p');
    description.textContent = division.description || 'A description for this division is not available yet.';
    descriptionEl.replaceChildren(label, title, ...(fullName ? [fullName] : []), description);
    const grid = document.createElement('div');
    grid.className = 'members-grid';
    division.members.forEach((member,index)=>
      grid.appendChild(createMemberCard({
        ...member,
        divisionLeader:isDivisionLeader(orgKey, division.name, index)
      }, orgKey, division.name, index))
    );
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
  return new Intl.DateTimeFormat('en-GB', {day:'numeric', month:'long', year:'numeric', timeZone:JAKARTA_TZ}).format(new Date(`${date}T12:00:00+07:00`));
}

function upcomingItems(){
  const dated = NEWS.filter(isFutureEvent);
  return [...UPCOMING, ...dated];
}

function kegiatanItems(){
  return NEWS.filter(item => !item.date || isPastOrTodayEvent(item));
}

function renderEventOrgLogos(container, org, logoPath, logoAlt){
  container.replaceChildren();
  if(!logoPath && !org) return;
  const orgs = logoPath ? [{key:org, src:logoPath, alt:logoAlt || `Logo ${(org || '').toUpperCase()}`}]
    : (org === 'joint' ? ['slc','tvc'] : [org]).map(key=>({key, src:`image/Logo/Logo_${key.toUpperCase()}.png`, alt:`${key.toUpperCase()} logo`}));
  orgs.forEach(({key,src,alt})=>{
    const logo = document.createElement('img');
    logo.className = `event-org-logo ${key}`;
    logo.src = src;
    logo.alt = alt;
    container.appendChild(logo);
  });
}

function appendStatusBadge(parent, dateStr){
  const label = eventStatusLabel(dateStr);
  if(!label) return;
  const badge = document.createElement('span');
  badge.className = 'news-tag status';
  badge.textContent = label;
  parent.appendChild(badge);
}

function renderNews(){
  const list = document.getElementById('newsList');
  [...kegiatanItems()].sort((a,b)=>(b.date || '').localeCompare(a.date || '')).forEach((item,index)=>{
    const card = document.createElement('article');
    card.className = `news-card ${item.org || ''}`;
    card.style.animationDelay = `${index * 0.05}s`;
    card.hidden = index >= 3;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    const orgLabel = item.organization || (item.org === 'joint' ? 'SLC & TVC' : (item.org || '').toUpperCase());
    card.innerHTML = `<div class="news-thumb ${item.org || ''}" data-label="${(item.type || '').toUpperCase()}"></div><div class="news-body"><div class="news-tags">${orgLabel ? `<span class="news-tag org-${item.org}">${orgLabel}</span>` : ''}${item.type ? `<span class="news-tag type">${item.type}</span>` : ''}</div><h3 class="news-title">${item.title}</h3><p class="news-excerpt">${item.excerpt || ''}</p><div class="news-date-line">${item.date ? formatNewsDate(item.date) : ''}</div></div>`;
    const thumb = card.querySelector('.news-thumb');
    const tagRow = card.querySelector('.news-tags');
    appendStatusBadge(tagRow, item.date);
    const photos = eventImageList(item);
    if(photos.length){
      const image = document.createElement('img');
      image.className = 'news-thumb-image';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.src = photos[0].src;
      image.alt = '';
      if(item.focusUp?.includes(0)) image.style.objectPosition = 'center 35%';
      thumb.appendChild(image);
    }
    const logos = document.createElement('div');
    logos.className = 'event-org-logos';
    logos.setAttribute('aria-label', 'Organizing organizations');
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
  const item = [...kegiatanItems()]
    .filter(event=>event.date)
    .sort((a,b)=>b.date.localeCompare(a.date))[0];
  if(!item){
    section.hidden = true;
    return;
  }
  const photos = eventImageList(item);
  const image = document.getElementById('recentEventImage');
  image.loading = 'lazy';
  image.decoding = 'async';
  image.src = photos[0]?.src || '';
  image.alt = photos.length ? `${item.title} event photo` : '';
  renderEventOrgLogos(document.getElementById('recentEventLogos'), item.org, item.logo, item.logoAlt);
  const badge = document.getElementById('recentEventBadge');
  const status = eventStatusLabel(item.date);
  badge.textContent = status;
  badge.hidden = !status;
  document.getElementById('recentEventDate').textContent = item.date ? formatNewsDate(item.date) : '';
  document.getElementById('recentEventHeading').textContent = item.title;
  document.getElementById('recentEventDescription').textContent = item.excerpt || '';
  const button = document.getElementById('recentEventButton');
  const label = document.getElementById('recentEventButtonLabel');
  if(item.story){
    label.textContent = 'Read the story';
    button.hidden = false;
  }else if(photos.length){
    label.textContent = 'View photos';
    button.hidden = false;
  }else{
    button.hidden = true;
  }
  button.addEventListener('click', ()=>openNews(item));
}

function renderUpcoming(){
  const section = document.getElementById('upcomingSection');
  const list = document.getElementById('upcomingList');
  const items = upcomingItems();
  list.replaceChildren();
  if(!items.length){
    section.hidden = true;
    return;
  }
  section.hidden = false;
  items.forEach(item=>{
    const article = document.createElement('article');
    article.className = 'upcoming-item upcoming-item-single';
    const copy = document.createElement('div');
    copy.className = 'upcoming-event-copy';
    const label = document.createElement('div');
    label.className = 'upcoming-event-label';
    label.textContent = eventStatusLabel(item.date) || 'UPCOMING EVENT';
    const title = document.createElement('h2');
    title.textContent = item.title;
    const desc = document.createElement('p');
    desc.textContent = item.excerpt || '';
    copy.append(label, title);
    if(item.date){
      const dateLine = document.createElement('p');
      dateLine.textContent = formatNewsDate(item.date);
      copy.appendChild(dateLine);
    }
    if(desc.textContent) copy.appendChild(desc);
    article.appendChild(copy);
    list.appendChild(article);
  });
}

function renderLeadershipStats(){
  const slcCount = countOrgOfficers(ORGS.slc);
  const tvcCount = countOrgOfficers(ORGS.tvc);
  const eventCount = NEWS.length;
  const slcDivisions = ORGS.slc.divisions.length;
  const tvcDivisions = ORGS.tvc.divisions.length;
  document.getElementById('leadershipPeriod').textContent = SITE.periodLabel;
  const stats = [
    {value:String(slcCount + tvcCount), title:'Members', copy:`${slcCount} SLC members and ${tvcCount} TVC members.`},
    {value:String(slcDivisions + tvcDivisions), title:'Divisions', copy:`${slcDivisions} SLC divisions and ${tvcDivisions} TVC divisions.`},
    {value:String(eventCount).padStart(2, '0'), title:'Total Events', copy:'The number of main activities held during one leadership term.'},
  ];
  const root = document.getElementById('leadershipStats');
  root.replaceChildren();
  stats.forEach(stat=>{
    const article = document.createElement('article');
    article.className = 'leadership-stat';
    article.innerHTML = `<strong>${stat.value}</strong><h3>${stat.title}</h3><p>${stat.copy}</p>`;
    root.appendChild(article);
  });
}

function svgIcon(name){
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'currentColor');
  const d = {
    instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.6 6.5a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z',
    tiktok: 'M14.2 3h2.3c.2 2.1 1.4 3.6 3.5 3.8v2.3c-1.2 0-2.3-.4-3.3-1.1v6.7A6.7 6.7 0 1 1 9.9 8.1v2.5a4.2 4.2 0 1 0 4.3 4.2V3z',
    youtube: 'M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.3 5.4 12 5.4 12 5.4s-7.3 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.5.4 8.8.4 8.8.4s7.3 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.6V8.8l6.2 3.4z',
  }[name];
  path.setAttribute('d', d);
  svg.appendChild(path);
  return svg;
}

function renderSiteChrome(){
  document.getElementById('slcOrgDescription').textContent = ORGS.slc.description;
  document.getElementById('tvcOrgDescription').textContent = ORGS.tvc.description;
  const feedback = document.getElementById('heroFeedbackLink');
  if(SITE.feedbackFormUrl) feedback.href = SITE.feedbackFormUrl;
  else feedback.hidden = true;

  const contactRoot = document.getElementById('footerContactList');
  contactRoot.replaceChildren();
  const {address, email, phoneDisplay, phoneTel, whatsapp, phoneLabel} = SITE.contact;
  if(address){
    const row = document.createElement('div');
    row.innerHTML = '<span class="footer-contact-label">Address</span>';
    row.appendChild(document.createTextNode(address));
    contactRoot.appendChild(row);
  }
  if(whatsapp || phoneTel){
    const row = document.createElement('div');
    const label = document.createElement('span');
    label.className = 'footer-contact-label';
    label.textContent = 'Phone';
    row.appendChild(label);
    const links = document.createElement('span');
    links.className = 'footer-contact-links';
    if(whatsapp){
      const wa = document.createElement('a');
      wa.href = `https://wa.me/${whatsapp}`;
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
      wa.textContent = phoneLabel ? `${phoneDisplay} - ${phoneLabel}` : phoneDisplay;
      links.appendChild(wa);
    }
    if(phoneTel){
      if(whatsapp) links.appendChild(document.createTextNode(' · '));
      const tel = document.createElement('a');
      tel.href = `tel:${phoneTel}`;
      tel.textContent = 'Call';
      links.appendChild(tel);
    }
    row.appendChild(links);
    contactRoot.appendChild(row);
  }
  if(email){
    const row = document.createElement('div');
    row.innerHTML = '<span class="footer-contact-label">Email</span>';
    const mail = document.createElement('a');
    mail.href = `mailto:${email}`;
    mail.textContent = email;
    row.appendChild(mail);
    contactRoot.appendChild(row);
  }

  const socials = document.getElementById('footerSocials');
  socials.replaceChildren();
  [
    {key:'instagram', label:'Instagram'},
    {key:'tiktok', label:'TikTok'},
    {key:'youtube', label:'YouTube'},
  ].forEach(({key, label})=>{
    const href = SITE.social[key];
    if(!href) return;
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label);
    a.appendChild(svgIcon(key));
    socials.appendChild(a);
  });

  const schoolLink = document.getElementById('footerSchoolLink');
  if(SITE.social.school){
    schoolLink.href = SITE.social.school;
    schoolLink.hidden = false;
  }else{
    schoolLink.hidden = true;
  }
}

let newsGalleryRequestId = 0;
function openNews(item){
  const modal = document.getElementById('newsModal');
  const hero = document.getElementById('newsModalHero');
  hero.className = `news-modal-hero ${item.org}`;
  hero.dataset.label = item.type.toUpperCase();
  const images = eventImageList(item);
  const image = document.getElementById('newsModalImage');
  const captionEl = document.getElementById('newsModalCaption');
  let activeImage = 0;
  const updateGallery = (animate = false)=>{
    const requestId = ++newsGalleryRequestId;
    image.classList.remove('visible');
    const caption = images[activeImage]?.caption || '';
    captionEl.textContent = caption;
    captionEl.hidden = !caption;
    if(images.length){
      image.alt = caption || `${item.title}, foto ${activeImage + 1}`;
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
        image.src = images[activeImage].src;
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
  const orgLabel = item.organization || (item.org === 'joint' ? 'SLC & TVC' : (item.org || '').toUpperCase());
  document.getElementById('newsModalTags').innerHTML = `${orgLabel ? `<span class="news-tag org-${item.org}">${orgLabel}</span>` : ''}${item.type ? `<span class="news-tag type">${item.type}</span>` : ''}<div class="event-org-logos" id="newsModalLogos" aria-label="Organizing organizations"></div>`;
  appendStatusBadge(document.getElementById('newsModalTags'), item.date);
  renderEventOrgLogos(document.getElementById('newsModalLogos'), item.org, item.logo, item.logoAlt);
  document.getElementById('newsModalTitle').textContent = item.title;
  document.getElementById('newsModalDate').textContent = item.date ? formatNewsDate(item.date) : '';
  const desc = document.getElementById('newsModalDesc');
  desc.textContent = item.story || '';
  desc.hidden = !item.story;
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
    newsToggle.querySelector('.news-toggle-label').textContent = 'Show more';
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
  newsToggle.querySelector('.news-toggle-label').textContent = expanded ? 'Show less' : 'Show more';
};
newsToggle.addEventListener('click', ()=>{
  const expanded = newsToggle.getAttribute('aria-expanded') === 'true';
  newsToggle.setAttribute('aria-expanded', String(!expanded));
  syncNewsToggle();
});
renderSiteChrome();
renderLeadershipStats();
renderUpcoming();
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
const curtainLogos = {
  home: 'image/Logo/Logo_Alizzah.ico',
  slc: 'image/Logo/Logo_SLC.png',
  tvc: 'image/Logo/Logo_TVC.png'
};
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
  curtainMark.src = curtainLogos[key];
}

function swapPage(key){
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.dataset.page === key));
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === key));
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

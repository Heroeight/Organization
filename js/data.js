/* Organization leadership, event, and website configuration data. */

/**
 * @typedef {Object} Member
 * @property {string} name
 * @property {string} [role] Kota asal; tampilan diatur SITE.showMemberOrigin
 * @property {string} [unit]
 * @property {string} [img]
 *
 * @typedef {Object} EventImage
 * @property {string} src
 * @property {string} [caption]
 *
 * @typedef {Object} NewsItem
 * @property {string} [date] YYYY-MM-DD (kalender Asia/Jakarta)
 * @property {'slc'|'tvc'|'joint'|'school'} [org]
 * @property {string} [organization]
 * @property {string} [logo]
 * @property {string} [logoAlt]
 * @property {'Event'|'Schedule'} [type]
 * @property {string} title
 * @property {string} [excerpt]
 * @property {string} [story]
 * @property {Array<string|EventImage>} [images]
 */

const SITE = {
  showMemberOrigin: false,
  periodLabel: 'Leadership Term 2026–2027',
  feedbackFormUrl: 'https://forms.gle/Si2iNztbBV6wMpkx6',
  contact: {
    address: 'Indragiri Street, Alley 6, Sumberejo, Batu District, Batu City, East Java 65318',
    email: '',
    /* TODO(user): Replace with organization contact details and choose a label. */
    phoneDisplay: '081319276006',
    phoneTel: '+6281319276006',
    whatsapp: '6281319276006',
    phoneLabel: 'Website Manager',
  },
  social: {
    instagram: 'https://www.instagram.com/slc_als/',
    tiktok: 'https://www.tiktok.com/@mahad_alizzah_batu',
    youtube: 'https://www.youtube.com/@slc_als/videos',
    school: 'https://alizzah-batu.sch.id/',
  },
};

const ORGS = {
  slc: {
    description: 'A student organization at Al Izzah Boys’ Senior High School that designs activities and develops students’ potential through its divisions, encouraging them to take initiative, serve, and contribute to the school community.',
    leader:   { name: 'Rifky Azril Ar Rahman', role: 'Leader', line: 'Leading the Student Leader Community for the 2026–2027 term.', img: 'image/Ketua-wakil/Ketua_SLC.webp', quote: 'From: Jombang' },
    coLeader: { name: 'Muhammad Atthaya Rasyendria', role: 'Vice Leader', line: 'Supporting coordination and the work of every division.', img: 'image/Ketua-wakil/Wakil_SLC.webp', quote: 'From: Samarinda' },
    divisions: [
      { name: 'Daily Manager', description: 'Managing administration, correspondence, schedules, and financial records to keep the organization running smoothly.', members: [
        {name:'Fathan Rafif Athaya', role:'Denpasar', unit:'Secretary', img:"image/anggota/SLC/Daily Manager/10. FATHAN RAFIF ATHAYA_converted_result.webp"},
        {name:'Zhaahir Ali Prabelio', role:'Jombang', unit:'Secretary', img:"image/anggota/SLC/Daily Manager/26. ZHAAHIR ALI PRABELIO_converted_result.webp"},
        {name:'Ramaizan Roisur Rukhaim', role:'Sidoarjo', unit:'Treasurer', img:"image/anggota/SLC/Daily Manager/22. RAMAIZAN ROISUR R_converted_result.webp"},
        {name:'Luthfi Rafif Arkana', role:'Jayapura', unit:'Treasurer', img:"image/anggota/SLC/Daily Manager/15. LUTHFI RAFIF ARKANA_converted_result.webp"},
      ]},
      { name: 'Keamanan', description: 'Helping maintain order, discipline, and safety for students and across the school community.', members: [
        {name:'Mirzadinata Setiyawan', role:'Sidoarjo', img:"image/anggota/SLC/Keamanan/11. MIRZADINATA SETIYAWAN_converted_result.webp"},
        {name:'Ahmad Haidar Al Farras', role:'Gresik', img:"image/anggota/SLC/Keamanan/1. AHMAD HAIDAR ALFARRAS_converted_result.webp"},
        {name:'Galih Fajar Malik Hakiim', role:'Malang', img:"image/anggota/SLC/Keamanan/5. GALIH FAJAR MALIK H_converted_result.webp"},
        {name:'Adli Shidqi Prawira', role:'Batam', img:"image/anggota/SLC/Keamanan/2. ADLI SHIDQI PRAWIRA_converted_result.webp"},
        {name:'Muhammad Kafil Kayzan', role:'Ponorogo', img:"image/anggota/SLC/Keamanan/21. MUH KAFIL KAYZAN_converted_result.webp"},
        {name:'Keenan Nararya Fuad', role:'Gresik', img:"image/anggota/SLC/Keamanan/6. KEENAN NARARYA FUAD_converted_result.webp"},
        {name:'Verdi Aviansyah Mahatama Puguh', role:'Batu', img:"image/anggota/SLC/Keamanan/26. VERDY AVIANSYAH M P_converted_result.webp"},
        {name:'Raditra Priyanto', role:'Berau', img:"image/anggota/SLC/Keamanan/24. RADITRA PRIYANTO_converted_result.webp"},
        {name:'Alfero Ramanda Ediezahirudin Rafie', role:'Probolinggo', img:"image/anggota/SLC/Keamanan/7. ALFERO RAMANDA E R_converted_result.webp"},
        {name:'Ahmad Mutanabbi Mirawanto', role:'Malang', img:"image/anggota/SLC/Keamanan/3. AHMAD MUTANABBI M_converted_result.webp"},
      ]},
      { name: 'Multimedia', description: 'Documenting activities and preparing visual content and communications for the organization.', members: [
        {name:'Ahmad Farel Panatagama', role:'Tulungagung', img:"image/anggota/SLC/Multimedia/2. A FAREL PANATAGAMA_converted_result.webp"},
        {name:'Queenzy Hafidhu Zikry', role:'Semarang', img:"image/anggota/SLC/Multimedia/23. QUEENZY HAFIDHU ZIKRY_converted_result.webp"},
        {name:'Alif Luqmanurrahman Pradhana', role:'Malang', img:"image/anggota/SLC/Multimedia/6. ALIF LUQMANURRAHMAN P_converted_result.webp"},
        {name:'Muhammad Thoriq Akbar', role:'Malang', img:"image/anggota/SLC/Multimedia/17. MUH THORIQ AKBAR_converted_result.webp"},
        {name:'Kenzie Afham Mahija Jati', role:'Bojonegoro', img:"image/anggota/SLC/Multimedia/17. KENZIE AFHAM MAHIJA J_converted_result.webp"},
        {name:'Ali Qiyal Mukhlis', role:'Lampung', img:"image/anggota/SLC/Multimedia/5. ALI QIYAL MUKHLIS_converted_result.webp"},
        {name:'Faith Athallah Efendi', role:'Tuban', unit:'Website Manager', img:"image/anggota/SLC/Multimedia/11. FAITH ATHALLAH EFENDI_converted_result.webp"},
        {name:'Abdurrahman', role:'Samarinda', img:"image/anggota/SLC/Multimedia/1. ABDURRAHMAN_converted_result.webp"},
        {name:'Akasyah Zafran Ghifari', role:'Gresik', img:"image/anggota/SLC/Multimedia/1. AKASYAH ZAFRAN GHIFARI_converted_result.webp"},
        {name:'Lutfi Reza Ramadhan Rifa\'i', role:'Batu', img:"image/anggota/SLC/Multimedia/13. LUTFI REZA RAMADHAN R_converted_result.webp"},
      ]},
      { name: 'Dakwah Masjid', description: 'Supporting outreach and worship activities at the mosque, and helping keep it welcoming and orderly.', members: [
        {name:'Kiagus M Daffa Agha Afkar', role:'Sangatta', img:"image/anggota/SLC/Dakwah Masjid/7. KIAGUS M DAFFA AGHA A_converted_result.webp"},
        {name:'Radithya Al Iskandar Rayhan Putra', role:'Surabaya', img:"image/anggota/SLC/Dakwah Masjid/19. RADITHYA AL I R P_converted_result.webp"},
        {name:'Raka Aulia Faridi', role:'Lampung', img:"image/anggota/SLC/Dakwah Masjid/21. RAKA AULIA FARIDI_converted_result.webp"},
        {name:'Fayyad Alghani', role:'Banjarmasin', img:"image/anggota/SLC/Dakwah Masjid/11. FAYYAD ALGHANI_converted_result.webp"},
        {name:'Riyadh Rifky Balfas', role:'Surabaya', img:"image/anggota/SLC/Dakwah Masjid/24. RIYADH RIFKY BALFAS_converted_result.webp"},
        {name:'Muhammad Ammar Dany Riadi', role:'Berau', img:"image/anggota/SLC/Dakwah Masjid/14. MUH AMMAR DANY RIADI_converted_result.webp"},
        {name:'Teuku Riffat Alfatha Iskandharsyah', role:'Balikpapan', img:"image/anggota/SLC/Dakwah Masjid/25. TEUKU RIFFAT ALFATHA ISKANDHARSYAH_converted_result.webp"},
        {name:'Adis Akmal', role:'Sangatta', img:"image/anggota/SLC/Dakwah Masjid/1. ADIS AKMAL_converted_result.webp"},
        {name:'Muhammad Ibra Kenbizuqi', role:'Lubuklinggau', img:"image/anggota/SLC/Dakwah Masjid/18. MUH IBRA KENBIZUQI_converted_result.webp"},
        {name:'Aqila Izza Adirachman', role:'Tuban', img:"image/anggota/SLC/Dakwah Masjid/4. AQILA IZZA ADIRACHMAN_converted_result.webp"},
      ]},
      { name: 'Olahraga', description: 'Planning and supporting sports activities that build fitness, sportsmanship, and camaraderie among students.', members: [
        {name:'Muhammad Fawwaz Imaadul Haq', role:'Surabaya', img:"image/anggota/SLC/Olahraga/19. M FAWWAZ IMAADUL HAQ_converted_result.webp"},
        {name:'Muhammad Fathan Abidzar Dliya`ulhaq', role:'Mojokerto', img:"image/anggota/SLC/Olahraga/15. MUH FATHAN ABIDZAR D_converted_result.webp"},
        {name:'Muhammad Azzam Ibrahim', role:'Sidoarjo', img:"image/anggota/SLC/Olahraga/14. MUH AZZAM IBRAHIM_converted_result.webp"},
        {name:'Muhammad Jenthara Priyandra Pradana Maheswara', role:'Sidoarjo', img:"image/anggota/SLC/Olahraga/20. M JENTHARA PRIYANDRA PRADANA MAHESWARA_converted_result.webp"},
        {name:'Rakha Firjatullah', role:'Balikpapan', img:"image/anggota/SLC/Olahraga/24. RAKHA FIRJATULLAH_converted_result.webp"},
        {name:'Rifqi Ferdinanta Fadli', role:'Surabaya', img:"image/anggota/SLC/Olahraga/22. RIFQI FERDINANTA FADLI_converted_result.webp"},
        {name:'Muhammad Zulham Amirullah', role:'Pontianak', img:"image/anggota/SLC/Olahraga/21. MUH ZULHAM AMIRULLAH_converted_result.webp"},
        {name:'Rafi Nurcahyo Adati', role:'Manado', img:"image/anggota/SLC/Olahraga/23. RAFI NURCAHYO ADATI_converted_result.webp"},
        {name:'Rezky Alifi Chaniago', role:'Bali', img:"image/anggota/SLC/Olahraga/23. REZKY ALIFI CHANIAGO_converted_result.webp"},
        {name:'Syauqi Imam Azka', role:'Samarinda', img:"image/anggota/SLC/Olahraga/25. SYAUQI IMAM AZKA_converted_result.webp"},
      ]},
      { name: 'Bersih Lingkungan', description: 'Promoting cleanliness and building habits that keep the school grounds tidy and well cared for.', members: [
        {name:'Ahmad Fauzan', role:'Sudu', img:"image/anggota/SLC/Bersih Lingkungan/5. AHMAD FAUZAN_converted_result.webp"},
        {name:'Reyhan Axelle Bonaro Widodo', role:'Banyuwangi', img:"image/anggota/SLC/Bersih Lingkungan/24. REYHAN AXELLE_converted_result.webp"},
        {name:'Ahmad Maulana Zidan Amrullah', role:'Yogyakarta', img:"image/anggota/SLC/Bersih Lingkungan/5. AHMAD MAULANA ZIDAN A_converted_result.webp"},
        {name:'Adzka Faqih Abdillah', role:'Martapura', img:"image/anggota/SLC/Bersih Lingkungan/3. ADZKA FAQIH ABDILLAH_converted_result.webp"},
        {name:'Muhammad Abid Abkary', role:'Sampit', img:"image/anggota/SLC/Bersih Lingkungan/12. MUHAMMAD ABID ABKARY_converted_result.webp"},
        {name:'Muhammad Jeap Nuh Hamzah', role:'Samarinda', img:"image/anggota/SLC/Bersih Lingkungan/19. MUH JEAP NUH HAMZAH_converted_result.webp"},
        {name:'Muhammad Naufal Adhitya Al Fathir Yusuf', role:'Sangatta', img:"image/anggota/SLC/Bersih Lingkungan/17. M NAUFAL ADHITYA AL F Y_converted_result.webp"},
        {name:'Rasya Zhafran Al-Thafsyah', role:'Jember', img:"image/anggota/SLC/Bersih Lingkungan/22. RASYA ZHAFRAN A_converted_result.webp"},
        {name:'Alfino Irwandy Yusuf', role:'Sumenep', img:"image/anggota/SLC/Bersih Lingkungan/7. ALFINO IRWANDY YUSUF_converted_result.webp"},
        {name:'Putra Aditya Soleman', role:'Manado', img:"image/anggota/SLC/Bersih Lingkungan/22. PUTRA ADITYA SOLEMAN_converted_result.webp"},
      ]},
      { name: 'Informasi', description: 'Gathering and sharing organizational announcements clearly, accurately, and accessibly.', members: [
        {name:'Muhammad Naufal Adqaury Ibnu Syaifa', role:'Sorowako', img:"image/anggota/SLC/Informasi/12. M NAUFAL AQQAURY IBNU S_converted_result.webp"},
        {name:'Hanif Sandriano Shiddiq', role:'Cepu', img:"image/anggota/SLC/Informasi/6. HANIF SANDRIANO S_converted_result.webp"},
        {name:'Muhammad Afkar Nizam Arviansyah', role:'Jakarta', img:"image/anggota/SLC/Informasi/19. MUH AFKAR NIZAM A_converted_result.webp"},
        {name:'Muhammad Arkan Najwan Arviansyah', role:'Jakarta', img:"image/anggota/SLC/Informasi/15. MUHAMMAD ARKAN NAJWAN ARVIANSYAH_converted_result.webp"},
        {name:'M. Arif Rezky Alfahadi', role:'Samboja', img:"image/anggota/SLC/Informasi/9. M.ARIF REZKY ALFAHADI_converted_result.webp"},
        {name:'Natka Sadewa Asmoro', role:'Samarinda', img:"image/anggota/SLC/Informasi/17. NATKA SADEWA ASMORO_converted_result.webp"},
        {name:'Abid Yusuf Fahlavi Subagiyo', role:'Pekalongan', img:"image/anggota/SLC/Informasi/1. ABID YUSUF FAHLAVI S_converted_result.webp"},
        {name:'Axel Keanu Ghalva Ramadhan', role:'Sidoarjo', img:"image/anggota/SLC/Informasi/7. AXEL KEANU GHALVA R_converted_result.webp"},
        {name:'Mochamad Daffa Nafiis', role:'Surabaya', img:"image/anggota/SLC/Informasi/11. MOCHAMAD DAFFA NAFIIS_converted_result.webp"},
        {name:'Nufail Alingga Kusworo', role:'Jakarta', img:"image/anggota/SLC/Informasi/20. NUFAIL ALINGGA K_converted_result.webp"},
      ]},
      { name: 'Bahasa', description: 'Encouraging language practice and skill development through language programs and activities.', members: [
        {name:'Muh. Hisyaam Dzaki Mubarak', role:'Jayapura', img:"image/anggota/SLC/Bahasa/11. MUH. HISYAAM DZAKI M_converted_result.webp"},
        {name:'Gallant Radithya Ghani Prasetyo', role:'Sangatta', img:"image/anggota/SLC/Bahasa/5. GALLANT RADITHYA GP_converted_result.webp"},
        {name:'Hafidz Rafi Rabbani', role:'Wamena', img:"image/anggota/SLC/Bahasa/10. HAFIDZ RAFI RABBANI_converted_result.webp"},
        {name:'Muhammad Althaf Arkana Yusuf', role:'Pekanbaru', img:"image/anggota/SLC/Bahasa/13. M ALTHAF ARKANA YUSUF_converted_result.webp"},
        {name:'Ro\'yal Aini Arsyl Putra', role:'Lamongan', img:"image/anggota/SLC/Bahasa/25. RO'YAL AINI ARSYL PUTRA_converted_result.webp"},
        {name:'Andi Afzal Ghaizani', role:'Makassar', img:"image/anggota/SLC/Bahasa/2. ANDI AFZAL GHAIZANI_converted_result.webp"},
        {name:'Muhammad Rafif', role:'Banjarmasin', img:"image/anggota/SLC/Bahasa/17. MUHAMMAD RAFIF_converted_result.webp"},
        {name:'Fahmi Abdullah Hazim', role:'Pontianak', img:"image/anggota/SLC/Bahasa/8. FAHMI ABDULLAH HAZIM_converted_result.webp"},
        {name:'Qeis Fauzi Ghudzamir Zain', role:'Bandar Lampung', img:"image/anggota/SLC/Bahasa/18. QEIS FAUZI GHUDZAMIR Z_converted_result.webp"},
        {name:'Muhammad Mikail Robbani', role:'Probolinggo', img:"image/anggota/SLC/Bahasa/16. MUH MIKAIL ROBBANI_converted_result.webp"},
      ]},
      { name: 'Entrepreneur', description: 'Developing entrepreneurship activities, business creativity, and practical business experience within the organization.', members: [
        {name:'Antares Aesar Aulayain', role:'Surabaya', img:"image/anggota/SLC/Enterpreneur/7. ANTARES AESAR AULAYAIN_converted_result.webp"},
        {name:'M. Noval Fairuz Ahmad', role:'Makassar', img:"image/anggota/SLC/Enterpreneur/16. M.NOVAL FAIRUZ AHMAD_converted_result.webp"},
        {name:'Nabil Alyasih Nur Ramadhan', role:'Malang', img:"image/anggota/SLC/Enterpreneur/21. NABIL ALYASIH NUR R_converted_result.webp"},
        {name:'Muhammad Rezky Aulia Rahman', role:'Malang'},
        {name:'Alif Muhammad', role:'Malang', img:"image/anggota/SLC/Enterpreneur/3. ALIF MUHAMMAD_converted_result.webp"},
        {name:'Fardy Al Abqary', role:'Aceh', img:"image/anggota/SLC/Enterpreneur/9. FARDY AL ABQARY_converted_result.webp"},
        {name:'Trisandi Bharata', role:'Sangatta', img:"image/anggota/SLC/Enterpreneur/26. TRISANDI BHARATA_converted_result.webp"},
        {name:'Nabil Hanif', role:'Balikpapan', img:"image/anggota/SLC/Enterpreneur/19. NABIL HANIF_converted_result.webp"},
        {name:'Ridho Alghifary', role:'Tarakan', img:"image/anggota/SLC/Enterpreneur/25. RIDHO ALGHIFARY_converted_result.webp"},
        {name:'Nazreivo Sulthan Azizan', role:'Surabaya', img:"image/anggota/SLC/Enterpreneur/21. NAZREIVO SULTHAN_converted_result.webp"},
        {name:'Gilang Nugraha Dwi Guna', role:'Tuban', img:"image/anggota/SLC/Enterpreneur/14. GILANG NUGRAHA DWI G_converted_result.webp"},
        {name:'Muhammad Yahya Yanuar', role:'Bima', img:"image/anggota/SLC/Enterpreneur/16. MUH YAHYA YANUAR_converted_result.webp"},
        {name:'Hadi Safwan', role:'Sidoarjo', img:"image/anggota/SLC/Enterpreneur/12. HADI SAFWAN_converted_result.webp"},
      ]},
      { name: 'Penerimaan Tamu', description: 'Welcoming and assisting guests visiting the school.', members: [
        {name:'Salahhuddin Prameswara Anindita', role:'Malang', img:"image/anggota/SLC/Penerimaan Tamu/23. SALAHHUDDIN P A_converted_result.webp"},
        {name:'Muhammad Rakha Azka', role:'Makassar', img:"image/anggota/SLC/Penerimaan Tamu/18. MUHAMMAD RAKHA AZKA_converted_result.webp"},
        {name:'Faqih Ahsan Haniif', role:'Samarinda', img:"image/anggota/SLC/Penerimaan Tamu/12. FAQIH AHSAN HANIIF_converted_result.webp"},
        {name:'Hikmal Rifqie Alghifari Aldrian', role:'Pasuruan', img:"image/anggota/SLC/Penerimaan Tamu/16. HIKMAL RIFQIE ALGHIFARI A_converted_result.webp"},
        {name:'Muhammad Khalifabyaz Mirza Wardhana', role:'Bogor', img:"image/anggota/SLC/Penerimaan Tamu/16. M KHALIFABYAZ MIRZA W_converted_result.webp"},
        {name:'Al Mizan Khairan Raytama Hidayat', role:'Jayapura', img:"image/anggota/SLC/Penerimaan Tamu/1. AL MIZAN KHAIRAN R H_converted_result.webp"},
        {name:'Muhammad Rafif Setyawan', role:'Batam', img:"image/anggota/SLC/Penerimaan Tamu/19. MUH RAFIF SETYAWAN_converted_result.webp"},
        {name:'Michael Al Ardh', role:'Batu', img:"image/anggota/SLC/Penerimaan Tamu/13. MICHAEL AL ARDH_converted_result.webp"},
        {name:'Dhafie Shofwan Ash Shidqie', role:'Samarinda', img:"image/anggota/SLC/Penerimaan Tamu/11. DHAFIE SHOFWAN ASH S_converted_result.webp"},
        {name:'Muhammad Kenzie Prihady', role:'Bontang', img:"image/anggota/SLC/Penerimaan Tamu/20. MUH KENZIE PRIHADY_converted_result.webp"},
        {name:'Adhyaksa Idrus', role:'Makassar', img:"image/anggota/SLC/Penerimaan Tamu/3. ADHYAKSA IDRUS_converted_result.webp"},
        {name:'Achmad Kelvin Arviansyah', role:'Surabaya', img:"image/anggota/SLC/Penerimaan Tamu/1. ACHMAD KELVIN A_converted_result.webp"},
      ]},
      { name: 'Kesenian', description: 'Fostering artistic creativity and helping prepare student performances and arts activities.', members: [
        {name:'Andra Izrami Satya Wardana', role:'Serang', img:"image/anggota/SLC/Kesenian/8. ANDRA IZRAMI SATYA W_converted_result.webp"},
        {name:'Ibrahim Mauladi', role:'Lamongan', img:"image/anggota/SLC/Kesenian/10. IBRAHIM MAULADI_converted_result.webp"},
        {name:'Harits Ghifar Musyafak', role:'Tangerang', img:"image/anggota/SLC/Kesenian/8. HARITS GHIFAR MUSYAFAK_converted_result.webp"},
        {name:'Nicholas Ardian Ananta', role:'Jakarta', img:"image/anggota/SLC/Kesenian/23. NICHOLAS ARDIAN A_converted_result.webp"},
        {name:'Rifky Vio Dhiaurrahman', role:'Sangatta', img:"image/anggota/SLC/Kesenian/21. RIFKY VIO DHIAURRAHMAN_converted_result.webp"},
        {name:'Akhtar Maulana Fattahillah', role:'Sangatta', img:"image/anggota/SLC/Kesenian/5. AKHTAR MAULANA F_converted_result.webp"},
        {name:'Ahmad Adli Assyauqi', role:'Kutai Timur', img:"image/anggota/SLC/Kesenian/4. AHMAD ADLI ASSYAUQI_converted_result.webp"},
        {name:'Barack Octo Wahyumirizky', role:'Malang', img:"image/anggota/SLC/Kesenian/8. BARACK OCTO W_converted_result.webp"},
        {name:'Rezky Noor Fadilah', role:'Palangkaraya', img:"image/anggota/SLC/Kesenian/25. REZKY NOOR FADILAH_converted_result.webp"},
        {name:'Eka Dymaz Janitra Fatkhur Rokhman', role:'Kuta', img:"image/anggota/SLC/Kesenian/8. EKA DYMAS JANITRA F R_converted_result.webp"},
      ]},
      { name: 'Dapur', description: 'Coordinating kitchen needs and activities to support smooth meal service.', members: [
        {name:'Aufa Haiqal', role:'Sangatta', img:"image/anggota/SLC/Dapur/7. AUFA HAIQAL_converted_result.webp"},
        {name:'Radjendra Kafka Aelino', role:'Madiun', img:"image/anggota/SLC/Dapur/25. RADJENDRA KAFKA A_converted_result.webp"},
        {name:'Muhammad Radja Syahputra Bachri', role:'Surabaya', img:"image/anggota/SLC/Dapur/18. MUH RADJA SYAHPUTRA B_converted_result.webp"},
        {name:'Bhaga Persada Brahmana', role:'Pekanbaru', img:"image/anggota/SLC/Dapur/9. BHAGA PERSADA BRAHMANA_converted_result.webp"},
        {name:'Muhammad Athaillah Rahmansyah', role:'Bontang', img:"image/anggota/SLC/Dapur/14. M ATHAILLAH RAHMANSYAH_converted_result.webp"},
        {name:'Rayyan Azka Ahmad', role:'Sidoarjo', img:"image/anggota/SLC/Dapur/23. RAYYAN AZKA AHMAD_converted_result.webp"},
        {name:'Muhammad Raditya Laisafero', role:'Malang', img:"image/anggota/SLC/Dapur/16. MUH RADITYA LAISAFERO_converted_result.webp"},
        {name:'Muhammad Fakhry Ubaydillah Tsaaqif', role:'Sidoarjo', img:"image/anggota/SLC/Dapur/18. M FAKHRY UBAYDILLAH T_converted_result.webp"},
        {name:'Nizar Muzhaffar Sulistyono', role:'Sidoarjo', img:"image/anggota/SLC/Dapur/21. NIZAR MUZHAFFAR S_converted_result.webp"},
        {name:'Akmal Rafa Hernaufal', role:'Mojokerto', img:"image/anggota/SLC/Dapur/6. AKMAL RAFA HERNAUFAL_converted_result.webp"},
      ]},
      { name: 'Pengajaran', description: 'Supporting learning activities, academic guidance, and educational programs for students.', members: [
        {name:'Farelle Pratadiazta Savana', role:'Sidoarjo', img:"image/anggota/SLC/Pengajaran/8. FARELLE PRATADIAZTA S_converted_result.webp"},
        {name:'El Pandora Deni', role:'Surabaya', img:"image/anggota/SLC/Pengajaran/4. EL PANDORA DENI_converted_result.webp"},
        {name:'Aldito Emery Illona Masruri', role:'Tanjung Pinang', img:"image/anggota/SLC/Pengajaran/6. ALDITO EMERY ILLONA M_converted_result.webp"},
        {name:'Muhammad Raihansyah Adzkiya\' Wahyudi', role:'Surabaya'},
        {name:'Muhammad Zafir Ardiansyah', role:'Malang', img:"image/anggota/SLC/Pengajaran/18. MUHAMMAD ZAFIR A_converted_result.webp"},
        {name:'Muhammad Dzaki Akmal', role:'Balikpapan', img:"image/anggota/SLC/Pengajaran/17. MUHAMMAD DZAKI AKMAL_converted_result.webp"},
        {name:'Ataya Fikri Rizqullah Imanuddin', role:'Gresik', img:"image/anggota/SLC/Pengajaran/5. ATAYA FIKRI RIZQULLAH I_converted_result.webp"},
        {name:'Hamam Aslam Ahmad Yasak', role:'Jember', img:"image/anggota/SLC/Pengajaran/15. HAMAM ASLAM AHMAD Y_converted_result.webp"},
        {name:'Rausyan Farras Aly Muhammad', role:'Lamongan', img:"image/anggota/SLC/Pengajaran/24. RAUSYAN FARRAS ALY M_converted_result.webp"},
        {name:'Fadhil Athaya Syadid Rizqullah', role:'Probolinggo', img:"image/anggota/SLC/Pengajaran/11. FADHIL ATHAYA SYADID R_converted_result.webp"},
      ]},
      { name: 'Kesehatan', description: 'Supporting health education and coordinating initial care for students who need assistance.', members: [
        {name:'Zufaro Ardiyoso Razak', role:'Sangatta', img:"image/anggota/SLC/Kesehatan/26. ZUFARO ARDIYOSO RAZAK_converted_result.webp"},
        {name:'Syaamil Abdurrahman', role:'Samarinda', img:"image/anggota/SLC/Kesehatan/24. SYAAMIL ABDURRAHMAN_converted_result.webp"},
        {name:'Atha Rakan Firdaus', role:'Pasuruan', img:"image/anggota/SLC/Kesehatan/9. ATHA RAKAN FIRDAUS_converted_result.webp"},
        {name:'Dheyya Alhijri Rochim', role:'Depok', img:"image/anggota/SLC/Kesehatan/10. DHEYYA ALHIJRI ROCHIM_converted_result.webp"},
        {name:'Muhammad Kenzie Pratinanggawa', role:'Bekasi', img:"image/anggota/SLC/Kesehatan/15. MUH KENZIE P_converted_result.webp"},
        {name:'Alden Salim Widagdo', role:'Sidoarjo', img:"image/anggota/SLC/Kesehatan/6. ALDEN SALIM WIDAGDO_converted_result.webp"},
        {name:'Athaya Daffa Rafif', role:'Riau', img:"image/anggota/SLC/Kesehatan/6. ATHAYA DAFFA RAFIF_converted_result.webp"},
        {name:'Narendra Kasyafani Majeed', role:'Sidoarjo', img:"image/anggota/SLC/Kesehatan/20. NARENDRA KASYAFANI M_converted_result.webp"},
        {name:'Nazril Khairan Windya Putra', role:'Lombok', img:"image/anggota/SLC/Kesehatan/22. NAZRIL KHAIRAN W P_converted_result.webp"},
        {name:'Thaha Yasin Nurwahid', role:'Paser'},
      ]},
      { name: 'Laundry', description: 'Helping manage laundry services so clothing collection and return stay organized.', members: [
        {name:'Muhammad Hilmi Fathuddin', role:'Surabaya', img:"image/anggota/SLC/Laundry/19. MUH HILMI FATHUDDIN_converted_result.webp"},
        {name:'Arjuna Ghazy Wibowo', role:'Pekanbaru', img:"image/anggota/SLC/Laundry/3. ARJUNA GHAZY WIBOWO_converted_result.webp"},
        {name:'Muhammad Qanantha Syauqie', role:'Jayapura'},
        {name:'Malvino Garde Gana', role:'Sumatera Selatan', img:"image/anggota/SLC/Laundry/18. MALVINO GARDE GANA_converted_result.webp"},
        {name:'Muhammad Fairus Irzam', role:'Balikpapan', img:"image/anggota/SLC/Laundry/14. MUHAMMAD FAIRUS IRZAM_converted_result.webp"},
        {name:'Haraka Hiroshi Ilmi', role:'Lamongan', img:"image/anggota/SLC/Laundry/7. HARAKA HIROSHI ILMI_converted_result.webp"},
      ]},
    ]
  },
  tvc: {
    description: 'The Vanguard Coordinator is a student organization at Al Izzah Boys’ Senior High School focused on Scouting and coordinating divisions and activities. While SLC designs activities and develops student potential, TVC helps ensure plans are carried out responsibly and in an orderly manner.',
    leader:   { name: 'Yusuf Hazim Suyitno', role: 'Leader', line: 'Leading The Vanguard Coordinator.', img: 'image/Ketua-wakil/Ketua_TVC.webp', quote: 'From: Jakarta' },
    coLeader: { name: 'Muhammad Alfaruq Ardiansyah', role: 'Vice Leader', line: 'Supporting coordination for The Vanguard Coordinator.', img: 'image/Ketua-wakil/Wakil_TVC.webp', quote: 'From: Makassar' },
    divisions: [
      { name: 'ANKUSET', fullName: 'Andalan Koordinator Urusan Sekretaris', description: 'Managing TVC administration, including records, correspondence, and activity documentation.', members: [
        {name:'Ibrahim Alfarisi', role:'Gresik', unit:'Member', img:"image/anggota/TVC/ANKUSET/20. MUH IBRAHIM AL FARISI_converted_result.webp"},
        {name:'Darren Athalla Ghifari', role:'Tangerang', unit:'Member', img:"image/anggota/TVC/ANKUSET/10. DARREN ATHALLA GHIFARI_converted_result.webp"},
      ]},
      { name: 'ANKUKUANG', fullName: 'Andalan Koordinator Urusan Keuangan', description: 'Managing income and expense records, and helping prepare and account for TVC activity budgets.', members: [
        {name:'Akbar Prasetya', role:'Berau', unit:'Member', img:"image/anggota/TVC/ANKUKUANG/3. AKBAR PRASETYA HUTAMA_converted_result.webp"},
        {name:'Arya Adriansyah Putra Pratama', role:'Palangka Raya', unit:'Member', img:"image/anggota/TVC/ANKUKUANG/2. ARYA ADRIANSYAH PUTRA P_converted_result.webp"},
      ]},
      { name: 'ANKULAT', fullName: 'Andalan Koordinator Urusan Latihan', description: 'Planning and supporting Scouting training to develop members’ skills and readiness.', members: [
        {name:'Zhafrano Raja Triarka', role:'Banyuwangi', unit:'Member', img:"image/anggota/TVC/ANKULAT/26. ZHAFRANO RAJA TRIARKA_converted_result.webp"},
        {name:'Dimas Rasya Wibowo', role:'Makassar', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/13. DIMAS RASYA WIBOWO_converted_result.webp"},
        {name:'Muhammad Asyam Fawwaz', role:'Banjarbaru', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/13. MUH ASYAM FAWWAZ_converted_result.webp"},
        {name:'Abiyyu Kiya Dhia Almaas', role:'Sidoarjo', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/2. ABIYYU KIYA DHIA ALMAAS_converted_result.webp"},
        {name:'Mochammad Fachri Akbar', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/10. MOCH FACHRI AKBAR_converted_result.webp"},
        {name:'Mochammad Rizqi Akbar', role:'Bojonegoro', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/12. MOCHAMAD RIZQI AKBAR_converted_result.webp"},
        {name:'Ahmad Hafizh Abdurrahman', role:'Gresik', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/4. A HAFIZH ABDURRAHMAN_converted_result.webp"},
        {name:'Muhammad Sultan Jafri', role:'Banjarbaru', unit:'Anggota', img:"image/anggota/TVC/ANKULAT/20. MUHAMMAD SULTAN JAFRI_converted_result.webp"},
      ]},
      { name: 'ANKUPERKAP', fullName: 'Andalan Koordinator Urusan Perlengkapan', description: 'Preparing, tracking, and maintaining the equipment needed for TVC activities and training.', members: [
        {name:'Hanif Rabbani Humayun', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/13. HANIF RABBANI HUMAYUN_converted_result.webp"},
        {name:'Arkan Athaya Basri', role:'Banyuwangi', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/4. ARKAN ATHAYA BASRI_converted_result.webp"},
        {name:'Ahmadinajat Billah', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/3. AHMADINAJAT BILLAH_converted_result.webp"},
        {name:'Fatih Ikhsan Zuhaily', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/13. FATIH IKHSAN ZUHAILY_converted_result.webp"},
        {name:'Abiyyu Fawwaz Amanullah', role:'Batam', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/1. ABIYYU FAWWAZ A_converted_result.webp"},
        {name:'Muhammad Rehan', role:'Balikpapan', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/19. MUHAMMAD REHAN_converted_result.webp"},
        {name:'Muhammad Haafiz Ramadhan', role:'Mojokerto', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/15. MUH HAAFIZ RAMADHAN_converted_result.webp"},
        {name:'Farel Novrinno Rizky', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKUPERKAP/14. FAREL NOVRINNO RIZKY_converted_result.webp"},
      ]},
      { name: 'ANKUKEDAP', fullName: 'Andalan Koordinator Urusan Kedai Pramuka', description: 'Coordinating the Scout shop (Kedai Pramuka) and its needs during TVC activities.', members: [
        {name:'Dika Achmad Luqmansyah', role:'Pasuruan', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/12. DIKA ACHLUKMANSYAH_converted_result.webp"},
        {name:'Kaffi Athallah Lirfano', role:'Jakarta', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/16. KAFFI ATALLAH LIRFANO_converted_result.webp"},
        {name:'Adrian Arhaburrizqi Himawan', role:'Lombok', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/2. ADRIAN ARHABURRIZQI H_converted_result.webp"},
        {name:'Rahmat Semesta Alam', role:'Nganjuk', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/24. RAHMAT SEMESTA ALAM_converted_result.webp"},
        {name:'Muhammad Dzulfiqaar Amril Haq', role:'Berau', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/17. M DZULFIQAAR AMRIL HAQ_converted_result.webp"},
        {name:'Ahmad Wildan Alqowiy', role:'Bekasi', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/4. AKHMAD WILDAN ALQOWIY_converted_result.webp"},
        {name:'Ibrahimovic Ghaisan', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/11. IBRAHIMOVIC GHAISAN A_converted_result.webp"},
        {name:'Irvin Fico Saverio', role:'Banjarbaru', unit:'Anggota', img:"image/anggota/TVC/ANKUKEDAP/9. IRVIN FICO SAVERIO_converted_result.webp"},
      ]},
      { name: 'BINDEP', fullName: 'Barisan Depan', description: 'Coordinating the development of Frontline Unit members and helping ensure Scouting activities run smoothly.', members: [
        {name:'Muhammad Athaillah Aidan', role:'Balikpapan', unit:'Division Lead', img:"image/anggota/TVC/BINDEP/18. MUH ATHAILLAH AIDAN_converted_result.webp"},
        {name:'Waldan Yafiq Zhafran', role:'Balikpapan', unit:'Anggota', img:"image/anggota/TVC/BINDEP/26. WALDAN YAFIQ ZHAFRAN_converted_result.webp"},
        {name:'KenzieUmar Muhammad Thufail', role:'Bekasi', unit:'Anggota', img:"image/anggota/TVC/BINDEP/17. KENZIEUMAR MUHTHUFAIL_converted_result.webp"},
        {name:'Ahmad Haedar Habibie', role:'Bojonegoro', unit:'Anggota', img:"image/anggota/TVC/BINDEP/2. AHMAD HAEDAR HABIBIE_converted_result.webp"},
        {name:'Ariel Bagoes Sanjaya', role:'Surabaya', unit:'Anggota', img:"image/anggota/TVC/BINDEP/5. ARIEL BAGOES SANJAYA_converted_result.webp"},
        {name:'Daffa Kanz Pratama', role:'Makassar', unit:'Anggota', img:"image/anggota/TVC/BINDEP/3. DAFFA KANZ PRATAMA_converted_result.webp"},
        {name:'Danish Raynar Nayaka', role:'Berau', unit:'Anggota', img:"image/anggota/TVC/BINDEP/9. DANISH RAYNAR NAYAKA_converted_result.webp"},
      ]},
    ]
  }
};

/* TODO(user): Add event stories and photo captions when available ({src, caption}). */
const NEWS = [
  {date:'2026-10-04',org:'joint',type:'Event',title:'Murobi Cup & Artshow',excerpt:'Highlights from the Murobi Cup and Artshow, held on Sunday, October 4, 2026.',story:'The Murobi Cup and Artshow took place on Sunday, October 4, 2026.',images:['image/events/Murobicup & Artshow/murobicup1.webp','image/events/Murobicup & Artshow/murobicup2.webp','image/events/Murobicup & Artshow/murobicup3.webp']},
  {date:'2026-08-17',org:'joint',type:'Event',title:'IDC: Independence Day Committee',excerpt:'A celebration of Indonesia’s Independence Day, featuring a ceremony and a variety of competitions at Al Izzah Batu.',story:'The Independence Day Committee (IDC) celebrated Indonesia’s Independence Day with a ceremony and a variety of competitions. The event honored the nation’s struggle while fostering unity, sportsmanship, and patriotism at Al Izzah Batu.',images:['image/events/IDC/idc1.webp','image/events/IDC/idc2.webp','image/events/IDC/idc3.webp']},
  {date:'2026-10-01',org:'school',organization:'School',logo:'image/events/AZKAR/azkar-logo.webp',logoAlt:'AZKAR logo',type:'Event',title:'AZKAR: Ajang Zona Kreativitas dan Apresiasi Remaja',excerpt:'A celebration of Language Month through AZKAR (Ajang Zona Kreativitas dan Apresiasi Remaja).',story:'AZKAR (Ajang Zona Kreativitas dan Apresiasi Remaja) was organized by the school to celebrate Language Month.',images:['image/events/AZKAR/azkar1.webp','image/events/AZKAR/azkar2.webp','image/events/AZKAR/azkar3.webp']},
  {date:'2026-09-16',org:'slc',type:'Schedule',title:'JMQ: Jam’iyatul Qurra Selection Test',excerpt:'Selection for Jam’iyatul Qurra participants at Al Izzah Batu.',story:'The Jam’iyatul Qurra (JMQ) selection test was held on September 16, 2026. The gallery features photos from the organization’s local archive.',images:['image/events/JMQ/jmq1.webp','image/events/JMQ/jmq2.webp','image/events/JMQ/jmq3.webp']},
  {date:'2026-09-12',org:'tvc',type:'Event',title:'Scouting: Opening Ceremony',excerpt:'The opening of a Scouting event with Al Izzah Batu students.',story:'The Scouting opening ceremony marked the start of a series of development and Scouting activities for students at Al Izzah Batu.',images:['image/events/Pembukaan Pramuka/pramuka1.webp','image/events/Pembukaan Pramuka/pramuka2.webp','image/events/Pembukaan Pramuka/pramuka3.webp']},
  {date:'2026-08-22',org:'joint',organization:'SLC & TVC',logo:'image/events/DPP/dpp-logo.png',logoAlt:'DPP logo',type:'Event',title:'DPP: Leadership Handover Board',excerpt:'A moment to transfer leadership responsibilities and formally hand over duties between SLC and TVC.',story:'The Leadership Handover Board (DPP) marked the transfer of leadership responsibilities between the Student Leader Community and The Vanguard Coordinator.',images:['image/events/DPP/dpp1.webp','image/events/DPP/dpp2.webp','image/events/DPP/dpp3.webp']},
];

/* Undated events are kept here and are not included in completed activity totals. */
const UPCOMING = [
  {title:'COSMOTION', excerpt:'A Scouting event for the special units of each troop.'},
];

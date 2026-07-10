import React, { useState, useMemo, useEffect } from 'react';

// Data awal diambil dari sampel tabel Monitoring Verifikasi BPKP
const initialData = [
  { id: 1, nama: "Abdul Haris Faqih, S.E., M.E.", unit: "Pusat Strategi Kebijakan Pengawasan", verifikasi: "" },
  { id: 2, nama: "Adi Lesmana, S.E., M.E.", unit: "Perwakilan BPKP Provinsi Gorontalo", verifikasi: "" },
  { id: 3, nama: "Adisti Dwi Septyarini, S.E.", unit: "Perwakilan BPKP Provinsi Kalimantan Selatan", verifikasi: "" },
  { id: 4, nama: "Agustinus Febi Dwi Purnama, S.E., M.E.", unit: "Pusat Strategi Kebijakan Pengawasan", verifikasi: "" },
  { id: 5, nama: "Amriady, S.E.", unit: "Perwakilan BPKP Provinsi Sulawesi Utara", verifikasi: "Perbaikan" },
  { id: 6, nama: "Anda Volita Tionggung Sondang br Hasugian, S.E.", unit: "Perwakilan BPKP Provinsi Banten", verifikasi: "" },
  { id: 7, nama: "Anita Trisia, S.E.", unit: "Pusat Pembinaan Jabatan Fungsional Auditor", verifikasi: "" },
  { id: 8, nama: "Baby Fauziah Zainal, S.Ak.", unit: "Deputi Bidang Pengawasan Penyelenggaraan Keuangan Daerah", verifikasi: "Disetujui" },
  { id: 9, nama: "Dedi Supriathin, S.S.T.", unit: "Perwakilan BPKP Provinsi Kalimantan Utara", verifikasi: "Perbaikan" },
  { id: 10, nama: "Dina Emeliana Sembiring, S.E.", unit: "Perwakilan BPKP Provinsi Sumatera Utara", verifikasi: "" },
  { id: 11, nama: "Edvan Dehancha Noviandy, S.E.", unit: "Pusat Pembinaan Jabatan Fungsional Auditor", verifikasi: "" },
  { id: 12, nama: "Edy Suyatno, S.E.", unit: "Perwakilan BPKP Provinsi Lampung", verifikasi: "" },
  { id: 13, nama: "Erdiana Vicki, Ak., M.Si.", unit: "Perwakilan BPKP Provinsi Jawa Tengah", verifikasi: "Disetujui" },
  { id: 14, nama: "Erika Hanim, S.E.", unit: "Perwakilan BPKP Aceh", verifikasi: "" },
  { id: 15, nama: "Fadlian Lazuardi Mulyono, S.E.", unit: "Perwakilan BPKP Daerah Istimewa Yogyakarta", verifikasi: "" },
  { id: 16, nama: "Fatimah Ermawati, S.S.T.Akt.", unit: "Pusat Informasi Pengawasan", verifikasi: "" },
  { id: 17, nama: "Ginanjar Adi Nugroho, S.E., Akt.", unit: "Perwakilan BPKP Provinsi Jawa Timur", verifikasi: "" },
  { id: 18, nama: "Hendrikus Tri Wahyu Susetyo, S.E.", unit: "Deputi Bidang Investigasi", verifikasi: "Disetujui" },
  { id: 19, nama: "I Gede Agus Subakti Wijaya, S.E.", unit: "Perwakilan BPKP Provinsi Bali", verifikasi: "" },
  { id: 20, nama: "I Ketut Parwata, S.Ak.", unit: "Perwakilan BPKP Provinsi Sulawesi Utara", verifikasi: "Disetujui" },
  { id: 21, nama: "I Putu Budiasa, S.E., M.Ak.", unit: "Deputi Bidang Akuntan Negara", verifikasi: "" },
  { id: 22, nama: "Ike Damayanti, S.E.", unit: "Perwakilan BPKP Provinsi Jawa Tengah", verifikasi: "Disetujui" },
  { id: 23, nama: "Ilyas Indra Utama, S.E.", unit: "Perwakilan BPKP Provinsi Kepulauan Riau", verifikasi: "Disetujui" },
  { id: 24, nama: "Iwan Setiawan, S.Kom., M.B.A.", unit: "Deputi Bidang Pengawasan Instansi Pemerintah...", verifikasi: "" },
  { id: 25, nama: "Kanta Rio Saputra, S.S.T., Ak., M.Ak.", unit: "Pusat Strategi Kebijakan Pengawasan", verifikasi: "" },
  { id: 26, nama: "Linda Indah Kinarsi, Ak., M.A.", unit: "Pusat Pembinaan Jabatan Fungsional Auditor", verifikasi: "" },
  { id: 27, nama: "Luat Parsaoran Tinambunan, S.E.", unit: "Perwakilan BPKP Provinsi Jambi", verifikasi: "" },
];

export default function DashboardBPKP() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("Sudah Daftar"); // Tabs: "Semua", "Sudah Daftar", "Belum Daftar"
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // Kalkulasi Ringkasan Data (Otomatis menyesuaikan jika ada perubahan)
  const totalPeserta = data.length;
  const sudahDaftar = data.filter(item => item.verifikasi !== "").length;
  const belumDaftar = totalPeserta - sudahDaftar;

  // Handler untuk mengupdate kolom Hasil Verifikasi
  const handleUpdateVerifikasi = (id, newValue) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, verifikasi: newValue } : item
      )
    );
    
    // Tampilkan notifikasi (Toast) agar tidak menggunakan alert()
    setToast("Berhasil memperbarui Hasil Verifikasi!");
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Filter data untuk ditabelkan
  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by Tab
    if (activeTab === "Sudah Daftar") {
      filtered = filtered.filter(item => item.verifikasi !== "");
    } else if (activeTab === "Belum Daftar") {
      filtered = filtered.filter(item => item.verifikasi === "");
    }

    // Filter by Search Query (Nama)
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [data, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Navbar / Top Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white shadow-inner shadow-blue-500/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Monitoring BPKP</h1>
              <p className="text-xs text-slate-500 font-medium">Dashboard Verifikasi Madya</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600 hidden md:block">Administrator</span>
            <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* KPI Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Peserta */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Calon Peserta</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">{totalPeserta}</h2>
            </div>
          </div>

          {/* Card 2: Sudah Mendaftar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Sudah Mendaftar</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">{sudahDaftar}</h2>
            </div>
          </div>

          {/* Card 3: Belum Mendaftar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Belum Mendaftar</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">{belumDaftar}</h2>
            </div>
          </div>
        </section>

        {}
        {/* Table Section */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
              {["Sudah Daftar", "Belum Daftar", "Semua"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab 
                    ? "bg-white text-blue-700 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {tab} 
                  <span className="ml-2 text-xs bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500">
                    {tab === "Sudah Daftar" ? sudahDaftar : tab === "Belum Daftar" ? belumDaftar : totalPeserta}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari nama peserta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-9 p-2.5 outline-none transition-all"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4 w-12 font-semibold">No</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Nama Peserta</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Unit Kerja (Organisasi)</th>
                  <th scope="col" className="px-6 py-4 font-semibold w-56">Hasil Verifikasi (Ubah)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((peserta, index) => (
                    <tr key={peserta.id} className="bg-white border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-400">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{peserta.nama}</td>
                      <td className="px-6 py-4 text-slate-500">{peserta.unit}</td>
                      <td className="px-6 py-4">
                        
                        {}
                        {/* Dropdown Editable langsung di tabel */}
                        <div className="relative">
                          <select
                            value={peserta.verifikasi}
                            onChange={(e) => handleUpdateVerifikasi(peserta.id, e.target.value)}
                            className={`w-full appearance-none border rounded-lg pl-3 pr-8 py-2 text-sm font-medium outline-none transition-all cursor-pointer shadow-sm
                              ${peserta.verifikasi === "Disetujui" ? "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500" 
                              : peserta.verifikasi === "Perbaikan" ? "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500"
                              : peserta.verifikasi === "Ditolak" ? "bg-red-50 text-red-700 border-red-200 focus:ring-red-500"
                              : "bg-slate-50 text-slate-500 border-slate-200 focus:ring-blue-500"} focus:ring-2`}
                          >
                            <option value="">Belum Daftar</option>
                            <option value="Disetujui">Disetujui</option>
                            <option value="Perbaikan">Perbaikan</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className={`w-4 h-4 ${peserta.verifikasi === "Disetujui" ? "text-emerald-500" : peserta.verifikasi === "Perbaikan" ? "text-amber-500" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-300 mb-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p className="text-base font-medium">Tidak ada data ditemukan</p>
                        <p className="text-sm">Silakan ubah filter atau kueri pencarian Anda.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Toast Notification (Professional replacement for alert()) */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-up z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
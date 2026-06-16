import React, { useState, useRef, useEffect } from 'react';
import { Camera, FileText, Calendar, User, Clock, CheckCircle2, Image as ImageIcon, Trash2, AlertCircle, MapPin, Tag } from 'lucide-react';

const App = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    name: '',
    activityName: '',
    location: '',
    activity: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Harap unggah file berupa gambar (JPG/PNG).');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
        setPhotoPreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name.trim() || !formData.activityName.trim() || !formData.location.trim() || !formData.activity.trim() || !formData.photo) {
      setError('Mohon lengkapi semua bidang yang tersedia.');
      return;
    }

    const newReport = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setReports(prev => [newReport, ...prev]);
    
    // Reset Form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      name: '',
      activityName: '',
      location: '',
      activity: '',
      photo: null
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setSuccess('Laporan harian berhasil disimpan!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-xl overflow-hidden w-12 h-12 flex items-center justify-center shadow-sm border-2 border-blue-600/50">
              <img 
                src="ChatGPT Image Oct 14, 2025, 08_55_02 PM.jpg" 
                alt="Logo SILAPOR" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SILAPOR DISKOPUKM</h1>
              <p className="text-xs text-blue-100 font-medium">Sistem Informasi Laporan Harian</p>
            </div>
          </div>
          <div className="hidden sm:block text-sm font-medium text-blue-100 bg-blue-800/50 px-3 py-1.5 rounded-full">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        { }
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Buat Laporan Baru
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Notifications */}
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm flex items-start">
                  <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pegawai</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Activity Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kegiatan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="activityName"
                    value={formData.activityName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rapat Koordinasi"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Kegiatan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Contoh: Ruang Rapat Lt. 2"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Activity Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Uraian Kegiatan</label>
                <textarea
                  name="activity"
                  value={formData.activity}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Jelaskan kegiatan yang dilakukan hari ini..."
                  className="block w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors resize-none"
                ></textarea>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bukti Foto Dokumentasi</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-slate-50 relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="space-y-1 text-center">
                    {photoPreview ? (
                      <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm font-medium flex items-center">
                            <Camera className="w-4 h-4 mr-2" /> Ganti Foto
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            Unggah file
                          </span>
                          <p className="pl-1">atau seret dan lepas</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF hingga 5MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Kirim Laporan
              </button>
            </form>
          </div>
        </div>

        { }
        {/* Right Column: Reports Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Riwayat Laporan</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {reports.length} Laporan
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">Belum ada laporan</h3>
              <p className="text-slate-500">Laporan yang Anda buat akan muncul di sini.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  
                  {/* Report Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{report.name}</p>
                        <div className="flex items-center text-xs text-slate-500 mt-0.5">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className="mr-3">{report.date}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{report.timestamp} WIB</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(report.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Hapus Laporan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {}
                  {/* Report Body */}
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{report.activityName}</h3>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                        <span>{report.location}</span>
                      </div>
                      
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Uraian Kegiatan</h4>
                      <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                        {report.activity}
                      </p>
                    </div>
                    
                    {report.photo && (
                      <div className="w-full md:w-64 flex-shrink-0">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dokumentasi</h4>
                        <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                          <img 
                            src={report.photo} 
                            alt="Dokumentasi Kegiatan" 
                            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                            onClick={() => window.open(report.photo, '_blank')} // Simple way to view larger
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
"use client";

import { useState, useEffect, useMemo } from "react";
// Asumsi type Guru memiliki: id, nip, nama, email, jenisKelamin, username, agama, tempatLahir, tanggalLahir, noTelp, nik, nuptk, statusKepegawaian, alamat, isAktif, waliKelas, createdAt, updatedAt
// Note: Perlu penyesuaian di useGuru() atau asumsi Mata Pelajaran ada di field `mataPelajaran` (atau diparse dari relasi lain). Untuk demo ini, saya akan gunakan nilai placeholder.
import { useGuru, type Guru } from "@/hooks/use-guru";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";

// Helper untuk format tanggal
const formatDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return "---";
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    // Format ke DD/MM/YY HH:mm
    return (
      date.toLocaleDateString("id-ID", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  } catch {
    return "Invalid Date";
  }
};

type FormErrors = Record<string, string>;

const TeacherForm = ({
  formData,
  setFormData,
  errors, // Menerima errors state
  isEdit = false,
}: {
  formData: Partial<Guru>;
  setFormData: (data: Partial<Guru>) => void;
  errors: FormErrors;
  isEdit?: boolean;
}) => {
  // Helper untuk menampilkan error
  const renderError = (field: string) =>
    errors[field] ? (
      <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap dengan Gelar</Label>
        <Input
          id="nama"
          placeholder="Nama Guru"
          value={formData.nama || ""}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          className={
            errors.nama ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("nama")}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jk">Jenis Kelamin</Label>
          <select
            id="jk"
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.jenisKelamin
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            value={formData.jenisKelamin}
            onChange={(e) =>
              setFormData({
                ...formData,
                jenisKelamin: e.target.value as "L" | "P",
              })
            }
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {renderError("jenisKelamin")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="agama">Agama</Label>
          <select
            id="agama"
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.agama ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            value={formData.agama}
            onChange={(e) =>
              setFormData({ ...formData, agama: e.target.value })
            }
          >
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          {renderError("agama")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input
            id="tempatLahir"
            value={formData.tempatLahir || ""}
            onChange={(e) =>
              setFormData({ ...formData, tempatLahir: e.target.value })
            }
            className={
              errors.tempatLahir
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {renderError("tempatLahir")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            type="date"
            value={formData.tanggalLahir || ""}
            onChange={(e) =>
              setFormData({ ...formData, tanggalLahir: e.target.value })
            }
            className={
              errors.tanggalLahir
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {renderError("tanggalLahir")}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="noTelp">No. Telepon</Label>
        <Input
          id="noTelp"
          value={formData.noTelp || ""}
          onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
          className={
            errors.noTelp ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("noTelp")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="guru@sekolah.sch.id"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={
            errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("email")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nik">NIK</Label>
        <Input
          id="nik"
          value={formData.nik || ""}
          onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
          className={
            errors.nik ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("nik")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nuptk">NUPTK</Label>
        <Input
          id="nuptk"
          value={formData.nuptk || ""}
          onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
          className={
            errors.nuptk ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("nuptk")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nip">NIP</Label>
        <Input
          id="nip"
          placeholder="19xxxxxxxx"
          value={formData.nip || ""}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({
              ...formData,
              nip: val,
              username: !isEdit ? val : formData.username,
            });
          }}
          className={
            errors.nip ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("nip")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="statusKepegawaian">Status Pegawai</Label>
        <select
          id="statusKepegawaian"
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.statusKepegawaian
              ? "border-red-500 focus-visible:ring-red-500"
              : ""
          }`}
          value={formData.statusKepegawaian}
          onChange={(e) =>
            setFormData({ ...formData, statusKepegawaian: e.target.value })
          }
        >
          <option value="PNS">PNS</option>
          <option value="Honorer">Honorer</option>
          <option value="GTY">GTY</option>
          <option value="GTT">GTT</option>
        </select>
        {renderError("statusKepegawaian")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat</Label>
        <Textarea
          id="alamat"
          value={formData.alamat || ""}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          className={
            errors.alamat ? "border-red-500 focus-visible:ring-red-500" : ""
          }
        />
        {renderError("alamat")}
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isAktif}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isAktif: checked })
            }
          />
          <Label>{formData.isAktif ? "Aktif" : "Non Aktif"}</Label>
        </div>
      </div>

      {!isEdit && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username Login</Label>
            <Input
              id="username"
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={
                errors.username
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {renderError("username")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordDefault">Password Default</Label>
            <Input
              id="passwordDefault"
              type="password"
              placeholder="Minimal 6 karakter"
              value={formData.passwordDefault || ""}
              onChange={(e) =>
                setFormData({ ...formData, passwordDefault: e.target.value })
              }
              className={
                errors.passwordDefault
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {renderError("passwordDefault")}
          </div>
        </div>
      )}
    </div>
  );
};

export default function TeachersManagementPage() {
  const {
    data: teachers,
    meta,
    loading,
    fetchGuru,
    createGuru,
    updateGuru,
    deleteGuru,
  } = useGuru();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Guru | null>(null);

  // State baru untuk menangani error validasi
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<Partial<Guru>>({
    nip: "",
    nama: "",
    email: "",
    jenisKelamin: "L",
    username: "",
    passwordDefault: "",
    agama: "Islam",
    tempatLahir: "",
    tanggalLahir: "",
    noTelp: "",
    nik: "",
    nuptk: "",
    statusKepegawaian: "PNS",
    alamat: "",
    isAktif: true,
  });

  useEffect(() => {
    // Diasumsikan fetchGuru memiliki pagination dan search
    fetchGuru(1, 10, search);
  }, [fetchGuru, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      nip: "",
      nama: "",
      email: "",
      jenisKelamin: "L",
      username: "",
      passwordDefault: "",
      agama: "Islam",
      tempatLahir: "",
      tanggalLahir: "",
      noTelp: "",
      nik: "",
      nuptk: "",
      statusKepegawaian: "PNS",
      alamat: "",
      isAktif: true,
    });
    setSelectedTeacher(null);
    setValidationErrors({}); // Clear errors when closing/resetting form
  };

  /**
   * Fungsi untuk memvalidasi form data
   */
  const validateForm = (data: Partial<Guru>, isEditMode: boolean): boolean => {
    const newErrors: FormErrors = {};

    const requiredFields: (keyof Partial<Guru>)[] = [
      "nama",
      "jenisKelamin",
      "agama",
      "tempatLahir",
      "tanggalLahir",
      "noTelp",
      "email",
      "nik",
      "nuptk",
      "nip",
      "statusKepegawaian",
      "alamat",
    ];

    for (const field of requiredFields) {
      const value = data[field]?.toString().trim();
      if (!value) {
        newErrors[field] = "Field ini wajib diisi.";
      }
    }

    // Validasi khusus mode Tambah
    if (!isEditMode) {
      if (!data.username?.trim()) {
        newErrors.username = "Username wajib diisi.";
      }
      if (!data.passwordDefault?.trim()) {
        newErrors.passwordDefault = "Password default wajib diisi.";
      }
    }

    // Validasi format NIP dan NIK
    if (data.nip && !/^\d*$/.test(data.nip)) {
      newErrors.nip = "NIP hanya boleh terdiri dari angka.";
    }

    if (data.nik && !/^\d*$/.test(data.nik)) {
      newErrors.nik = "NIK hanya boleh terdiri dari angka.";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validateForm(formData, false)) {
      console.error("Validasi gagal saat menambahkan guru.");
      return;
    }

    // Jika validasi sukses, clear errors dan lanjutkan
    setValidationErrors({});
    const success = await createGuru(formData as Guru);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedTeacher || !validateForm(formData, true)) {
      console.error("Validasi gagal saat mengedit guru.");
      return;
    }

    // Jika validasi sukses, clear errors dan lanjutkan
    setValidationErrors({});
    const success = await updateGuru(selectedTeacher.id, formData);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (teacher: Guru) => {
    setSelectedTeacher(teacher);
    setFormData({
      nip: teacher.nip,
      nama: teacher.nama,
      email: teacher.email,
      jenisKelamin: teacher.jenisKelamin,
      username: teacher.username,
      agama: teacher.agama,
      tempatLahir: teacher.tempatLahir,
      // Format tanggal lahir untuk input type="date"
      tanggalLahir: teacher.tanggalLahir
        ? new Date(teacher.tanggalLahir).toISOString().split("T")[0]
        : "",
      noTelp: teacher.noTelp,
      nik: teacher.nik,
      nuptk: teacher.nuptk,
      statusKepegawaian: teacher.statusKepegawaian,
      alamat: teacher.alamat,
      isAktif: teacher.isAktif,
    });
    setValidationErrors({}); // Clear previous errors
    setIsEditOpen(true);
  };

  // Jumlah kolom sesuai header baru (11 data + 1 aksi = 12)
  const COL_SPAN_COUNT = 12;

  // Placeholder untuk data yang tidak ada di model Guru asli
  const getDummyMataPelajaran = (nip: string) => {
    // Dummy logic untuk simulasi jumlah mapel
    const num = parseInt(nip.substring(nip.length - 2), 10) % 5; // 0-4
    if (num === 0) return "Guru Kelas";
    return `${num + 1} Mapel`;
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Guru
          </h1>
          <p className="text-gray-500 mt-2">Kelola data dan penempatan guru.</p>
        </div>
        <Dialog
          open={isAddOpen}
          onOpenChange={(open) => {
            setIsAddOpen(open);
            if (!open) resetForm(); // Reset form dan error saat dialog ditutup
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Guru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Guru Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi lengkap guru baru di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <TeacherForm
              formData={formData}
              setFormData={setFormData}
              errors={validationErrors}
            />
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAdd}
                className="w-full sm:w-auto"
              >
                Simpan Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="text-lg font-semibold text-gray-900">Daftar Guru</div>
          <div className="relative w-full sm:max-w-sm ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari NIP atau Nama..."
              className="pl-10 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 text-xs uppercase tracking-wider text-gray-600">
                <TableHead className="min-w-[200px] font-bold">
                  Nama Guru
                </TableHead>
                <TableHead className="w-[120px] font-bold">
                  Status Pegawai
                </TableHead>
                <TableHead className="w-[100px] font-bold">
                  Wali Kelas
                </TableHead>
                <TableHead className="w-[120px] font-bold">
                  Mata Pelajaran
                </TableHead>
                <TableHead className="w-[120px] font-bold">NIP</TableHead>
                <TableHead className="w-[120px] font-bold">NUPTK</TableHead>
                <TableHead className="w-[120px] font-bold">Telepon</TableHead>
                <TableHead className="w-[120px] font-bold">
                  Jenis Kelamin
                </TableHead>
                <TableHead className="w-[100px] font-bold">Agama</TableHead>
                <TableHead className="w-[80px] font-bold">Status</TableHead>
                <TableHead className="min-w-[150px] font-bold">
                  Pembaruan
                </TableHead>
                <TableHead className="w-[80px] font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Skeleton loading rows
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={COL_SPAN_COUNT}>
                      <div className="flex space-x-2">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : teachers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={COL_SPAN_COUNT}
                    className="text-center py-12 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p>Tidak ada data guru yang ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {teacher.nama}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {teacher.statusKepegawaian || "---"}
                    </TableCell>
                    <TableCell>
                      {teacher.waliKelas ? (
                        <span className="text-sm font-semibold text-blue-600">
                          {teacher.waliKelas.namaKelas}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    {/* Placeholder Mata Pelajaran */}
                    <TableCell className="text-sm text-gray-600">
                      {getDummyMataPelajaran(teacher.nip || "00")}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-gray-600">
                      {teacher.nip || "---"}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-gray-600">
                      {teacher.nuptk || "---"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {teacher.noTelp || "---"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {teacher.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {teacher.agama || "---"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          teacher.isAktif
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {teacher.isAktif ? "Aktif" : "Non Aktif"}
                      </span>
                    </TableCell>
                    {/* Asumsi field updatedAt tersedia */}
                    <TableCell className="text-xs text-gray-500">
                      {(teacher as any).updatedAt
                        ? formatDate((teacher as any).updatedAt)
                        : "---"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* Tombol Edit - Kembali ke format Ikon */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => openEdit(teacher)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            {/* Tombol Hapus - Kembali ke format Ikon */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hapus Data Guru?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus data guru{" "}
                                <strong>{teacher.nama}</strong> secara permanen.
                                Akun pengguna terkait juga akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteGuru(teacher.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus Permanen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/30">
          <div className="text-sm text-gray-500">
            Halaman {meta.page} dari {meta.totalPages || 1}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => fetchGuru(meta.page - 1, meta.limit, search)}
              className="bg-white"
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => fetchGuru(meta.page + 1, meta.limit, search)}
              className="bg-white"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) resetForm(); // Reset form dan error saat dialog ditutup
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Data Guru</DialogTitle>
            <DialogDescription>
              Perbarui informasi guru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <TeacherForm
            formData={formData}
            setFormData={setFormData}
            errors={validationErrors}
            isEdit
          />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

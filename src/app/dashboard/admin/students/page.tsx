"use client";

import { useState, useEffect } from "react";
// Asumsi type Siswa memiliki: id, nis, nisn, nama, jenisKelamin, agama, tempatLahir, tanggalLahir, alamat, nik, status, updatedAt
import { useSiswa, type Siswa } from "@/hooks/use-siswa";
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

// Tipe untuk props form
type StudentFormProps = {
  formData: Partial<Siswa>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Siswa>>>;
};

// Helper untuk format tanggal
const formatDate = (dateString: string | Date | undefined): string => {
  if (!dateString) return "---";
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

// ====================================================================
// Komponen StudentForm (Didefinisikan di luar komponen utama)
// ====================================================================
const StudentForm = ({ formData, setFormData }: StudentFormProps) => {
  // Handler universal untuk semua input kecuali select/textarea yang tipenya khusus
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="nik">NIK Peserta Didik</Label>
        <Input
          id="nik"
          value={formData.nik || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nisn">NISN Peserta Didik</Label>
        <Input
          id="nisn"
          value={formData.nisn || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="nis">NIS (Nomor Induk Siswa)</Label>
        <Input
          id="nis"
          value={formData.nis || ""}
          onChange={handleInputChange}
          placeholder="Digunakan untuk login"
        />
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="nama">Nama Peserta Didik</Label>
        <Input
          id="nama"
          value={formData.nama || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
          <select
            id="jenisKelamin"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.jenisKelamin}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                jenisKelamin: e.target.value as "L" | "P",
              }))
            }
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="agama">Agama</Label>
          <select
            id="agama"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.agama}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agama: e.target.value }))
            }
          >
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input
            id="tempatLahir"
            value={formData.tempatLahir || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            type="date"
            value={formData.tanggalLahir || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pendidikanSebelumnya">Pendidikan Sebelumnya</Label>
        <Input
          id="pendidikanSebelumnya"
          value={formData.pendidikanSebelumnya || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat Peserta Didik</Label>
        <Textarea
          id="alamat"
          value={formData.alamat || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="namaAyah">Nama Ayah Peserta Didik</Label>
          <Input
            id="namaAyah"
            value={formData.namaAyah || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pekerjaanAyah">Pekerjaan</Label>
          <Input
            id="pekerjaanAyah"
            value={formData.pekerjaanAyah || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="namaIbu">Nama Ibu Peserta Didik</Label>
          <Input
            id="namaIbu"
            value={formData.namaIbu || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pekerjaanIbu">Pekerjaan</Label>
          <Input
            id="pekerjaanIbu"
            value={formData.pekerjaanIbu || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamatOrtu">Alamat Orang Tua Peserta Didik</Label>
        <Textarea
          id="alamatOrtu"
          value={formData.alamatOrtu || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="namaWali">Nama Wali Peserta Didik</Label>
          <Input
            id="namaWali"
            value={formData.namaWali || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pekerjaanWali">Pekerjaan</Label>
          <Input
            id="pekerjaanWali"
            value={formData.pekerjaanWali || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamatWali">Alamat Wali Peserta Didik</Label>
        <Textarea
          id="alamatWali"
          value={formData.alamatWali || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, status: e.target.value as any }))
          }
        >
          <option value="Aktif">Aktif</option>
          <option value="Non Aktif">Non Aktif</option>
          <option value="Lulus">Lulus</option>
          <option value="Keluar">Keluar</option>
          <option value="Pindah">Pindah</option>
        </select>
      </div>
    </div>
  );
};
// ====================================================================
// AKHIR StudentForm
// ====================================================================

export default function StudentsManagementPage() {
  const {
    data: students,
    meta,
    loading,
    fetchSiswa,
    createSiswa,
    updateSiswa,
    deleteSiswa,
  } = useSiswa();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Siswa | null>(null);

  const [formData, setFormData] = useState<Partial<Siswa>>({
    nisn: "",
    nama: "",
    jenisKelamin: "L",
    agama: "Islam",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanSebelumnya: "",
    alamat: "",
    namaAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    pekerjaanIbu: "",
    alamatOrtu: "",
    namaWali: "",
    pekerjaanWali: "",
    alamatWali: "",
    status: "Aktif",
    nik: "",
  });

  useEffect(() => {
    fetchSiswa(1, 10, search);
  }, [fetchSiswa, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      nisn: "",
      nama: "",
      jenisKelamin: "L",
      agama: "Islam",
      tempatLahir: "",
      tanggalLahir: "",
      pendidikanSebelumnya: "",
      alamat: "",
      namaAyah: "",
      pekerjaanAyah: "",
      namaIbu: "",
      pekerjaanIbu: "",
      alamatOrtu: "",
      namaWali: "",
      pekerjaanWali: "",
      alamatWali: "",
      status: "Aktif",
      nik: "",
    });
    setSelectedStudent(null);
  };

  const handleAdd = async () => {
    const success = await createSiswa(formData as Siswa);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedStudent) return;
    const success = await updateSiswa(selectedStudent.id, formData as Siswa);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (student: Siswa) => {
    setSelectedStudent(student);
    setFormData({
      nisn: student.nisn,
      nama: student.nama,
      jenisKelamin: student.jenisKelamin,
      agama: student.agama,
      tempatLahir: student.tempatLahir,
      tanggalLahir: student.tanggalLahir
        ? new Date(student.tanggalLahir).toISOString().split("T")[0]
        : "",
      pendidikanSebelumnya: student.pendidikanSebelumnya,
      alamat: student.alamat,
      namaAyah: student.namaAyah,
      pekerjaanAyah: student.pekerjaanAyah,
      namaIbu: student.namaIbu,
      pekerjaanIbu: student.pekerjaanIbu,
      alamatOrtu: student.alamatOrtu,
      namaWali: student.namaWali,
      pekerjaanWali: student.pekerjaanWali,
      alamatWali: student.alamatWali,
      status: student.status,
      nik: student.nik,
    });
    setIsEditOpen(true);
  };

  // Jumlah kolom baru
  const COL_SPAN_COUNT = 11;

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Siswa
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola data, status, dan informasi siswa.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Siswa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Siswa Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi lengkap siswa baru di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <StudentForm formData={formData} setFormData={setFormData} />
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
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan NIS atau Nama..."
              className="pl-10 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {meta.total} Siswa
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 text-xs uppercase tracking-wider text-gray-600">
                <TableHead className="min-w-[180px] font-bold">
                  Nama Siswa
                </TableHead>
                <TableHead className="w-[80px] font-bold">L/P</TableHead>
                <TableHead className="min-w-[120px] font-bold">
                  Tanggal Lahir
                </TableHead>
                <TableHead className="min-w-[150px] font-bold">NIK</TableHead>
                <TableHead className="min-w-[150px] font-bold">NISN</TableHead>
                <TableHead className="min-w-[100px] font-bold">Agama</TableHead>
                <TableHead className="min-w-[300px] font-bold">
                  Alamat
                </TableHead>
                <TableHead className="w-[100px] font-bold">Kelas</TableHead>
                <TableHead className="w-[100px] font-bold">Status</TableHead>
                <TableHead className="min-w-[120px] font-bold">
                  Pembaruan
                </TableHead>
                {/* START: PERUBAHAN ALIGNMENT HEADER AKSI */}
                <TableHead className="w-[80px] text-left font-bold">
                  Aksi
                </TableHead>
                {/* END: PERUBAHAN ALIGNMENT HEADER AKSI */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Skeleton loading rows, colSpan disesuaikan
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={COL_SPAN_COUNT}>
                      <div className="flex space-x-2">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={COL_SPAN_COUNT} // colSpan disesuaikan
                    className="text-center py-12 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p>Tidak ada data siswa yang ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {student.nama}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                          student.jenisKelamin === "L"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {student.jenisKelamin}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(student.tanggalLahir)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-gray-600">
                      {student.nik || "---"}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-gray-600">
                      {student.nisn || "---"}
                    </TableCell>
                    <TableCell className="text-sm">{student.agama}</TableCell>
                    <TableCell
                      className="text-sm text-gray-600 truncate"
                      title={student.alamat}
                    >
                      {/* Tampilkan 50 karakter pertama */}
                      {student.alamat
                        ? `${student.alamat.substring(0, 50)}${
                            student.alamat.length > 50 ? "..." : ""
                          }`
                        : "---"}
                    </TableCell>
                    {/* KELAS: Karena field 'kelas' tidak ada di state, gunakan placeholder */}
                    <TableCell className="text-sm font-semibold text-gray-700">
                      {"---"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          student.status === "Aktif"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            student.status === "Aktif"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        />
                        {student.status}
                      </span>
                    </TableCell>
                    {/* PEMBARUAN: Asumsi ada field updatedAt. Jika tidak ada, fallback ke --- */}
                    <TableCell className="text-xs text-gray-500">
                      {(student as any).updatedAt
                        ? formatDate((student as any).updatedAt)
                        : "---"}
                    </TableCell>
                    {/* START: PERUBAHAN ALIGNMENT CELL DAN BUTTON AKSI */}
                    <TableCell className="text-left">
                      <div className="flex justify-start gap-2">
                        {/* END: PERUBAHAN ALIGNMENT CELL DAN BUTTON AKSI */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => openEdit(student)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Hapus Data Siswa?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus data siswa{" "}
                                <strong>{student.nama}</strong> secara permanen.
                                Akun pengguna terkait juga akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteSiswa(student.id)}
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

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Data Siswa</DialogTitle>
              <DialogDescription>
                Perbarui informasi siswa di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <StudentForm formData={formData} setFormData={setFormData} />
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleEdit}
                className="w-full sm:w-auto"
              >
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

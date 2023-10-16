interface IBangCap {
	ID_BC: string;
	TEN_BC: string;
	GHI_CHU_BC: string | null;
}
interface IChucVu {
	ID_CHV: string;
	TEN_CHV: string;
	GHI_CHU_CHV: string | null;
}

interface IChungChi {
	ID_CHCH: string;
	TEN_CHCH: string;
	GHI_CHU_CHCH: string | null;
}

interface ICongCu {
	ID_CC: string;
	TEN_CC: string;
	SL_CC: number;
	GHI_CHU_CC: string | null;
	IS_ACTIVE_CC: boolean;
}

interface ICongCuDonVi {
	ID_CCDV: string;
	ID_DV: string | null;
	ID_CC: string | null;
	IS_ACTIVE_CCDV: Buffer;
}

interface ICongViec {
	ID_CV: string;
	TEN_CV: string;
	GHI_CHU_CV: string | null;
	IS_ACTIVE_CV: boolean;
}
interface IDanhGiaDauViec {
	ID_DGDV: string;
	ID_MDDGDV: string | null;
	ID_NVDV: string | null;
	ID_NVDA: string | null;
	NGAY_DGDV: string | null;
	GHI_CHU_DGDV: string | null;
}
interface IDanhGiaNhanVienDuAn {
	ID_DGNV: string;
	ID_MDDGNVDA: string | null;
	ID_NVDA: string | null;
	ID_NVPB: string | null;
	NGAY_DGNVDA: string;
	GHI_CHU_DGNVDA: string | null;
}

interface IDauViec {
	ID_DVC: string;
	TEN_DVC: string;
	GHI_CHU_DVC: string | null;
}
interface IDauViecCongViec {
	ID_DVCV: string;
	ID_CV: string | null;
	ID_NVDV: string | null;
	NGAY_HT_DK_DVCV: string | null;
	NGAY_HT_DVCV: string | null;
	GHI_CHU_DVCV: string | null;
}
interface IDauXuatCongCu {
	ID_DXCC: string;
	ID_CC: string | null;
	ID_THDXDA: string | null;
	SL_DXCC: number;
}
interface IDeXuatDuAn {
	ID_DXDA: string;
	ID_NVDA: string | null;
	ID_NV: string | null;
	NGAY_TAO_DXDA: string | null;
	NGAY_DUYET_DXDA: string | null;
	NOI_DUNG_DXDA: string | null;
	GHI_CHU_DXDA: string | null;
}
interface IDexuatNguyenLieu {
	ID_DXNL: string;
	ID_THDXDA: string | null;
	ID_NL: string | null;
	SL_DXNL: number;
}
interface IDeXuatVatTu {
	ID_DXVT: string;
	ID_THDXDA: string | null;
	ID_VT: string | null;
	SL_DXVT: number;
}
interface IDonVi {
	ID_DV: string;
	TEN_DV: string;
	GHI_CHU_DV: string | null;
	IS_ACTIVE_DV: boolean;
}
interface IDuAn {
	ID_DA: string;
	TEN_DA: string;
	NGAY_TAO_DA: string;
	NGAY_BAT_DAU_DA: string | null;
	NGAY_KT_DU_KIEN_DA: string | null;
	NGAY_KET_THUC_DA: string | null;
	GHI_CHU_DA: string | null;
}
interface IDuAnDauViec {
	ID_DA_DV: string;
	ID_DA: string | null;
	ID_DVC: string | null;
	NGAY_TAO_DA_DV: string;
	NGAY_HT_DADV: string | null;
	NGAY_HT_DK_DADV: string | null;
	GHI_CHU_DADV: string | null;
}
interface IDuAnPhongBan {
	ID_DA_PB: string;
	ID_DA: string | null;
	ID_PB: string | null;
	NGAY_THAM_GIA_DA_PB: string;
	NGAY_KET_THUC_DA_PB: string | null;
	GHI_CHU_DA_PB: string | null;
}
interface IDuyetNhanVien {
	ID_DNV: string;
	ID_NV: string | null;
	NHA_ID_NV__: string | null;
	ID_NVPB: string | null;
	NGAY_DE_XUAT_DNV: string | null;
	NGAY_DUYET_DNV: string | null;
}
interface IHuyen {
	ID_HUYEN: string;
	ID_TINH: string | null;
	CODE_HUYEN: number;
	TEN_HUYEN: string;
	GHI_CHU_HUYEN: string | null;
}
interface IKhachHang {
	ID_KH: string;
	TEN_KH: string | null;
	DIA_CHI_KH: string | null;
	DIEN_THOAI_KH: string | null;
	FAX_KH: string | null;
	EMAIL_KH: string | null;
	GHI_CHU_KH: string | null;
}
interface IKhachHangDuAn {
	ID_KH_DA: string;
	ID_DA: string | null;
	ID_KH: string | null;
	KINH_PHI_KHDA: number;
	NGAY_TAO_KH_DA: string;
	NGAY_BAN_GIAO: string | null;
	HUY_KHDA: boolean;
	GHI_CHU_KHDA: string | null;
}
interface ILichSuCongViec {
	ID_LSCV: string;
	ID_CV: string;
	NGAY_TAO_LSCV: string;
	NOI_DUNG_LSCV: string;
	GHI_CHU_LSCV: string | null;
}
interface ILichSuDauViec {
	ID_LSDV: string;
	ID_NVDV: string | null;
	NGAY_TAO_LSDV: string | null;
	NOI_DUNG_LSDV: string | null;
	GHI_CHU_LSDV: string | null;
}
interface IMucDoDanhGiaDauViec {
	ID_MDDGDV: string;
	TEN_MDDDGV: string;
	GHI_CHU_MDDDGDV: string | null;
}
interface IMucDoDanhGiaNVDA {
	ID_MDDGNVDA: string;
	TEN_MDDGNVDA: string;
}
interface INguyenLieu {
	ID_NL: string;
	TEN_NL: string;
	SL_NL: number;
	GHI_CHU_NL: string | null;
	IS_ACTIVE_NL: boolean;
}
interface INguyenLieuDonVi {
	ID_NL_DV: string;
	ID_NL: string | null;
	ID_DV: string | null;
	IS_ACTIVE_NLDV: boolean;
}
interface INhaCungCap {
	ID_NCC: string;
	TEN_NCC: string;
	DIEN_THOAI_NCC: string | null;
	DIA_CHI_NCC: string | null;
	GHI_CHU_NCC: string | null;
	EMAIL_NCC: string | null;
}
interface INhaCungCapCongCu {
	ID_NCCCC: string;
	ID_NCC: string | null;
	ID_CC: string | null;
	GHI_CHU_NCCCC: string | null;
}
interface INhaCungCapNguyenLieu {
	ID_NCCNL: string;
	ID_NCC: string | null;
	ID_NL: string | null;
	GHI_CHU_NCCNL: string | null;
}
interface INhaCungCapVatTu {
	ID_NCCVT: string;
	ID_NCC: string | null;
	ID_VT: string | null;
	GHI_CHU_NCCVT: string | null;
}
interface INhanVien {
	ID_NV: string;
	ID_HUYEN: string | null;
	ID_TP: string | null;
	HO_TEN_NV: string | null;
	DIA_CHI_NV: string | null;
	DIEN_THOAI_NV: string | null;
	GHI_CHU_NV: string | null;
	GIOI_TINH_NV: string;
	EMAIL_NV: string | null;
	IS_ACTIVE_NV: boolean;
}
interface INhanVienBangCap {
	ID_NVBC: string;
	ID_BC: string | null;
	ID_NV: string | null;
	NGAY_CAP_NVBC: string | null;
	GHI_CHU_NVBC: string | null;
}
interface INhanVienChucVu {
	ID_NVCV: string;
	ID_NV: string | null;
	ID_CHV: string | null;
	NGAY_BD_NVCV: string | null;
	NGAY_KT_NVCV: string | null;
	GHI_CHU_NVCV: string | null;
}
interface INhanVienChungChi {
	ID_NV_CC: string;
	ID_NV: string | null;
	ID_CHCH: string | null;
	NGAY_CAP_NVCC: string | null;
	NGAY_HET_HAN_NVCC: string;
	GHI_CHU_NVCC: string | null;
}
interface INhanVienChuyenMon {
	ID_NVCM: string;
	ID_NVPB: string | null;
	ID_BC: string | null;
	NGAY_BAT_DAU_NVCM: string;
	NGAY_KEY_THUC_NVCM: string | null;
	GHI_CHU_NVCM: string | null;
}
interface INhanVienDauViec {
	ID_NVDV: string;
	ID_NVDA: string | null;
	ID_DA_DV: string | null;
	GHI_CHU_NVDV: string | null;
}
interface INhanVienDuAn {
	ID_NVDA: string;
	NHA_ID_NHVDA__: string | null;
	ID_DA: string | null;
	ID_DNV: string | null;
	ID_NV: string | null;
	NGAY_BAT_DAU_NVDA: string;
	NGAY_KET_THUC_NVDA: string | null;
	GHI_CHU_NVDA: string | null;
}
interface INhanVienPhongBan {
	ID_NVPB: string;
	ID_NV: string | null;
	ID_PB: string | null;
	NHA_ID_NVPB__: string | null;
	NGAY_BD_NVPB: string;
	NGAY_KT_NVPB: string | null;
	GHI_CHU_NVPB: string | null;
}
interface INhanVienQuyenDauViec {
	ID_NVQDV: string;
	ID_NVDV: string | null;
	ID_QDV: string | null;
	GHI_CHU_NVQDV: string | null;
}
interface INhanVienQuyenDuAn {
	ID_NVQDA: string;
	ID_QDA: string | null;
	ID_NV: string | null;
	GHI_CHU_NVQDA: string | null;
}
interface IPhongBan {
	ID_PB: string;
	TEN_PB: string | null;
	DIEN_THOAI_PB: string | null;
	GHI_CHU_PB: string | null;
}
interface IQuyen {
	ID_QUYEN: string;
	TEN_QUYEN: string;
	GHI_CHU_QUYEN: string | null;
}
interface IQuyenChucVu {
	ID_QCHV: string;
	ID_NVCV: string | null;
	ID_QUYEN: string | null;
	GHI_CHU_QCHV: string | null;
}
interface IQuyenDauViec {
	ID_QDV: string;
	TEN_QDV: string;
	GHI_CHU_QDV: string | null;
}
interface IQuyenDuAn {
	ID_QDA: string;
	TEN_QDA: string;
	GHI_CHU_QDA: string | null;
}
interface ISuKienDuAn {
	ID_SKDA: string;
	ID_NVDA: string | null;
	NHA_ID_NVDA__: string | null;
	NGAY_TAO_SKDA: string;
	NGAY_DUYET_SKDA: string | null;
	NOI_DUNG_SKDA: string | null;
	GHI_CHU_SKDA: string | null;
}
interface ITaiKhoan {
	USERNAME: string;
	PASSWORD: string;
	IS_ACTIVE_TK: boolean;
}
interface ITaiKhoanNhanVien {
	ID_TKNV: string;
	ID_NV: string | null;
	USERNAME: string | null;
	NGAY_TAO_TKNV: string | null;
}
interface IThanhPho {
	ID_TP: string;
	ID_TINH: string | null;
	CODE_TP: string;
	TEN_TP: string;
	GHI_CHU_TP: string | null;
}
interface IThucHienDXDA {
	ID_THDXDA: string;
	ID_DXDA: string | null;
	ID_PB: string | null;
	NGAY_THDXDA: string;
	KINH_PHI: string;
}
interface ITiLeQuyDoi {
	ID_TLQD: string;
	ID_VTDV: string | null;
	ID_NLDA: string | null;
	VAT_ID_VTDV__: string | null;
	ID_CCDV: string | null;
	CON_ID_CCDV__: string | null;
	NGU_ID_NLDV__: string | null;
	TI_LE: number;
	GHI_CHU_TLQD: string | null;
}
interface ITinh {
	ID_TINH: string;
	CODE_TINH: string;
	TEN_TINH: string;
	GHI_CHU_TINH: string | null;
}
interface IVatTu {
	ID_VT: string;
	TEN_VT: string;
	SL_VT: number;
	GHI_CHU_VT: string | null;
	IS_ACTIVE_VT: string | null;
}
interface IVatTuDonVi {
	ID_VTDV: string;
	ID_VT: string | null;
	ID_DV: string | null;
	ID_ACTIVE_VTDV: boolean;
}

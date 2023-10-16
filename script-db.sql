if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CONG_CU_DON_VI') and o.name = 'FK_CONG_CU__RELATIONS_CONG_CU')
alter table CONG_CU_DON_VI
   drop constraint FK_CONG_CU__RELATIONS_CONG_CU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CONG_CU_DON_VI') and o.name = 'FK_CONG_CU__RELATIONS_DON_VI')
alter table CONG_CU_DON_VI
   drop constraint FK_CONG_CU__RELATIONS_DON_VI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_DAU_VIEC') and o.name = 'FK_DANH_GIA_RELATIONS_NHAN_VIE4')
alter table DANH_GIA_DAU_VIEC
   drop constraint FK_DANH_GIA_RELATIONS_NHAN_VIE4
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_DAU_VIEC') and o.name = 'FK_DANH_GIA_RELATIONS_MUC_DO_D')
alter table DANH_GIA_DAU_VIEC
   drop constraint FK_DANH_GIA_RELATIONS_MUC_DO_D
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_DAU_VIEC') and o.name = 'FK_DANH_GIA_RELATIONS_NHAN_VIE')
alter table DANH_GIA_DAU_VIEC
   drop constraint FK_DANH_GIA_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_NV_DA') and o.name = 'FK_DANH_GIA_RELATIONS_NHAN_VIE2')
alter table DANH_GIA_NV_DA
   drop constraint FK_DANH_GIA_RELATIONS_NHAN_VIE2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_NV_DA') and o.name = 'FK_DANH_GIA_RELATIONS_NHAN_VIE3')
alter table DANH_GIA_NV_DA
   drop constraint FK_DANH_GIA_RELATIONS_NHAN_VIE3
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANH_GIA_NV_DA') and o.name = 'FK_DANH_GIA_RELATIONS_MUC_DO_D2')
alter table DANH_GIA_NV_DA
   drop constraint FK_DANH_GIA_RELATIONS_MUC_DO_D2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DAU_VIEC_CONG_VIEC') and o.name = 'FK_DAU_VIEC_RELATIONS_NHAN_VIE')
alter table DAU_VIEC_CONG_VIEC
   drop constraint FK_DAU_VIEC_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DAU_VIEC_CONG_VIEC') and o.name = 'FK_DAU_VIEC_RELATIONS_CONG_VIE')
alter table DAU_VIEC_CONG_VIEC
   drop constraint FK_DAU_VIEC_RELATIONS_CONG_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_CONG_CU') and o.name = 'FK_DE_XUAT__RELATIONS_THUC_HIE3')
alter table DE_XUAT_CONG_CU
   drop constraint FK_DE_XUAT__RELATIONS_THUC_HIE3
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_CONG_CU') and o.name = 'FK_DE_XUAT__RELATIONS_CONG_CU')
alter table DE_XUAT_CONG_CU
   drop constraint FK_DE_XUAT__RELATIONS_CONG_CU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_DU_AN') and o.name = 'FK_DE_XUAT__RELATIONS_NHAN_VIE2')
alter table DE_XUAT_DU_AN
   drop constraint FK_DE_XUAT__RELATIONS_NHAN_VIE2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_DU_AN') and o.name = 'FK_DE_XUAT__RELATIONS_NHAN_VIE')
alter table DE_XUAT_DU_AN
   drop constraint FK_DE_XUAT__RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_NGUYEN_LIEU') and o.name = 'FK_DE_XUAT__RELATIONS_THUC_HIE')
alter table DE_XUAT_NGUYEN_LIEU
   drop constraint FK_DE_XUAT__RELATIONS_THUC_HIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_NGUYEN_LIEU') and o.name = 'FK_DE_XUAT__RELATIONS_NGUYEN_L')
alter table DE_XUAT_NGUYEN_LIEU
   drop constraint FK_DE_XUAT__RELATIONS_NGUYEN_L
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_VAT_TU') and o.name = 'FK_DE_XUAT__RELATIONS_VAT_TU')
alter table DE_XUAT_VAT_TU
   drop constraint FK_DE_XUAT__RELATIONS_VAT_TU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DE_XUAT_VAT_TU') and o.name = 'FK_DE_XUAT__RELATIONS_THUC_HIE2')
alter table DE_XUAT_VAT_TU
   drop constraint FK_DE_XUAT__RELATIONS_THUC_HIE2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DUYET_NHAN_VIEN') and o.name = 'FK_DUYET_NH_RELATIONS_NHAN_VIE')
alter table DUYET_NHAN_VIEN
   drop constraint FK_DUYET_NH_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DUYET_NHAN_VIEN') and o.name = 'FK_DUYET_NH_RELATIONS_NHAN_VIE3')
alter table DUYET_NHAN_VIEN
   drop constraint FK_DUYET_NH_RELATIONS_NHAN_VIE3
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DUYET_NHAN_VIEN') and o.name = 'FK_DUYET_NH_RELATIONS_NHAN_VIE2')
alter table DUYET_NHAN_VIEN
   drop constraint FK_DUYET_NH_RELATIONS_NHAN_VIE2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DU_AN_DAU_VIEC') and o.name = 'FK_DU_AN_DA_RELATIONS_DU_AN')
alter table DU_AN_DAU_VIEC
   drop constraint FK_DU_AN_DA_RELATIONS_DU_AN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DU_AN_DAU_VIEC') and o.name = 'FK_DU_AN_DA_RELATIONS_DAU_VIEC')
alter table DU_AN_DAU_VIEC
   drop constraint FK_DU_AN_DA_RELATIONS_DAU_VIEC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DU_AN_PHONG_BAN') and o.name = 'FK_DU_AN_PH_RELATIONS_DU_AN')
alter table DU_AN_PHONG_BAN
   drop constraint FK_DU_AN_PH_RELATIONS_DU_AN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DU_AN_PHONG_BAN') and o.name = 'FK_DU_AN_PH_RELATIONS_PHONG_BA')
alter table DU_AN_PHONG_BAN
   drop constraint FK_DU_AN_PH_RELATIONS_PHONG_BA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('HUYEN') and o.name = 'FK_HUYEN_RELATIONS_TINH')
alter table HUYEN
   drop constraint FK_HUYEN_RELATIONS_TINH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('KHACH_HANG_DU_AN') and o.name = 'FK_KHACH_HA_RELATIONS_KHACH_HA')
alter table KHACH_HANG_DU_AN
   drop constraint FK_KHACH_HA_RELATIONS_KHACH_HA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('KHACH_HANG_DU_AN') and o.name = 'FK_KHACH_HA_RELATIONS_DU_AN')
alter table KHACH_HANG_DU_AN
   drop constraint FK_KHACH_HA_RELATIONS_DU_AN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('LICH_SU_CONG_VIEC') and o.name = 'FK_LICH_SU__RELATIONS_CONG_VIE')
alter table LICH_SU_CONG_VIEC
   drop constraint FK_LICH_SU__RELATIONS_CONG_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('LICH_SU_DAU_VIEC') and o.name = 'FK_LICH_SU__RELATIONS_NHAN_VIE')
alter table LICH_SU_DAU_VIEC
   drop constraint FK_LICH_SU__RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NGUYEN_LIEU_DON_VI') and o.name = 'FK_NGUYEN_L_RELATIONS_DON_VI')
alter table NGUYEN_LIEU_DON_VI
   drop constraint FK_NGUYEN_L_RELATIONS_DON_VI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NGUYEN_LIEU_DON_VI') and o.name = 'FK_NGUYEN_L_RELATIONS_NGUYEN_L')
alter table NGUYEN_LIEU_DON_VI
   drop constraint FK_NGUYEN_L_RELATIONS_NGUYEN_L
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN') and o.name = 'FK_NHAN_VIE_RELATIONS_HUYEN')
alter table NHAN_VIEN
   drop constraint FK_NHAN_VIE_RELATIONS_HUYEN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN') and o.name = 'FK_NHAN_VIE_RELATIONS_THANH_PH')
alter table NHAN_VIEN
   drop constraint FK_NHAN_VIE_RELATIONS_THANH_PH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_BANG_CAP') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE3')
alter table NHAN_VIEN_BANG_CAP
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE3
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_BANG_CAP') and o.name = 'FK_NHAN_VIE_RELATIONS_BANG_CAP')
alter table NHAN_VIEN_BANG_CAP
   drop constraint FK_NHAN_VIE_RELATIONS_BANG_CAP
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUC_VU') and o.name = 'FK_NHAN_VIE_RELATIONS_CHUC_VU')
alter table NHAN_VIEN_CHUC_VU
   drop constraint FK_NHAN_VIE_RELATIONS_CHUC_VU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUC_VU') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE8')
alter table NHAN_VIEN_CHUC_VU
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE8
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUNG_CHI') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE6')
alter table NHAN_VIEN_CHUNG_CHI
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE6
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUNG_CHI') and o.name = 'FK_NHAN_VIE_RELATIONS_CHUNG_CH')
alter table NHAN_VIEN_CHUNG_CHI
   drop constraint FK_NHAN_VIE_RELATIONS_CHUNG_CH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUYEN_MON') and o.name = 'FK_NHAN_VIE_RELATIONS_BANG_CAP2')
alter table NHAN_VIEN_CHUYEN_MON
   drop constraint FK_NHAN_VIE_RELATIONS_BANG_CAP2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_CHUYEN_MON') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE2')
alter table NHAN_VIEN_CHUYEN_MON
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DAU_VIEC') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE7')
alter table NHAN_VIEN_DAU_VIEC
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE7
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DAU_VIEC') and o.name = 'FK_NHAN_VIE_RELATIONS_DU_AN_DA')
alter table NHAN_VIEN_DAU_VIEC
   drop constraint FK_NHAN_VIE_RELATIONS_DU_AN_DA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_DU_AN')
alter table NHAN_VIEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_DU_AN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE4')
alter table NHAN_VIEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE4
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_DUYET_NH')
alter table NHAN_VIEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_DUYET_NH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE5')
alter table NHAN_VIEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE5
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_PHONG_BAN') and o.name = 'FK_NHAN_VIE_R_NV_PN_NHAN_VIE')
alter table NHAN_VIEN_PHONG_BAN
   drop constraint FK_NHAN_VIE_R_NV_PN_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_PHONG_BAN') and o.name = 'FK_NHAN_VIE_R_TP_NHAN_VIE')
alter table NHAN_VIEN_PHONG_BAN
   drop constraint FK_NHAN_VIE_R_TP_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_PHONG_BAN') and o.name = 'FK_NHAN_VIE_RELATIONS_PHONG_BA')
alter table NHAN_VIEN_PHONG_BAN
   drop constraint FK_NHAN_VIE_RELATIONS_PHONG_BA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_QUYEN_DAU_VIEC') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE')
alter table NHAN_VIEN_QUYEN_DAU_VIEC
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_QUYEN_DAU_VIEC') and o.name = 'FK_NHAN_VIE_RELATIONS_QUYEN_DA')
alter table NHAN_VIEN_QUYEN_DAU_VIEC
   drop constraint FK_NHAN_VIE_RELATIONS_QUYEN_DA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_QUYEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_NHAN_VIE9')
alter table NHAN_VIEN_QUYEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE9
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHAN_VIEN_QUYEN_DU_AN') and o.name = 'FK_NHAN_VIE_RELATIONS_QUYEN_DU')
alter table NHAN_VIEN_QUYEN_DU_AN
   drop constraint FK_NHAN_VIE_RELATIONS_QUYEN_DU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_CONG_CU') and o.name = 'FK_NHA_CUNG_RELATIONS_NHA_CUNG2')
alter table NHA_CUNG_CAP_CONG_CU
   drop constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_CONG_CU') and o.name = 'FK_NHA_CUNG_RELATIONS_CONG_CU')
alter table NHA_CUNG_CAP_CONG_CU
   drop constraint FK_NHA_CUNG_RELATIONS_CONG_CU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_NGUYEN_LIEU') and o.name = 'FK_NHA_CUNG_RELATIONS_NHA_CUNG3')
alter table NHA_CUNG_CAP_NGUYEN_LIEU
   drop constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG3
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_NGUYEN_LIEU') and o.name = 'FK_NHA_CUNG_RELATIONS_NGUYEN_L')
alter table NHA_CUNG_CAP_NGUYEN_LIEU
   drop constraint FK_NHA_CUNG_RELATIONS_NGUYEN_L
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_VAT_TU') and o.name = 'FK_NHA_CUNG_RELATIONS_NHA_CUNG')
alter table NHA_CUNG_CAP_VAT_TU
   drop constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NHA_CUNG_CAP_VAT_TU') and o.name = 'FK_NHA_CUNG_RELATIONS_VAT_TU')
alter table NHA_CUNG_CAP_VAT_TU
   drop constraint FK_NHA_CUNG_RELATIONS_VAT_TU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('QUYEN_CHUC_VU') and o.name = 'FK_QUYEN_CH_RELATIONS_QUYEN')
alter table QUYEN_CHUC_VU
   drop constraint FK_QUYEN_CH_RELATIONS_QUYEN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('QUYEN_CHUC_VU') and o.name = 'FK_QUYEN_CH_RELATIONS_NHAN_VIE')
alter table QUYEN_CHUC_VU
   drop constraint FK_QUYEN_CH_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SU_KIEN_DU_AN') and o.name = 'FK_SU_KIEN__REL_NV_DU_NHAN_VIE')
alter table SU_KIEN_DU_AN
   drop constraint FK_SU_KIEN__REL_NV_DU_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SU_KIEN_DU_AN') and o.name = 'FK_SU_KIEN__REL_NV_TA_NHAN_VIE')
alter table SU_KIEN_DU_AN
   drop constraint FK_SU_KIEN__REL_NV_TA_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TAI_KHOAN_NHAN_VIEN') and o.name = 'FK_TAI_KHOA_RELATIONS_TAI_KHOA')
alter table TAI_KHOAN_NHAN_VIEN
   drop constraint FK_TAI_KHOA_RELATIONS_TAI_KHOA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TAI_KHOAN_NHAN_VIEN') and o.name = 'FK_TAI_KHOA_RELATIONS_NHAN_VIE')
alter table TAI_KHOAN_NHAN_VIEN
   drop constraint FK_TAI_KHOA_RELATIONS_NHAN_VIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THANH_PHO') and o.name = 'FK_THANH_PH_RELATIONS_TINH')
alter table THANH_PHO
   drop constraint FK_THANH_PH_RELATIONS_TINH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUC_HIEN_DX_DA') and o.name = 'FK_THUC_HIE_RELATIONS_DE_XUAT_')
alter table THUC_HIEN_DX_DA
   drop constraint FK_THUC_HIE_RELATIONS_DE_XUAT_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUC_HIEN_DX_DA') and o.name = 'FK_THUC_HIE_RELATIONS_PHONG_BA')
alter table THUC_HIEN_DX_DA
   drop constraint FK_THUC_HIE_RELATIONS_PHONG_BA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_CONG_CU_2')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_CONG_CU_2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_CONG_CU_')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_CONG_CU_
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_VAT_TU_D2')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_VAT_TU_D2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_VAT_TU_D')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_VAT_TU_D
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_NGUYEN_L2')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_NGUYEN_L2
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TI_LE_QUY_DOI') and o.name = 'FK_TI_LE_QU_RELATIONS_NGUYEN_L')
alter table TI_LE_QUY_DOI
   drop constraint FK_TI_LE_QU_RELATIONS_NGUYEN_L
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('VAT_TU_DON_VI') and o.name = 'FK_VAT_TU_D_RELATIONS_DON_VI')
alter table VAT_TU_DON_VI
   drop constraint FK_VAT_TU_D_RELATIONS_DON_VI
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('VAT_TU_DON_VI') and o.name = 'FK_VAT_TU_D_RELATIONS_VAT_TU')
alter table VAT_TU_DON_VI
   drop constraint FK_VAT_TU_D_RELATIONS_VAT_TU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BANG_CAP')
            and   type = 'U')
   drop table BANG_CAP
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHUC_VU')
            and   type = 'U')
   drop table CHUC_VU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHUNG_CHI')
            and   type = 'U')
   drop table CHUNG_CHI
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONG_CU')
            and   type = 'U')
   drop table CONG_CU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CONG_CU_DON_VI')
            and   name  = 'RELATIONSHIP_36_FK'
            and   indid > 0
            and   indid < 255)
   drop index CONG_CU_DON_VI.RELATIONSHIP_36_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CONG_CU_DON_VI')
            and   name  = 'RELATIONSHIP_35_FK'
            and   indid > 0
            and   indid < 255)
   drop index CONG_CU_DON_VI.RELATIONSHIP_35_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONG_CU_DON_VI')
            and   type = 'U')
   drop table CONG_CU_DON_VI
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONG_VIEC')
            and   type = 'U')
   drop table CONG_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_DAU_VIEC')
            and   name  = 'RELATIONSHIP_69_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_DAU_VIEC.RELATIONSHIP_69_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_DAU_VIEC')
            and   name  = 'RELATIONSHIP_68_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_DAU_VIEC.RELATIONSHIP_68_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_DAU_VIEC')
            and   name  = 'RELATIONSHIP_67_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_DAU_VIEC.RELATIONSHIP_67_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DANH_GIA_DAU_VIEC')
            and   type = 'U')
   drop table DANH_GIA_DAU_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_NV_DA')
            and   name  = 'RELATIONSHIP_23_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_NV_DA.RELATIONSHIP_23_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_NV_DA')
            and   name  = 'RELATIONSHIP_22_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_NV_DA.RELATIONSHIP_22_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANH_GIA_NV_DA')
            and   name  = 'RELATIONSHIP_21_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANH_GIA_NV_DA.RELATIONSHIP_21_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DANH_GIA_NV_DA')
            and   type = 'U')
   drop table DANH_GIA_NV_DA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DAU_VIEC')
            and   type = 'U')
   drop table DAU_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DAU_VIEC_CONG_VIEC')
            and   name  = 'RELATIONSHIP_66_FK'
            and   indid > 0
            and   indid < 255)
   drop index DAU_VIEC_CONG_VIEC.RELATIONSHIP_66_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DAU_VIEC_CONG_VIEC')
            and   name  = 'RELATIONSHIP_65_FK'
            and   indid > 0
            and   indid < 255)
   drop index DAU_VIEC_CONG_VIEC.RELATIONSHIP_65_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DAU_VIEC_CONG_VIEC')
            and   type = 'U')
   drop table DAU_VIEC_CONG_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_CONG_CU')
            and   name  = 'RELATIONSHIP_29_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_CONG_CU.RELATIONSHIP_29_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_CONG_CU')
            and   name  = 'RELATIONSHIP_28_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_CONG_CU.RELATIONSHIP_28_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DE_XUAT_CONG_CU')
            and   type = 'U')
   drop table DE_XUAT_CONG_CU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_DU_AN')
            and   name  = 'RELATIONSHIP_20_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_DU_AN.RELATIONSHIP_20_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_DU_AN')
            and   name  = 'RELATIONSHIP_19_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_DU_AN.RELATIONSHIP_19_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DE_XUAT_DU_AN')
            and   type = 'U')
   drop table DE_XUAT_DU_AN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_NGUYEN_LIEU')
            and   name  = 'RELATIONSHIP_34_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_NGUYEN_LIEU.RELATIONSHIP_34_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_NGUYEN_LIEU')
            and   name  = 'RELATIONSHIP_33_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_NGUYEN_LIEU.RELATIONSHIP_33_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DE_XUAT_NGUYEN_LIEU')
            and   type = 'U')
   drop table DE_XUAT_NGUYEN_LIEU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_VAT_TU')
            and   name  = 'RELATIONSHIP_32_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_VAT_TU.RELATIONSHIP_32_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DE_XUAT_VAT_TU')
            and   name  = 'RELATIONSHIP_31_FK'
            and   indid > 0
            and   indid < 255)
   drop index DE_XUAT_VAT_TU.RELATIONSHIP_31_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DE_XUAT_VAT_TU')
            and   type = 'U')
   drop table DE_XUAT_VAT_TU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DON_VI')
            and   type = 'U')
   drop table DON_VI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DUYET_NHAN_VIEN')
            and   name  = 'RELATIONSHIP_16_FK'
            and   indid > 0
            and   indid < 255)
   drop index DUYET_NHAN_VIEN.RELATIONSHIP_16_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DUYET_NHAN_VIEN')
            and   name  = 'RELATIONSHIP_DE_XUAT_FK'
            and   indid > 0
            and   indid < 255)
   drop index DUYET_NHAN_VIEN.RELATIONSHIP_DE_XUAT_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DUYET_NHAN_VIEN')
            and   name  = 'RELATIONSHIP_DUYET_FK'
            and   indid > 0
            and   indid < 255)
   drop index DUYET_NHAN_VIEN.RELATIONSHIP_DUYET_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DUYET_NHAN_VIEN')
            and   type = 'U')
   drop table DUYET_NHAN_VIEN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DU_AN')
            and   type = 'U')
   drop table DU_AN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DU_AN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_62_FK'
            and   indid > 0
            and   indid < 255)
   drop index DU_AN_DAU_VIEC.RELATIONSHIP_62_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DU_AN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_61_FK'
            and   indid > 0
            and   indid < 255)
   drop index DU_AN_DAU_VIEC.RELATIONSHIP_61_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DU_AN_DAU_VIEC')
            and   type = 'U')
   drop table DU_AN_DAU_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DU_AN_PHONG_BAN')
            and   name  = 'RELATIONSHIP_81_FK'
            and   indid > 0
            and   indid < 255)
   drop index DU_AN_PHONG_BAN.RELATIONSHIP_81_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DU_AN_PHONG_BAN')
            and   name  = 'RELATIONSHIP_80_FK'
            and   indid > 0
            and   indid < 255)
   drop index DU_AN_PHONG_BAN.RELATIONSHIP_80_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DU_AN_PHONG_BAN')
            and   type = 'U')
   drop table DU_AN_PHONG_BAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('HUYEN')
            and   name  = 'RELATIONSHIP_47_FK'
            and   indid > 0
            and   indid < 255)
   drop index HUYEN.RELATIONSHIP_47_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('HUYEN')
            and   type = 'U')
   drop table HUYEN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('KHACH_HANG')
            and   type = 'U')
   drop table KHACH_HANG
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('KHACH_HANG_DU_AN')
            and   name  = 'RELATIONSHIP_2_FK'
            and   indid > 0
            and   indid < 255)
   drop index KHACH_HANG_DU_AN.RELATIONSHIP_2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('KHACH_HANG_DU_AN')
            and   name  = 'RELATIONSHIP_1_FK'
            and   indid > 0
            and   indid < 255)
   drop index KHACH_HANG_DU_AN.RELATIONSHIP_1_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('KHACH_HANG_DU_AN')
            and   type = 'U')
   drop table KHACH_HANG_DU_AN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('LICH_SU_CONG_VIEC')
            and   name  = 'RELATIONSHIP_79_FK'
            and   indid > 0
            and   indid < 255)
   drop index LICH_SU_CONG_VIEC.RELATIONSHIP_79_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('LICH_SU_CONG_VIEC')
            and   type = 'U')
   drop table LICH_SU_CONG_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('LICH_SU_DAU_VIEC')
            and   name  = 'RELATIONSHIP_78_FK'
            and   indid > 0
            and   indid < 255)
   drop index LICH_SU_DAU_VIEC.RELATIONSHIP_78_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('LICH_SU_DAU_VIEC')
            and   type = 'U')
   drop table LICH_SU_DAU_VIEC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MUC_DO_DANH_GIA_DAU_VIEC')
            and   type = 'U')
   drop table MUC_DO_DANH_GIA_DAU_VIEC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MUC_DO_DANH_GIA_NV_DA')
            and   type = 'U')
   drop table MUC_DO_DANH_GIA_NV_DA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NGUYEN_LIEU')
            and   type = 'U')
   drop table NGUYEN_LIEU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NGUYEN_LIEU_DON_VI')
            and   name  = 'RELATIONSHIP_40_FK'
            and   indid > 0
            and   indid < 255)
   drop index NGUYEN_LIEU_DON_VI.RELATIONSHIP_40_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NGUYEN_LIEU_DON_VI')
            and   name  = 'RELATIONSHIP_39_FK'
            and   indid > 0
            and   indid < 255)
   drop index NGUYEN_LIEU_DON_VI.RELATIONSHIP_39_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NGUYEN_LIEU_DON_VI')
            and   type = 'U')
   drop table NGUYEN_LIEU_DON_VI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN')
            and   name  = 'RELATIONSHIP_50_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN.RELATIONSHIP_50_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN')
            and   name  = 'RELATIONSHIP_49_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN.RELATIONSHIP_49_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN')
            and   type = 'U')
   drop table NHAN_VIEN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_BANG_CAP')
            and   name  = 'RELATIONSHIP_7_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_BANG_CAP.RELATIONSHIP_7_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_BANG_CAP')
            and   name  = 'RELATIONSHIP_6_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_BANG_CAP.RELATIONSHIP_6_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_BANG_CAP')
            and   type = 'U')
   drop table NHAN_VIEN_BANG_CAP
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUC_VU')
            and   name  = 'RELATIONSHIP_71_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUC_VU.RELATIONSHIP_71_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUC_VU')
            and   name  = 'RELATIONSHIP_70_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUC_VU.RELATIONSHIP_70_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_CHUC_VU')
            and   type = 'U')
   drop table NHAN_VIEN_CHUC_VU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUNG_CHI')
            and   name  = 'RELATIONSHIP_25_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUNG_CHI.RELATIONSHIP_25_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUNG_CHI')
            and   name  = 'RELATIONSHIP_24_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUNG_CHI.RELATIONSHIP_24_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_CHUNG_CHI')
            and   type = 'U')
   drop table NHAN_VIEN_CHUNG_CHI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUYEN_MON')
            and   name  = 'RELATIONSHIP_9_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUYEN_MON.RELATIONSHIP_9_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_CHUYEN_MON')
            and   name  = 'RELATIONSHIP_8_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_CHUYEN_MON.RELATIONSHIP_8_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_CHUYEN_MON')
            and   type = 'U')
   drop table NHAN_VIEN_CHUYEN_MON
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_64_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DAU_VIEC.RELATIONSHIP_64_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_63_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DAU_VIEC.RELATIONSHIP_63_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_DAU_VIEC')
            and   type = 'U')
   drop table NHAN_VIEN_DAU_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DU_AN')
            and   name  = 'RELATIONSHIP_15_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DU_AN.RELATIONSHIP_15_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DU_AN')
            and   name  = 'RELATIONSHIP_TRUONG_DA_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DU_AN.RELATIONSHIP_TRUONG_DA_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DU_AN')
            and   name  = 'RELATIONSHIP_11_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DU_AN.RELATIONSHIP_11_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_DU_AN')
            and   name  = 'RELATIONSHIP_10_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_DU_AN.RELATIONSHIP_10_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_DU_AN')
            and   type = 'U')
   drop table NHAN_VIEN_DU_AN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_PHONG_BAN')
            and   name  = 'RELATIONSHIP_TP_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_PHONG_BAN.RELATIONSHIP_TP_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_PHONG_BAN')
            and   name  = 'RELATIONSHIP_4_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_PHONG_BAN.RELATIONSHIP_4_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_PHONG_BAN')
            and   name  = 'RELATIONSHIP_3_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_PHONG_BAN.RELATIONSHIP_3_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_PHONG_BAN')
            and   type = 'U')
   drop table NHAN_VIEN_PHONG_BAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_QUYEN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_77_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_QUYEN_DAU_VIEC.RELATIONSHIP_77_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_QUYEN_DAU_VIEC')
            and   name  = 'RELATIONSHIP_76_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_QUYEN_DAU_VIEC.RELATIONSHIP_76_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_QUYEN_DAU_VIEC')
            and   type = 'U')
   drop table NHAN_VIEN_QUYEN_DAU_VIEC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_QUYEN_DU_AN')
            and   name  = 'RELATIONSHIP_75_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_QUYEN_DU_AN.RELATIONSHIP_75_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHAN_VIEN_QUYEN_DU_AN')
            and   name  = 'RELATIONSHIP_74_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHAN_VIEN_QUYEN_DU_AN.RELATIONSHIP_74_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHAN_VIEN_QUYEN_DU_AN')
            and   type = 'U')
   drop table NHAN_VIEN_QUYEN_DU_AN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHA_CUNG_CAP')
            and   type = 'U')
   drop table NHA_CUNG_CAP
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_CONG_CU')
            and   name  = 'RELATIONSHIP_58_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_CONG_CU.RELATIONSHIP_58_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_CONG_CU')
            and   name  = 'RELATIONSHIP_55_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_CONG_CU.RELATIONSHIP_55_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHA_CUNG_CAP_CONG_CU')
            and   type = 'U')
   drop table NHA_CUNG_CAP_CONG_CU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_NGUYEN_LIEU')
            and   name  = 'RELATIONSHIP_60_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_NGUYEN_LIEU.RELATIONSHIP_60_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_NGUYEN_LIEU')
            and   name  = 'RELATIONSHIP_57_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_NGUYEN_LIEU.RELATIONSHIP_57_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHA_CUNG_CAP_NGUYEN_LIEU')
            and   type = 'U')
   drop table NHA_CUNG_CAP_NGUYEN_LIEU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_VAT_TU')
            and   name  = 'RELATIONSHIP_59_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_VAT_TU.RELATIONSHIP_59_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NHA_CUNG_CAP_VAT_TU')
            and   name  = 'RELATIONSHIP_56_FK'
            and   indid > 0
            and   indid < 255)
   drop index NHA_CUNG_CAP_VAT_TU.RELATIONSHIP_56_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHA_CUNG_CAP_VAT_TU')
            and   type = 'U')
   drop table NHA_CUNG_CAP_VAT_TU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PHONG_BAN')
            and   type = 'U')
   drop table PHONG_BAN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('QUYEN')
            and   type = 'U')
   drop table QUYEN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('QUYEN_CHUC_VU')
            and   name  = 'RELATIONSHIP_73_FK'
            and   indid > 0
            and   indid < 255)
   drop index QUYEN_CHUC_VU.RELATIONSHIP_73_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('QUYEN_CHUC_VU')
            and   name  = 'RELATIONSHIP_72_FK'
            and   indid > 0
            and   indid < 255)
   drop index QUYEN_CHUC_VU.RELATIONSHIP_72_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('QUYEN_CHUC_VU')
            and   type = 'U')
   drop table QUYEN_CHUC_VU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('QUYEN_DAU_VIEC')
            and   type = 'U')
   drop table QUYEN_DAU_VIEC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('QUYEN_DU_AN')
            and   type = 'U')
   drop table QUYEN_DU_AN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SU_KIEN_DU_AN')
            and   name  = 'REL_NV_DUYET_FK'
            and   indid > 0
            and   indid < 255)
   drop index SU_KIEN_DU_AN.REL_NV_DUYET_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SU_KIEN_DU_AN')
            and   name  = 'REL_NV_TAO_FK'
            and   indid > 0
            and   indid < 255)
   drop index SU_KIEN_DU_AN.REL_NV_TAO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SU_KIEN_DU_AN')
            and   type = 'U')
   drop table SU_KIEN_DU_AN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TAI_KHOAN')
            and   type = 'U')
   drop table TAI_KHOAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TAI_KHOAN_NHAN_VIEN')
            and   name  = 'RELATIONSHIP_52_FK'
            and   indid > 0
            and   indid < 255)
   drop index TAI_KHOAN_NHAN_VIEN.RELATIONSHIP_52_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TAI_KHOAN_NHAN_VIEN')
            and   name  = 'RELATIONSHIP_51_FK'
            and   indid > 0
            and   indid < 255)
   drop index TAI_KHOAN_NHAN_VIEN.RELATIONSHIP_51_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TAI_KHOAN_NHAN_VIEN')
            and   type = 'U')
   drop table TAI_KHOAN_NHAN_VIEN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THANH_PHO')
            and   name  = 'RELATIONSHIP_48_FK'
            and   indid > 0
            and   indid < 255)
   drop index THANH_PHO.RELATIONSHIP_48_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THANH_PHO')
            and   type = 'U')
   drop table THANH_PHO
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUC_HIEN_DX_DA')
            and   name  = 'RELATIONSHIP_30_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUC_HIEN_DX_DA.RELATIONSHIP_30_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUC_HIEN_DX_DA')
            and   name  = 'RELATIONSHIP_26_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUC_HIEN_DX_DA.RELATIONSHIP_26_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THUC_HIEN_DX_DA')
            and   type = 'U')
   drop table THUC_HIEN_DX_DA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TINH')
            and   type = 'U')
   drop table TINH
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_46_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_46_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_45_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_45_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_44_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_44_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_43_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_43_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_42_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_42_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TI_LE_QUY_DOI')
            and   name  = 'RELATIONSHIP_41_FK'
            and   indid > 0
            and   indid < 255)
   drop index TI_LE_QUY_DOI.RELATIONSHIP_41_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TI_LE_QUY_DOI')
            and   type = 'U')
   drop table TI_LE_QUY_DOI
go

if exists (select 1
            from  sysobjects
           where  id = object_id('VAT_TU')
            and   type = 'U')
   drop table VAT_TU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('VAT_TU_DON_VI')
            and   name  = 'RELATIONSHIP_38_FK'
            and   indid > 0
            and   indid < 255)
   drop index VAT_TU_DON_VI.RELATIONSHIP_38_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('VAT_TU_DON_VI')
            and   name  = 'RELATIONSHIP_37_FK'
            and   indid > 0
            and   indid < 255)
   drop index VAT_TU_DON_VI.RELATIONSHIP_37_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('VAT_TU_DON_VI')
            and   type = 'U')
   drop table VAT_TU_DON_VI
go

/*==============================================================*/
/* Table: BANG_CAP                                              */
/*==============================================================*/
create table BANG_CAP (
   ID_BC                varchar(31)          not null,
   TEN_BC               varchar(127)         not null,
   GHI_CHU_BC           varchar(511)         null,
   constraint PK_BANG_CAP primary key nonclustered (ID_BC)
)
go

/*==============================================================*/
/* Table: CHUC_VU                                               */
/*==============================================================*/
create table CHUC_VU (
   ID_CHV               char(31)             not null,
   TEN_CHV              varchar(255)         not null,
   GHI_CHU_CHV          varchar(511)         null,
   constraint PK_CHUC_VU primary key nonclustered (ID_CHV)
)
go

/*==============================================================*/
/* Table: CHUNG_CHI                                             */
/*==============================================================*/
create table CHUNG_CHI (
   ID_CHCH              char(31)             not null,
   TEN_CHCH             varchar(255)         not null,
   GHI_CHU_CHCH         varchar(255)         null,
   constraint PK_CHUNG_CHI primary key nonclustered (ID_CHCH)
)
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('CHUNG_CHI')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_CHCH')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'CHUNG_CHI', 'column', 'ID_CHCH'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Chung chi',
   'user', @CurrentUser, 'table', 'CHUNG_CHI', 'column', 'ID_CHCH'
go

/*==============================================================*/
/* Table: CONG_CU                                               */
/*==============================================================*/
create table CONG_CU (
   ID_CC                char(31)             not null,
   TEN_CC               varchar(255)         not null,
   SL_CC                int                  not null,
   GHI_CHU_CC           varchar(511)         null,
   IS_ACTIVE_CC         binary(1)            not null,
   constraint PK_CONG_CU primary key nonclustered (ID_CC)
)
go

/*==============================================================*/
/* Table: CONG_CU_DON_VI                                        */
/*==============================================================*/
create table CONG_CU_DON_VI (
   ID_CCDV              char(31)             not null,
   ID_DV                char(31)             null,
   ID_CC                char(31)             null,
   IS_ACTIVE_CCDV       binary(1)            not null,
   constraint PK_CONG_CU_DON_VI primary key nonclustered (ID_CCDV)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('CONG_CU_DON_VI') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'CONG_CU_DON_VI' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'cong cu don vi', 
   'user', @CurrentUser, 'table', 'CONG_CU_DON_VI'
go

/*==============================================================*/
/* Index: RELATIONSHIP_35_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_35_FK on CONG_CU_DON_VI (
ID_CC ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_36_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_36_FK on CONG_CU_DON_VI (
ID_DV ASC
)
go

/*==============================================================*/
/* Table: CONG_VIEC                                             */
/*==============================================================*/
create table CONG_VIEC (
   ID_CV                char(31)             not null,
   TEN_CV               varchar(255)         not null,
   GHI_CHU_CV           varchar(511)         null,
   IS_ACTIVE_CV         binary(1)            not null,
   constraint PK_CONG_VIEC primary key nonclustered (ID_CV)
)
go

/*==============================================================*/
/* Table: DANH_GIA_DAU_VIEC                                     */
/*==============================================================*/
create table DANH_GIA_DAU_VIEC (
   ID_DGDV              char(31)             not null,
   ID_MDDGDV            char(31)             null,
   ID_NVDV              char(31)             null,
   ID_NVDA              varchar(31)          null,
   NGAY_DGDV            datetime             null,
   GHI_CHU_DGDV         varchar(511)         null,
   constraint PK_DANH_GIA_DAU_VIEC primary key nonclustered (ID_DGDV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_67_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_67_FK on DANH_GIA_DAU_VIEC (
ID_NVDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_68_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_68_FK on DANH_GIA_DAU_VIEC (
ID_MDDGDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_69_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_69_FK on DANH_GIA_DAU_VIEC (
ID_NVDA ASC
)
go

/*==============================================================*/
/* Table: DANH_GIA_NV_DA                                        */
/*==============================================================*/
create table DANH_GIA_NV_DA (
   ID_DGNV              varchar(31)          not null,
   ID_MDDGNVDA          char(31)             null,
   ID_NVDA              varchar(31)          null,
   ID_NVPB              varchar(31)          null,
   NGAY_DGNVDA          datetime             not null,
   GHI_CHU_DGNVDA       varchar(255)         null,
   constraint PK_DANH_GIA_NV_DA primary key nonclustered (ID_DGNV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_21_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_21_FK on DANH_GIA_NV_DA (
ID_NVPB ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_22_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_22_FK on DANH_GIA_NV_DA (
ID_NVDA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_23_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_23_FK on DANH_GIA_NV_DA (
ID_MDDGNVDA ASC
)
go

/*==============================================================*/
/* Table: DAU_VIEC                                              */
/*==============================================================*/
create table DAU_VIEC (
   ID_DVC               char(31)             not null,
   TEN_DVC              varchar(255)         not null,
   GHI_CHU_DVC          varchar(511)         null,
   constraint PK_DAU_VIEC primary key nonclustered (ID_DVC)
)
go

/*==============================================================*/
/* Table: DAU_VIEC_CONG_VIEC                                    */
/*==============================================================*/
create table DAU_VIEC_CONG_VIEC (
   ID_DVCV              char(31)             not null,
   ID_CV                char(31)             null,
   ID_NVDV              char(31)             null,
   NGAY_HT_DK_DVCV      datetime             null,
   NGAY_HT_DVCV         datetime             null,
   GHI_CHU_DVCV         varchar(511)         null,
   constraint PK_DAU_VIEC_CONG_VIEC primary key nonclustered (ID_DVCV)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('DAU_VIEC_CONG_VIEC') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'DAU_VIEC_CONG_VIEC' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'Nhan vien thuoc du an lam cong viec nao thuoc dau viec nao cua du an nao', 
   'user', @CurrentUser, 'table', 'DAU_VIEC_CONG_VIEC'
go

/*==============================================================*/
/* Index: RELATIONSHIP_65_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_65_FK on DAU_VIEC_CONG_VIEC (
ID_NVDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_66_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_66_FK on DAU_VIEC_CONG_VIEC (
ID_CV ASC
)
go

/*==============================================================*/
/* Table: DE_XUAT_CONG_CU                                       */
/*==============================================================*/
create table DE_XUAT_CONG_CU (
   ID_DXCC              char(31)             not null,
   ID_CC                char(31)             null,
   ID_THDXDA            char(31)             null,
   SL_DXCC              int                  not null,
   constraint PK_DE_XUAT_CONG_CU primary key nonclustered (ID_DXCC)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('DE_XUAT_CONG_CU') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'DE_XUAT_CONG_CU' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'de xuat cong cu', 
   'user', @CurrentUser, 'table', 'DE_XUAT_CONG_CU'
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('DE_XUAT_CONG_CU')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_THDXDA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'DE_XUAT_CONG_CU', 'column', 'ID_THDXDA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'De xuat nguon luc',
   'user', @CurrentUser, 'table', 'DE_XUAT_CONG_CU', 'column', 'ID_THDXDA'
go

/*==============================================================*/
/* Index: RELATIONSHIP_28_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_28_FK on DE_XUAT_CONG_CU (
ID_THDXDA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_29_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_29_FK on DE_XUAT_CONG_CU (
ID_CC ASC
)
go

/*==============================================================*/
/* Table: DE_XUAT_DU_AN                                         */
/*==============================================================*/
create table DE_XUAT_DU_AN (
   ID_DXDA              varchar(31)          not null,
   ID_NVDA              varchar(31)          null,
   ID_NV                varchar(31)          null,
   NGAY_TAO_DXDA        datetime             null,
   NGAY_DUYET_DXDA      datetime             null,
   NOI_DUNG_DXDA        varchar(511)         null,
   GHI_CHU_DXDA         varchar(511)         null,
   constraint PK_DE_XUAT_DU_AN primary key nonclustered (ID_DXDA)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('DE_XUAT_DU_AN') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'DE_XUAT_DU_AN' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'Truong du an gui de xuat den cap tren - la mot nhan vien', 
   'user', @CurrentUser, 'table', 'DE_XUAT_DU_AN'
go

/*==============================================================*/
/* Index: RELATIONSHIP_19_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_19_FK on DE_XUAT_DU_AN (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_20_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_20_FK on DE_XUAT_DU_AN (
ID_NVDA ASC
)
go

/*==============================================================*/
/* Table: DE_XUAT_NGUYEN_LIEU                                   */
/*==============================================================*/
create table DE_XUAT_NGUYEN_LIEU (
   ID_DXNL              char(31)             not null,
   ID_THDXDA            char(31)             null,
   ID_NL                char(31)             null,
   SL_DXNL              int                  not null,
   constraint PK_DE_XUAT_NGUYEN_LIEU primary key nonclustered (ID_DXNL)
)
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('DE_XUAT_NGUYEN_LIEU')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_THDXDA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'DE_XUAT_NGUYEN_LIEU', 'column', 'ID_THDXDA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'De xuat nguon luc',
   'user', @CurrentUser, 'table', 'DE_XUAT_NGUYEN_LIEU', 'column', 'ID_THDXDA'
go

/*==============================================================*/
/* Index: RELATIONSHIP_33_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_33_FK on DE_XUAT_NGUYEN_LIEU (
ID_THDXDA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_34_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_34_FK on DE_XUAT_NGUYEN_LIEU (
ID_NL ASC
)
go

/*==============================================================*/
/* Table: DE_XUAT_VAT_TU                                        */
/*==============================================================*/
create table DE_XUAT_VAT_TU (
   ID_DXVT              char(31)             not null,
   ID_THDXDA            char(31)             null,
   ID_VT                char(31)             null,
   SL_DXVT              int                  not null,
   constraint PK_DE_XUAT_VAT_TU primary key nonclustered (ID_DXVT)
)
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('DE_XUAT_VAT_TU')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_THDXDA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'DE_XUAT_VAT_TU', 'column', 'ID_THDXDA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'De xuat nguon luc',
   'user', @CurrentUser, 'table', 'DE_XUAT_VAT_TU', 'column', 'ID_THDXDA'
go

/*==============================================================*/
/* Index: RELATIONSHIP_31_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_31_FK on DE_XUAT_VAT_TU (
ID_VT ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_32_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_32_FK on DE_XUAT_VAT_TU (
ID_THDXDA ASC
)
go

/*==============================================================*/
/* Table: DON_VI                                                */
/*==============================================================*/
create table DON_VI (
   ID_DV                char(31)             not null,
   TEN_DV               varchar(255)         not null,
   GHI_CHU_DV           varchar(511)         null,
   IS_ACTIVE_DV         binary(1)            not null,
   constraint PK_DON_VI primary key nonclustered (ID_DV)
)
go

/*==============================================================*/
/* Table: DUYET_NHAN_VIEN                                       */
/*==============================================================*/
create table DUYET_NHAN_VIEN (
   ID_DNV               varchar(31)          not null,
   ID_NV                varchar(31)          null,
   NHA_ID_NV__          varchar(31)          null,
   ID_NVPB              varchar(31)          null,
   NGAY_DE_XUAT_DNV     datetime             null,
   NGAY_DUYET_DNV       datetime             null,
   constraint PK_DUYET_NHAN_VIEN primary key nonclustered (ID_DNV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_DUYET_FK                                 */
/*==============================================================*/
create index RELATIONSHIP_DUYET_FK on DUYET_NHAN_VIEN (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_DE_XUAT_FK                               */
/*==============================================================*/
create index RELATIONSHIP_DE_XUAT_FK on DUYET_NHAN_VIEN (
NHA_ID_NV__ ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_16_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_16_FK on DUYET_NHAN_VIEN (
ID_NVPB ASC
)
go

/*==============================================================*/
/* Table: DU_AN                                                 */
/*==============================================================*/
create table DU_AN (
   ID_DA                char(31)             not null,
   TEN_DA               varchar(255)         not null,
   NGAY_TAO_DA          datetime             not null,
   NGAY_BAT_DAU_DA      datetime             null,
   NGAY_KT_DU_KIEN_DA   datetime             null,
   NGAY_KET_THUC_DA     datetime             null,
   GHI_CHU_DA           varchar(511)         null,
   constraint PK_DU_AN primary key nonclustered (ID_DA)
)
go

/*==============================================================*/
/* Table: DU_AN_DAU_VIEC                                        */
/*==============================================================*/
create table DU_AN_DAU_VIEC (
   ID_DA_DV             char(31)             not null,
   ID_DA                char(31)             null,
   ID_DVC               char(31)             null,
   NGAY_TAO_DA_DV       datetime             not null,
   NGAY_HT_DADV         datetime             null,
   NGAY_HT_DK_DADV      datetime             null,
   GHI_CHU_DADV         varchar(511)         null,
   constraint PK_DU_AN_DAU_VIEC primary key nonclustered (ID_DA_DV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_61_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_61_FK on DU_AN_DAU_VIEC (
ID_DA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_62_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_62_FK on DU_AN_DAU_VIEC (
ID_DVC ASC
)
go

/*==============================================================*/
/* Table: DU_AN_PHONG_BAN                                       */
/*==============================================================*/
create table DU_AN_PHONG_BAN (
   ID_DA_PB             char(31)             not null,
   ID_DA                char(31)             null,
   ID_PB                varchar(31)          null,
   NGAY_THAM_GIA_DA_PB  datetime             not null,
   NGAY_KET_THUC_DA_PB  datetime             null,
   GHI_CHU_DA_PB        varchar(511)         null,
   constraint PK_DU_AN_PHONG_BAN primary key nonclustered (ID_DA_PB)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_80_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_80_FK on DU_AN_PHONG_BAN (
ID_DA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_81_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_81_FK on DU_AN_PHONG_BAN (
ID_PB ASC
)
go

/*==============================================================*/
/* Table: HUYEN                                                 */
/*==============================================================*/
create table HUYEN (
   ID_HUYEN             char(31)             not null,
   ID_TINH              char(31)             null,
   CODE_HUYEN           int                  not null,
   TEN_HUYEN            varchar(255)         not null,
   GHI_CHU_HUYEN        varchar(511)         null,
   constraint PK_HUYEN primary key nonclustered (ID_HUYEN)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_47_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_47_FK on HUYEN (
ID_TINH ASC
)
go

/*==============================================================*/
/* Table: KHACH_HANG                                            */
/*==============================================================*/
create table KHACH_HANG (
   ID_KH                char(31)             not null,
   TEN_KH               varchar(255)         null,
   DIA_CHI_KH           varchar(255)         null,
   DIEN_THOAI_KH        varchar(23)          null,
   FAX_KH               varchar(23)          null,
   EMAIL_KH             varchar(255)         null,
   GHI_CHU_KH           varchar(511)         null,
   constraint PK_KHACH_HANG primary key nonclustered (ID_KH)
)
go

/*==============================================================*/
/* Table: KHACH_HANG_DU_AN                                      */
/*==============================================================*/
create table KHACH_HANG_DU_AN (
   ID_KHDA              char(31)             not null,
   ID_DA                char(31)             null,
   ID_KH                char(31)             null,
   KINH_PHI_KHDA        money                not null,
   NGAY_TAO_KH_DA       datetime             not null,
   NGAY_BAN_GIAO        datetime             null,
   HUY_KHDA             binary(1)            not null,
   GHI_CHU_KHDA         varchar(511)         null,
   constraint PK_KHACH_HANG_DU_AN primary key nonclustered (ID_KHDA)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_1_FK on KHACH_HANG_DU_AN (
ID_KH ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_2_FK on KHACH_HANG_DU_AN (
ID_DA ASC
)
go

/*==============================================================*/
/* Table: LICH_SU_CONG_VIEC                                     */
/*==============================================================*/
create table LICH_SU_CONG_VIEC (
   ID_LSCV              char(31)             not null,
   ID_CV                char(31)             null,
   NGAY_TAO_LSCV        datetime             null,
   NOI_DUNG_LSCV        varchar(511)         null,
   GHI_CHU_LSCV         varchar(511)         null,
   constraint PK_LICH_SU_CONG_VIEC primary key nonclustered (ID_LSCV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_79_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_79_FK on LICH_SU_CONG_VIEC (
ID_CV ASC
)
go

/*==============================================================*/
/* Table: LICH_SU_DAU_VIEC                                      */
/*==============================================================*/
create table LICH_SU_DAU_VIEC (
   ID_LSDV              char(31)             not null,
   ID_NVDV              char(31)             null,
   NGAY_TAO_LSDV        datetime             null,
   NOI_DUNG_LSDV        varchar(511)         null,
   GHI_CHU_LSDV         varchar(511)         null,
   constraint PK_LICH_SU_DAU_VIEC primary key nonclustered (ID_LSDV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_78_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_78_FK on LICH_SU_DAU_VIEC (
ID_NVDV ASC
)
go

/*==============================================================*/
/* Table: MUC_DO_DANH_GIA_DAU_VIEC                              */
/*==============================================================*/
create table MUC_DO_DANH_GIA_DAU_VIEC (
   ID_MDDGDV            char(31)             not null,
   TEN_MDDGDV           varchar(255)         not null,
   GHI_CHU_MDDGDV       varchar(511)         null,
   constraint PK_MUC_DO_DANH_GIA_DAU_VIEC primary key nonclustered (ID_MDDGDV)
)
go

/*==============================================================*/
/* Table: MUC_DO_DANH_GIA_NV_DA                                 */
/*==============================================================*/
create table MUC_DO_DANH_GIA_NV_DA (
   ID_MDDGNVDA          char(31)             not null,
   TEN_MDGNVDA          varchar(255)         not null,
   constraint PK_MUC_DO_DANH_GIA_NV_DA primary key nonclustered (ID_MDDGNVDA)
)
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('MUC_DO_DANH_GIA_NV_DA')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'TEN_MDGNVDA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'MUC_DO_DANH_GIA_NV_DA', 'column', 'TEN_MDGNVDA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Ten muc danh gia nhan vien du an',
   'user', @CurrentUser, 'table', 'MUC_DO_DANH_GIA_NV_DA', 'column', 'TEN_MDGNVDA'
go

/*==============================================================*/
/* Table: NGUYEN_LIEU                                           */
/*==============================================================*/
create table NGUYEN_LIEU (
   ID_NL                char(31)             not null,
   TEN_NL               varchar(255)         not null,
   SL_NL                int                  not null,
   GHI_CHU_NL           varchar(511)         null,
   IS_ACTIVE_NL         binary(1)            not null,
   constraint PK_NGUYEN_LIEU primary key nonclustered (ID_NL)
)
go

/*==============================================================*/
/* Table: NGUYEN_LIEU_DON_VI                                    */
/*==============================================================*/
create table NGUYEN_LIEU_DON_VI (
   ID_NLDV              char(31)             not null,
   ID_NL                char(31)             null,
   ID_DV                char(31)             null,
   IS_ACTIVE_NLDV       binary(1)            not null,
   constraint PK_NGUYEN_LIEU_DON_VI primary key nonclustered (ID_NLDV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_39_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_39_FK on NGUYEN_LIEU_DON_VI (
ID_DV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_40_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_40_FK on NGUYEN_LIEU_DON_VI (
ID_NL ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN                                             */
/*==============================================================*/
create table NHAN_VIEN (
   ID_NV                varchar(31)          not null,
   ID_HUYEN             char(31)             null,
   ID_TP                char(31)             null,
   HO_TEN_NV            varchar(127)         null,
   DIA_CHI_NV           varchar(127)         null,
   DIEN_THOAI_NV        varchar(23)          null,
   GHI_CHU_NV           varchar(511)         null,
   GIOI_TINH_NV         varchar(5)           not null,
   EMAIL_NV             varchar(255)         null,
   IS_ACTIVE_NV         binary(1)            not null,
   constraint PK_NHAN_VIEN primary key nonclustered (ID_NV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_49_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_49_FK on NHAN_VIEN (
ID_HUYEN ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_50_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_50_FK on NHAN_VIEN (
ID_TP ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_BANG_CAP                                    */
/*==============================================================*/
create table NHAN_VIEN_BANG_CAP (
   ID_NVBC              varchar(31)          not null,
   ID_BC                varchar(31)          null,
   ID_NV                varchar(31)          null,
   NGAY_CAP_NVBC        datetime             null,
   GHI_CHU_NVBC         varchar(511)         null,
   constraint PK_NHAN_VIEN_BANG_CAP primary key nonclustered (ID_NVBC)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_6_FK on NHAN_VIEN_BANG_CAP (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_7_FK on NHAN_VIEN_BANG_CAP (
ID_BC ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_CHUC_VU                                     */
/*==============================================================*/
create table NHAN_VIEN_CHUC_VU (
   ID_NVCV              char(31)             not null,
   ID_NV                varchar(31)          null,
   ID_CHV               char(31)             null,
   NGAY_BD_NVCV         datetime             null,
   NGAY_KT_NVCV         datetime             null,
   GHI_CHU_NVCV         varchar(511)         null,
   constraint PK_NHAN_VIEN_CHUC_VU primary key nonclustered (ID_NVCV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_70_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_70_FK on NHAN_VIEN_CHUC_VU (
ID_CHV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_71_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_71_FK on NHAN_VIEN_CHUC_VU (
ID_NV ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_CHUNG_CHI                                   */
/*==============================================================*/
create table NHAN_VIEN_CHUNG_CHI (
   ID_NV_CC             char(31)             not null,
   ID_NV                varchar(31)          null,
   ID_CHCH              char(31)             null,
   NGAY_CAP_NVCC        datetime             null,
   NGAY_HET_HAN_NVCC    datetime             null,
   GHI_CHU_NVCC         varchar(511)         null,
   constraint PK_NHAN_VIEN_CHUNG_CHI primary key nonclustered (ID_NV_CC)
)
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('NHAN_VIEN_CHUNG_CHI')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_CHCH')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'NHAN_VIEN_CHUNG_CHI', 'column', 'ID_CHCH'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Chung chi',
   'user', @CurrentUser, 'table', 'NHAN_VIEN_CHUNG_CHI', 'column', 'ID_CHCH'
go

/*==============================================================*/
/* Index: RELATIONSHIP_24_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_24_FK on NHAN_VIEN_CHUNG_CHI (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_25_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_25_FK on NHAN_VIEN_CHUNG_CHI (
ID_CHCH ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_CHUYEN_MON                                  */
/*==============================================================*/
create table NHAN_VIEN_CHUYEN_MON (
   ID_NVCM              varchar(31)          not null,
   ID_NVPB              varchar(31)          null,
   ID_BC                varchar(31)          null,
   NGAY_BAT_DAU_NVCM    datetime             null,
   NGAY_KET_THUC_NVCM   datetime             null,
   GHI_CHU_NVCM         varchar(511)         null,
   constraint PK_NHAN_VIEN_CHUYEN_MON primary key nonclustered (ID_NVCM)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_8_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_8_FK on NHAN_VIEN_CHUYEN_MON (
ID_BC ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_9_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_9_FK on NHAN_VIEN_CHUYEN_MON (
ID_NVPB ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_DAU_VIEC                                    */
/*==============================================================*/
create table NHAN_VIEN_DAU_VIEC (
   ID_NVDV              char(31)             not null,
   ID_NVDA              varchar(31)          null,
   ID_DA_DV             char(31)             null,
   GHI_CHU_NVDV         varchar(511)         null,
   constraint PK_NHAN_VIEN_DAU_VIEC primary key nonclustered (ID_NVDV)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('NHAN_VIEN_DAU_VIEC') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'NHAN_VIEN_DAU_VIEC' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'nhan vien du an dau viec', 
   'user', @CurrentUser, 'table', 'NHAN_VIEN_DAU_VIEC'
go

/*==============================================================*/
/* Index: RELATIONSHIP_63_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_63_FK on NHAN_VIEN_DAU_VIEC (
ID_NVDA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_64_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_64_FK on NHAN_VIEN_DAU_VIEC (
ID_DA_DV ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_DU_AN                                       */
/*==============================================================*/
create table NHAN_VIEN_DU_AN (
   ID_NVDA              varchar(31)          not null,
   NHA_ID_NVDA__        varchar(31)          null,
   ID_DA                char(31)             null,
   ID_DNV               varchar(31)          null,
   ID_NV                varchar(31)          null,
   NGAY_BAT_DAU_NVDA    datetime             null,
   NGAY_KET_THUC_NVDA   datetime             null,
   GHI_CHU_NVDA         varchar(511)         null,
   constraint PK_NHAN_VIEN_DU_AN primary key nonclustered (ID_NVDA)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_10_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_10_FK on NHAN_VIEN_DU_AN (
ID_DA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_11_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_11_FK on NHAN_VIEN_DU_AN (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_TRUONG_DA_FK                             */
/*==============================================================*/
create index RELATIONSHIP_TRUONG_DA_FK on NHAN_VIEN_DU_AN (
NHA_ID_NVDA__ ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_15_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_15_FK on NHAN_VIEN_DU_AN (
ID_DNV ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_PHONG_BAN                                   */
/*==============================================================*/
create table NHAN_VIEN_PHONG_BAN (
   ID_NVPB              varchar(31)          not null,
   ID_NV                varchar(31)          null,
   NHA_ID_NVPB__        varchar(31)          null,
   ID_PB                varchar(31)          null,
   NGAY_BD_NVPB         datetime             null,
   NGAY_KT_NVPB         datetime             null,
   GHI_CHU_NVPB         varchar(511)         null,
   constraint PK_NHAN_VIEN_PHONG_BAN primary key nonclustered (ID_NVPB)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_3_FK on NHAN_VIEN_PHONG_BAN (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_4_FK on NHAN_VIEN_PHONG_BAN (
ID_PB ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_TP_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_TP_FK on NHAN_VIEN_PHONG_BAN (
NHA_ID_NVPB__ ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_QUYEN_DAU_VIEC                              */
/*==============================================================*/
create table NHAN_VIEN_QUYEN_DAU_VIEC (
   ID_NVQDV             char(31)             not null,
   ID_NVDV              char(31)             null,
   ID_QDV               char(31)             null,
   GHI_CHU_NVQDV        varchar(511)         null,
   constraint PK_NHAN_VIEN_QUYEN_DAU_VIEC primary key nonclustered (ID_NVQDV)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('NHAN_VIEN_QUYEN_DAU_VIEC') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'NHAN_VIEN_QUYEN_DAU_VIEC' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'Nhan vien co cac quyen thuoc dau viec', 
   'user', @CurrentUser, 'table', 'NHAN_VIEN_QUYEN_DAU_VIEC'
go

/*==============================================================*/
/* Index: RELATIONSHIP_76_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_76_FK on NHAN_VIEN_QUYEN_DAU_VIEC (
ID_NVDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_77_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_77_FK on NHAN_VIEN_QUYEN_DAU_VIEC (
ID_QDV ASC
)
go

/*==============================================================*/
/* Table: NHAN_VIEN_QUYEN_DU_AN                                 */
/*==============================================================*/
create table NHAN_VIEN_QUYEN_DU_AN (
   ID_NVQDA             char(31)             not null,
   ID_QDA               char(31)             null,
   ID_NV                varchar(31)          null,
   GHI_CHU_NVQDA        varchar(511)         null,
   constraint PK_NHAN_VIEN_QUYEN_DU_AN primary key nonclustered (ID_NVQDA)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('NHAN_VIEN_QUYEN_DU_AN') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'NHAN_VIEN_QUYEN_DU_AN' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'Doi voi  cac nhan vien co chuc la quan ly truong phong ban', 
   'user', @CurrentUser, 'table', 'NHAN_VIEN_QUYEN_DU_AN'
go

/*==============================================================*/
/* Index: RELATIONSHIP_74_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_74_FK on NHAN_VIEN_QUYEN_DU_AN (
ID_NV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_75_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_75_FK on NHAN_VIEN_QUYEN_DU_AN (
ID_QDA ASC
)
go

/*==============================================================*/
/* Table: NHA_CUNG_CAP                                          */
/*==============================================================*/
create table NHA_CUNG_CAP (
   ID_NCC               char(31)             not null,
   TEN_NCC              varchar(255)         not null,
   DIEN_THOAI_NCC       varchar(15)          null,
   DIA_CHI_NCC          varchar(255)         null,
   GHI_CHU_NCC          varchar(511)         null,
   EMAIL_NCC            varchar(255)         null,
   constraint PK_NHA_CUNG_CAP primary key nonclustered (ID_NCC)
)
go

/*==============================================================*/
/* Table: NHA_CUNG_CAP_CONG_CU                                  */
/*==============================================================*/
create table NHA_CUNG_CAP_CONG_CU (
   ID_NCCCC             char(31)             not null,
   ID_NCC               char(31)             null,
   ID_CC                char(31)             null,
   GHI_CHU_NCCCC        varchar(511)         null,
   constraint PK_NHA_CUNG_CAP_CONG_CU primary key nonclustered (ID_NCCCC)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_55_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_55_FK on NHA_CUNG_CAP_CONG_CU (
ID_NCC ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_58_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_58_FK on NHA_CUNG_CAP_CONG_CU (
ID_CC ASC
)
go

/*==============================================================*/
/* Table: NHA_CUNG_CAP_NGUYEN_LIEU                              */
/*==============================================================*/
create table NHA_CUNG_CAP_NGUYEN_LIEU (
   ID_NCCNL             char(31)             not null,
   ID_NCC               char(31)             null,
   ID_NL                char(31)             null,
   GHI_CHU_NCCNL        varchar(511)         null,
   constraint PK_NHA_CUNG_CAP_NGUYEN_LIEU primary key nonclustered (ID_NCCNL)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_57_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_57_FK on NHA_CUNG_CAP_NGUYEN_LIEU (
ID_NCC ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_60_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_60_FK on NHA_CUNG_CAP_NGUYEN_LIEU (
ID_NL ASC
)
go

/*==============================================================*/
/* Table: NHA_CUNG_CAP_VAT_TU                                   */
/*==============================================================*/
create table NHA_CUNG_CAP_VAT_TU (
   ID_NCCVT             char(31)             not null,
   ID_NCC               char(31)             null,
   ID_VT                char(31)             null,
   GHI_CHU_NCCVT        varchar(511)         null,
   constraint PK_NHA_CUNG_CAP_VAT_TU primary key nonclustered (ID_NCCVT)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_56_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_56_FK on NHA_CUNG_CAP_VAT_TU (
ID_NCC ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_59_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_59_FK on NHA_CUNG_CAP_VAT_TU (
ID_VT ASC
)
go

/*==============================================================*/
/* Table: PHONG_BAN                                             */
/*==============================================================*/
create table PHONG_BAN (
   ID_PB                varchar(31)          not null,
   TEN_PB               varchar(127)         null,
   DIEN_THOAI_PB        varchar(23)          null,
   GHI_CHU_PB           varchar(255)         null,
   constraint PK_PHONG_BAN primary key nonclustered (ID_PB)
)
go

/*==============================================================*/
/* Table: QUYEN                                                 */
/*==============================================================*/
create table QUYEN (
   ID_QUYEN             char(31)             not null,
   TEN_QUYEN            varchar(255)         not null,
   GHI_CHU_QUYEN        varchar(511)         null,
   constraint PK_QUYEN primary key nonclustered (ID_QUYEN)
)
go

/*==============================================================*/
/* Table: QUYEN_CHUC_VU                                         */
/*==============================================================*/
create table QUYEN_CHUC_VU (
   ID_QCHV              char(31)             not null,
   ID_NVCV              char(31)             null,
   ID_QUYEN             char(31)             null,
   GHI_CHU_QCHV         varchar(511)         null,
   constraint PK_QUYEN_CHUC_VU primary key nonclustered (ID_QCHV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_72_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_72_FK on QUYEN_CHUC_VU (
ID_QUYEN ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_73_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_73_FK on QUYEN_CHUC_VU (
ID_NVCV ASC
)
go

/*==============================================================*/
/* Table: QUYEN_DAU_VIEC                                        */
/*==============================================================*/
create table QUYEN_DAU_VIEC (
   ID_QDV               char(31)             not null,
   TEN_QDV              varchar(255)         not null,
   GHI_CHU_QDV          varchar(511)         null,
   constraint PK_QUYEN_DAU_VIEC primary key nonclustered (ID_QDV)
)
go

/*==============================================================*/
/* Table: QUYEN_DU_AN                                           */
/*==============================================================*/
create table QUYEN_DU_AN (
   ID_QDA               char(31)             not null,
   TEN_QDA              varchar(255)         not null,
   GHI_CHU_QDA          varchar(511)         null,
   constraint PK_QUYEN_DU_AN primary key nonclustered (ID_QDA)
)
go

/*==============================================================*/
/* Table: SU_KIEN_DU_AN                                         */
/*==============================================================*/
create table SU_KIEN_DU_AN (
   ID_SKDA              char(31)             not null,
   ID_NVDA              varchar(31)          null,
   NHA_ID_NVDA__        varchar(31)          null,
   NGAY_TAO_SKDA        datetime             not null,
   NGAY_DUYET_SKDA      datetime             null,
   NOI_DUNG_SKDA        varchar(511)         null,
   GHI_CHU_SKDA         varchar(511)         null,
   constraint PK_SU_KIEN_DU_AN primary key nonclustered (ID_SKDA)
)
go

/*==============================================================*/
/* Index: REL_NV_TAO_FK                                         */
/*==============================================================*/
create index REL_NV_TAO_FK on SU_KIEN_DU_AN (
NHA_ID_NVDA__ ASC
)
go

/*==============================================================*/
/* Index: REL_NV_DUYET_FK                                       */
/*==============================================================*/
create index REL_NV_DUYET_FK on SU_KIEN_DU_AN (
ID_NVDA ASC
)
go

/*==============================================================*/
/* Table: TAI_KHOAN                                             */
/*==============================================================*/
create table TAI_KHOAN (
   USERNAME             varchar(255)         not null,
   MAT_KHAU             char(255)            not null,
   IS_ACTIVE_TK         binary(1)            null,
   constraint PK_TAI_KHOAN primary key nonclustered (USERNAME)
)
go

/*==============================================================*/
/* Table: TAI_KHOAN_NHAN_VIEN                                   */
/*==============================================================*/
create table TAI_KHOAN_NHAN_VIEN (
   ID_TKNV              char(31)             not null,
   ID_NV                varchar(31)          null,
   USERNAME             varchar(255)         null,
   NGAY_TAO_TKNV        datetime             not null,
   constraint PK_TAI_KHOAN_NHAN_VIEN primary key nonclustered (ID_TKNV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_51_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_51_FK on TAI_KHOAN_NHAN_VIEN (
USERNAME ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_52_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_52_FK on TAI_KHOAN_NHAN_VIEN (
ID_NV ASC
)
go

/*==============================================================*/
/* Table: THANH_PHO                                             */
/*==============================================================*/
create table THANH_PHO (
   ID_TP                char(31)             not null,
   ID_TINH              char(31)             null,
   CODE_TP              int                  not null,
   TEN_TP               varchar(255)         not null,
   GHI_CHU_TP           varchar(511)         null,
   constraint PK_THANH_PHO primary key nonclustered (ID_TP)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_48_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_48_FK on THANH_PHO (
ID_TINH ASC
)
go

/*==============================================================*/
/* Table: THUC_HIEN_DX_DA                                       */
/*==============================================================*/
create table THUC_HIEN_DX_DA (
   ID_THDXDA            char(31)             not null,
   ID_DXDA              varchar(31)          null,
   ID_PB                varchar(31)          null,
   NGAY_THDXDA          datetime             not null,
   KINH_PHI             money                null,
   constraint PK_THUC_HIEN_DX_DA primary key nonclustered (ID_THDXDA)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('THUC_HIEN_DX_DA') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'THUC_HIEN_DX_DA' 
 
end 


select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'thuc hien de xuat du an
   ', 
   'user', @CurrentUser, 'table', 'THUC_HIEN_DX_DA'
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('THUC_HIEN_DX_DA')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'ID_THDXDA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'THUC_HIEN_DX_DA', 'column', 'ID_THDXDA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'De xuat nguon luc',
   'user', @CurrentUser, 'table', 'THUC_HIEN_DX_DA', 'column', 'ID_THDXDA'
go

/*==============================================================*/
/* Index: RELATIONSHIP_26_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_26_FK on THUC_HIEN_DX_DA (
ID_DXDA ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_30_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_30_FK on THUC_HIEN_DX_DA (
ID_PB ASC
)
go

/*==============================================================*/
/* Table: TINH                                                  */
/*==============================================================*/
create table TINH (
   ID_TINH              char(31)             not null,
   CODE_TINH            int                  not null,
   TEN_TINH             varchar(255)         not null,
   GHI_CHU_TINH         varchar(511)         null,
   constraint PK_TINH primary key nonclustered (ID_TINH)
)
go

/*==============================================================*/
/* Table: TI_LE_QUY_DOI                                         */
/*==============================================================*/
create table TI_LE_QUY_DOI (
   ID_TLQD              char(31)             not null,
   ID_VTDV              char(31)             null,
   ID_NLDV              char(31)             null,
   VAT_ID_VTDV__        char(31)             null,
   ID_CCDV              char(31)             null,
   CON_ID_CCDV__        char(31)             null,
   NGU_ID_NLDV__        char(31)             null,
   TI_LE                decimal(10,3)        not null,
   GHI_CHU_TLQD         varchar(511)         null,
   constraint PK_TI_LE_QUY_DOI primary key nonclustered (ID_TLQD)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_41_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_41_FK on TI_LE_QUY_DOI (
ID_CCDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_42_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_42_FK on TI_LE_QUY_DOI (
CON_ID_CCDV__ ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_43_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_43_FK on TI_LE_QUY_DOI (
ID_VTDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_44_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_44_FK on TI_LE_QUY_DOI (
VAT_ID_VTDV__ ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_45_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_45_FK on TI_LE_QUY_DOI (
ID_NLDV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_46_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_46_FK on TI_LE_QUY_DOI (
NGU_ID_NLDV__ ASC
)
go

/*==============================================================*/
/* Table: VAT_TU                                                */
/*==============================================================*/
create table VAT_TU (
   ID_VT                char(31)             not null,
   TEN_VT               varchar(255)         not null,
   SL_VL                int                  not null,
   GHI_CHU_VT           varchar(511)         null,
   IS_ACTIVE_VT         binary(1)            not null,
   constraint PK_VAT_TU primary key nonclustered (ID_VT)
)
go

/*==============================================================*/
/* Table: VAT_TU_DON_VI                                         */
/*==============================================================*/
create table VAT_TU_DON_VI (
   ID_VTDV              char(31)             not null,
   ID_DV                char(31)             null,
   ID_VT                char(31)             null,
   IS_ACTIVE_VTDV       binary(1)            not null,
   constraint PK_VAT_TU_DON_VI primary key nonclustered (ID_VTDV)
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_37_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_37_FK on VAT_TU_DON_VI (
ID_DV ASC
)
go

/*==============================================================*/
/* Index: RELATIONSHIP_38_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_38_FK on VAT_TU_DON_VI (
ID_VT ASC
)
go

alter table CONG_CU_DON_VI
   add constraint FK_CONG_CU__RELATIONS_CONG_CU foreign key (ID_CC)
      references CONG_CU (ID_CC)
go

alter table CONG_CU_DON_VI
   add constraint FK_CONG_CU__RELATIONS_DON_VI foreign key (ID_DV)
      references DON_VI (ID_DV)
go

alter table DANH_GIA_DAU_VIEC
   add constraint FK_DANH_GIA_RELATIONS_NHAN_VIE4 foreign key (ID_NVDV)
      references NHAN_VIEN_DAU_VIEC (ID_NVDV)
go

alter table DANH_GIA_DAU_VIEC
   add constraint FK_DANH_GIA_RELATIONS_MUC_DO_D foreign key (ID_MDDGDV)
      references MUC_DO_DANH_GIA_DAU_VIEC (ID_MDDGDV)
go

alter table DANH_GIA_DAU_VIEC
   add constraint FK_DANH_GIA_RELATIONS_NHAN_VIE foreign key (ID_NVDA)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table DANH_GIA_NV_DA
   add constraint FK_DANH_GIA_RELATIONS_NHAN_VIE2 foreign key (ID_NVPB)
      references NHAN_VIEN_PHONG_BAN (ID_NVPB)
go

alter table DANH_GIA_NV_DA
   add constraint FK_DANH_GIA_RELATIONS_NHAN_VIE3 foreign key (ID_NVDA)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table DANH_GIA_NV_DA
   add constraint FK_DANH_GIA_RELATIONS_MUC_DO_D2 foreign key (ID_MDDGNVDA)
      references MUC_DO_DANH_GIA_NV_DA (ID_MDDGNVDA)
go

alter table DAU_VIEC_CONG_VIEC
   add constraint FK_DAU_VIEC_RELATIONS_NHAN_VIE foreign key (ID_NVDV)
      references NHAN_VIEN_DAU_VIEC (ID_NVDV)
go

alter table DAU_VIEC_CONG_VIEC
   add constraint FK_DAU_VIEC_RELATIONS_CONG_VIE foreign key (ID_CV)
      references CONG_VIEC (ID_CV)
go

alter table DE_XUAT_CONG_CU
   add constraint FK_DE_XUAT__RELATIONS_THUC_HIE3 foreign key (ID_THDXDA)
      references THUC_HIEN_DX_DA (ID_THDXDA)
go

alter table DE_XUAT_CONG_CU
   add constraint FK_DE_XUAT__RELATIONS_CONG_CU foreign key (ID_CC)
      references CONG_CU (ID_CC)
go

alter table DE_XUAT_DU_AN
   add constraint FK_DE_XUAT__RELATIONS_NHAN_VIE2 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table DE_XUAT_DU_AN
   add constraint FK_DE_XUAT__RELATIONS_NHAN_VIE foreign key (ID_NVDA)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table DE_XUAT_NGUYEN_LIEU
   add constraint FK_DE_XUAT__RELATIONS_THUC_HIE foreign key (ID_THDXDA)
      references THUC_HIEN_DX_DA (ID_THDXDA)
go

alter table DE_XUAT_NGUYEN_LIEU
   add constraint FK_DE_XUAT__RELATIONS_NGUYEN_L foreign key (ID_NL)
      references NGUYEN_LIEU (ID_NL)
go

alter table DE_XUAT_VAT_TU
   add constraint FK_DE_XUAT__RELATIONS_VAT_TU foreign key (ID_VT)
      references VAT_TU (ID_VT)
go

alter table DE_XUAT_VAT_TU
   add constraint FK_DE_XUAT__RELATIONS_THUC_HIE2 foreign key (ID_THDXDA)
      references THUC_HIEN_DX_DA (ID_THDXDA)
go

alter table DUYET_NHAN_VIEN
   add constraint FK_DUYET_NH_RELATIONS_NHAN_VIE foreign key (ID_NVPB)
      references NHAN_VIEN_PHONG_BAN (ID_NVPB)
go

alter table DUYET_NHAN_VIEN
   add constraint FK_DUYET_NH_RELATIONS_NHAN_VIE3 foreign key (NHA_ID_NV__)
      references NHAN_VIEN (ID_NV)
go

alter table DUYET_NHAN_VIEN
   add constraint FK_DUYET_NH_RELATIONS_NHAN_VIE2 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table DU_AN_DAU_VIEC
   add constraint FK_DU_AN_DA_RELATIONS_DU_AN foreign key (ID_DA)
      references DU_AN (ID_DA)
go

alter table DU_AN_DAU_VIEC
   add constraint FK_DU_AN_DA_RELATIONS_DAU_VIEC foreign key (ID_DVC)
      references DAU_VIEC (ID_DVC)
go

alter table DU_AN_PHONG_BAN
   add constraint FK_DU_AN_PH_RELATIONS_DU_AN foreign key (ID_DA)
      references DU_AN (ID_DA)
go

alter table DU_AN_PHONG_BAN
   add constraint FK_DU_AN_PH_RELATIONS_PHONG_BA foreign key (ID_PB)
      references PHONG_BAN (ID_PB)
go

alter table HUYEN
   add constraint FK_HUYEN_RELATIONS_TINH foreign key (ID_TINH)
      references TINH (ID_TINH)
go

alter table KHACH_HANG_DU_AN
   add constraint FK_KHACH_HA_RELATIONS_KHACH_HA foreign key (ID_KH)
      references KHACH_HANG (ID_KH)
go

alter table KHACH_HANG_DU_AN
   add constraint FK_KHACH_HA_RELATIONS_DU_AN foreign key (ID_DA)
      references DU_AN (ID_DA)
go

alter table LICH_SU_CONG_VIEC
   add constraint FK_LICH_SU__RELATIONS_CONG_VIE foreign key (ID_CV)
      references CONG_VIEC (ID_CV)
go

alter table LICH_SU_DAU_VIEC
   add constraint FK_LICH_SU__RELATIONS_NHAN_VIE foreign key (ID_NVDV)
      references NHAN_VIEN_DAU_VIEC (ID_NVDV)
go

alter table NGUYEN_LIEU_DON_VI
   add constraint FK_NGUYEN_L_RELATIONS_DON_VI foreign key (ID_DV)
      references DON_VI (ID_DV)
go

alter table NGUYEN_LIEU_DON_VI
   add constraint FK_NGUYEN_L_RELATIONS_NGUYEN_L foreign key (ID_NL)
      references NGUYEN_LIEU (ID_NL)
go

alter table NHAN_VIEN
   add constraint FK_NHAN_VIE_RELATIONS_HUYEN foreign key (ID_HUYEN)
      references HUYEN (ID_HUYEN)
go

alter table NHAN_VIEN
   add constraint FK_NHAN_VIE_RELATIONS_THANH_PH foreign key (ID_TP)
      references THANH_PHO (ID_TP)
go

alter table NHAN_VIEN_BANG_CAP
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE3 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_BANG_CAP
   add constraint FK_NHAN_VIE_RELATIONS_BANG_CAP foreign key (ID_BC)
      references BANG_CAP (ID_BC)
go

alter table NHAN_VIEN_CHUC_VU
   add constraint FK_NHAN_VIE_RELATIONS_CHUC_VU foreign key (ID_CHV)
      references CHUC_VU (ID_CHV)
go

alter table NHAN_VIEN_CHUC_VU
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE8 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_CHUNG_CHI
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE6 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_CHUNG_CHI
   add constraint FK_NHAN_VIE_RELATIONS_CHUNG_CH foreign key (ID_CHCH)
      references CHUNG_CHI (ID_CHCH)
go

alter table NHAN_VIEN_CHUYEN_MON
   add constraint FK_NHAN_VIE_RELATIONS_BANG_CAP2 foreign key (ID_BC)
      references BANG_CAP (ID_BC)
go

alter table NHAN_VIEN_CHUYEN_MON
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE2 foreign key (ID_NVPB)
      references NHAN_VIEN_PHONG_BAN (ID_NVPB)
go

alter table NHAN_VIEN_DAU_VIEC
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE7 foreign key (ID_NVDA)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table NHAN_VIEN_DAU_VIEC
   add constraint FK_NHAN_VIE_RELATIONS_DU_AN_DA foreign key (ID_DA_DV)
      references DU_AN_DAU_VIEC (ID_DA_DV)
go

alter table NHAN_VIEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_DU_AN foreign key (ID_DA)
      references DU_AN (ID_DA)
go

alter table NHAN_VIEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE4 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_DUYET_NH foreign key (ID_DNV)
      references DUYET_NHAN_VIEN (ID_DNV)
go

alter table NHAN_VIEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE5 foreign key (NHA_ID_NVDA__)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table NHAN_VIEN_PHONG_BAN
   add constraint FK_NHAN_VIE_R_NV_PN_NHAN_VIE foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_PHONG_BAN
   add constraint FK_NHAN_VIE_R_TP_NHAN_VIE foreign key (NHA_ID_NVPB__)
      references NHAN_VIEN_PHONG_BAN (ID_NVPB)
go

alter table NHAN_VIEN_PHONG_BAN
   add constraint FK_NHAN_VIE_RELATIONS_PHONG_BA foreign key (ID_PB)
      references PHONG_BAN (ID_PB)
go

alter table NHAN_VIEN_QUYEN_DAU_VIEC
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE foreign key (ID_NVDV)
      references NHAN_VIEN_DAU_VIEC (ID_NVDV)
go

alter table NHAN_VIEN_QUYEN_DAU_VIEC
   add constraint FK_NHAN_VIE_RELATIONS_QUYEN_DA foreign key (ID_QDV)
      references QUYEN_DAU_VIEC (ID_QDV)
go

alter table NHAN_VIEN_QUYEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_NHAN_VIE9 foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table NHAN_VIEN_QUYEN_DU_AN
   add constraint FK_NHAN_VIE_RELATIONS_QUYEN_DU foreign key (ID_QDA)
      references QUYEN_DU_AN (ID_QDA)
go

alter table NHA_CUNG_CAP_CONG_CU
   add constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG2 foreign key (ID_NCC)
      references NHA_CUNG_CAP (ID_NCC)
go

alter table NHA_CUNG_CAP_CONG_CU
   add constraint FK_NHA_CUNG_RELATIONS_CONG_CU foreign key (ID_CC)
      references CONG_CU (ID_CC)
go

alter table NHA_CUNG_CAP_NGUYEN_LIEU
   add constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG3 foreign key (ID_NCC)
      references NHA_CUNG_CAP (ID_NCC)
go

alter table NHA_CUNG_CAP_NGUYEN_LIEU
   add constraint FK_NHA_CUNG_RELATIONS_NGUYEN_L foreign key (ID_NL)
      references NGUYEN_LIEU (ID_NL)
go

alter table NHA_CUNG_CAP_VAT_TU
   add constraint FK_NHA_CUNG_RELATIONS_NHA_CUNG foreign key (ID_NCC)
      references NHA_CUNG_CAP (ID_NCC)
go

alter table NHA_CUNG_CAP_VAT_TU
   add constraint FK_NHA_CUNG_RELATIONS_VAT_TU foreign key (ID_VT)
      references VAT_TU (ID_VT)
go

alter table QUYEN_CHUC_VU
   add constraint FK_QUYEN_CH_RELATIONS_QUYEN foreign key (ID_QUYEN)
      references QUYEN (ID_QUYEN)
go

alter table QUYEN_CHUC_VU
   add constraint FK_QUYEN_CH_RELATIONS_NHAN_VIE foreign key (ID_NVCV)
      references NHAN_VIEN_CHUC_VU (ID_NVCV)
go

alter table SU_KIEN_DU_AN
   add constraint FK_SU_KIEN__REL_NV_DU_NHAN_VIE foreign key (ID_NVDA)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table SU_KIEN_DU_AN
   add constraint FK_SU_KIEN__REL_NV_TA_NHAN_VIE foreign key (NHA_ID_NVDA__)
      references NHAN_VIEN_DU_AN (ID_NVDA)
go

alter table TAI_KHOAN_NHAN_VIEN
   add constraint FK_TAI_KHOA_RELATIONS_TAI_KHOA foreign key (USERNAME)
      references TAI_KHOAN (USERNAME)
go

alter table TAI_KHOAN_NHAN_VIEN
   add constraint FK_TAI_KHOA_RELATIONS_NHAN_VIE foreign key (ID_NV)
      references NHAN_VIEN (ID_NV)
go

alter table THANH_PHO
   add constraint FK_THANH_PH_RELATIONS_TINH foreign key (ID_TINH)
      references TINH (ID_TINH)
go

alter table THUC_HIEN_DX_DA
   add constraint FK_THUC_HIE_RELATIONS_DE_XUAT_ foreign key (ID_DXDA)
      references DE_XUAT_DU_AN (ID_DXDA)
go

alter table THUC_HIEN_DX_DA
   add constraint FK_THUC_HIE_RELATIONS_PHONG_BA foreign key (ID_PB)
      references PHONG_BAN (ID_PB)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_CONG_CU_2 foreign key (ID_CCDV)
      references CONG_CU_DON_VI (ID_CCDV)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_CONG_CU_ foreign key (CON_ID_CCDV__)
      references CONG_CU_DON_VI (ID_CCDV)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_VAT_TU_D2 foreign key (ID_VTDV)
      references VAT_TU_DON_VI (ID_VTDV)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_VAT_TU_D foreign key (VAT_ID_VTDV__)
      references VAT_TU_DON_VI (ID_VTDV)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_NGUYEN_L2 foreign key (ID_NLDV)
      references NGUYEN_LIEU_DON_VI (ID_NLDV)
go

alter table TI_LE_QUY_DOI
   add constraint FK_TI_LE_QU_RELATIONS_NGUYEN_L foreign key (NGU_ID_NLDV__)
      references NGUYEN_LIEU_DON_VI (ID_NLDV)
go

alter table VAT_TU_DON_VI
   add constraint FK_VAT_TU_D_RELATIONS_DON_VI foreign key (ID_DV)
      references DON_VI (ID_DV)
go

alter table VAT_TU_DON_VI
   add constraint FK_VAT_TU_D_RELATIONS_VAT_TU foreign key (ID_VT)
      references VAT_TU (ID_VT)
go

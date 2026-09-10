# BÁO CÁO SỨC KHỎE CÁ NHÂN HÓA TAM BẢO (10 TRANG CHUẨN Y TẾ)
> **Hệ Thống Đánh Giá & Phác Đồ Phục Hồi Y Học Tích Hợp (Đông – Tây Y)**
> *File Mẫu Chuẩn Hóa – Bác Sĩ Chỉ Cần Kiểm Duyệt & Gia Giảm Thông Số*

---

## 📘 TRANG 1: HỒ SƠ CÁ NHÂN HÓA & THÔNG TIN CHẨN ĐOÁN

```text
========================================================================================
                          HỒ SƠ ĐÁNH GIÁ SỨC KHỎE TAM BẢO
========================================================================================
MÃ HỒ SƠ     : {{MA_HO_SO}} (Ví dụ: TB-8492)
NGÀY LẬP     : {{NGAY_LAP_HO_SO}} (Ví dụ: 10/09/2026)
BÁC SĨ DUYỆT : BS. {{TEN_BAC_SI}} (Ví dụ: BS. Trần Thăng Long)
----------------------------------------------------------------------------------------
HỌ VÀ TÊN    : {{HO_TEN_KH}} (Ví dụ: Nguyễn Văn A)
NĂM SINH     : {{NAM_SINH}} ({{TUOI}} Tuổi)      GIỚI TÍNH: {{GIOI_TINH}}
NGHỀ NGHIỆP  : {{NGHE_NGHIEP}} (Ví dụ: Nhân viên Văn Phòng)
SỐ ĐIỆN THOẠI: {{SO_DIEN_THOAI}} (Zalo)
========================================================================================
```

### 1.1 Tóm Tắt Lý Do Đánh Giá Clinical
- **Triệu chứng chính ghi nhận:** {{TRIEU_CHUNG_CHINH}} *(Mệt mỏi mãn tính, đau cổ vai gáy, mất ngủ đầu giấc, đầy bụng sau ăn...)*
- **Tiền sử cá nhân & gia đình:** {{TIEN_SU}} *(Lối sống ngồi nhiều, áp lực công việc cao, tiền sử gia đình có tiểu đường/đột quỵ...)*
- **Mục tiêu ưu tiên 30 ngày:** {{MUC_TIEU_KH}} *(Cải thiện giấc ngủ, giảm đau mỏi cột sống, phục hồi năng lượng làm việc)*

---

## 📊 TRANG 2: TỔNG QUAN CHỈ SỐ SINH HỌC TAM BẢO (TINH – KHÍ – THẦN)

### 2.1 Bảng Điểm Chỉ Số Sinh Học
| Trục Sinh Học | Nội Dung Đánh Giá | Điểm Số Raw | Tỷ Lệ Nguy Cơ (%) | Trạng Thái Lâm Sàng |
| :--- | :--- | :---: | :---: | :--- |
| **TINH (Cơ thể & Chuyển hóa)** | Cơ xương khớp, Fascia, Viêm mãn tính | `{{DIEM_TINH}}/12` | `{{PCT_TINH}}%` | `{{STT_TINH}}` *(Tốt / Chú ý / Nguy cơ)* |
| **KHÍ (Năng lượng & Thần kinh)** | Thần kinh thực vật, Hô hấp, Ty thể | `{{DIEM_KHI}}/12` | `{{PCT_KHI}}%` | `{{STT_KHI}}` *(Tốt / Chú ý / Nguy cơ)* |
| **THẦN (Tâm trí & Giấc ngủ)** | Trục HPA, Giấc ngủ DMN, Căng thẳng | `{{DIEM_THAN}}/12` | `{{PCT_THAN}}%` | `{{STT_THAN}}` *(Tốt / Chú ý / Nguy cơ)* |

### 2.2 Kết Luận Phân Tầng Nguy Cơ Tổng Thể
- **TỔNG ĐIỂM NGUY CƠ:** `{{TONG_DIEM}}/36` (`{{PCT_TONG}}%`)
- **PHÂN TẦNG VÙNG NGUY CƠ:** `[{{VUNG_NGUY_CO}}]` *(Xanh: An toàn / Vàng: Chú ý / Cam: Cảnh báo / Đỏ: Nguy cơ cao)*
- **KẾT LUẬN TÓM TẮT CỦA BÁC SĨ:**
  > `[SỰ THẬT ĐÃ ĐƯỢC CHỨNG MINH]`: Thể trạng hiện tại thể hiện sự mất cân bằng rõ rệt giữa tải trọng tâm thần thần kinh và khả năng phục hồi của hệ chuyển hóa.
  > `[GIẢ THUYẾT KẾT NỐI]`: Sự kết hợp giữa giảm thông khí phế nang (Khí trệ) và co thắt dải cơ Fascia vùng cổ gáy (Tinh trệ) đang cản trở máu nuôi não, gây ức chế trục HPA dẫn đến mất ngủ (Thần suy).

---

## 🧬 TRANG 3: ĐÁNH GIÁ CHI TIẾT TRỤC TINH (CƠ THỂ - CHUYỂN HÓA - FASCIA)

### 3.1 Đánh Giá Giải Phẫu & Sinh Lý
- **Hệ thống Fascia & Cột sống:** {{DANH_GIA_FASCIA}} *(Có dấu hiệu bó cơ dải chậu chày, căng cứng cân cơ vùng gáy C3-C7, hạn chế tầm vận động xoay cổ).*
- **Chuyển hóa & Kháng Insulin:** {{DANH_GIA_INSULIN}} *(Nguy cơ kháng Insulin thể ẩn: Béo bụng, tích mỡ nội tạng, buồn ngủ sau bữa ăn chứa nhiều Carbohydrate).*
- **Mức độ viêm mãn tính mức độ thấp (Low-grade Inflammation):** {{DANH_GIA_VIEM}} *(Ứ đọng sản phẩm chuyển hóa acid lactic và cytokin gây viêm tại màng gân cơ).*

### 3.2 Đối Chiếu Đông – Tây Y Trục TINH
- **Tây Y:** Thoái hóa đốt sống cổ/thắt lưng, rối loạn chuyển hóa đường huyết sớm, căng co cơ mãn tính (Myofascial Pain Syndrome).
- **Đông Y:** Tinh huyết suy thiếu, Tỳ hư bất vận (Tỳ không vận hóa được thủy thấp gây trệ trệ), Cân mạch thất dưỡng.

---

## ⚡ TRANG 4: ĐÁNH GIÁ CHI TIẾT TRỤC KHÍ & THẦN (THẦN KINH & TÂM TRÍ)

### 4.1 Thần Kinh Thực Vật & Năng Lượng Ty Thể (Trục KHÍ)
- **Cân bằng Giao cảm / Phó giao cảm (ANS):** {{DANH_GIA_ANS}} *(Cường giao cảm kéo dài, giảm trương lực dây thần kinh phế vị - Vagus Nerve, nhịp thở nông).*
- **Chức năng Ty thể & Năng lượng:** {{DANH_GIA_TY_THE}} *(Thiếu hụt ATP mức độ nhẹ, cơ thể hay mệt mỏi vào khung giờ 13h-15h).*

### 4.2 Giấc Ngủ & Hệ Mạng Lưới Chế Độ Mặc Định DMN (Trục THẦN)
- **Cấu trúc giấc ngủ:** {{DANH_GIA_GIAC_NGU}} *(Khó đi vào giấc ngủ (>30 phút), hay tỉnh giấc khung giờ 1h-3h sáng (giờ Kinh Can hoạt động)).*
- **Hoạt động DMN (Default Mode Network) & Stress:** {{DANH_GIA_STRESS}} *(DMN hoạt động quá mức gây suy nghĩ miên man, quá tải Cortisol chiều tối).*

---

## 🗺️ TRANG 5: BẢN ĐỒ PHÂN TẦNG NGUY CƠ BỆNH LÝ MÃN TÍNH (RISK MATRIX)

| Cụm Bệnh Lý Tiềm Ẩn | Mức Độ Nguy Cơ | Cơ Chế Phát Sinh (Tây Y ↔ Đông Y) | Hướng Phòng Ngừa Ưu Tiên |
| :--- | :---: | :--- | :--- |
| **1. Kháng Insulin & Hội Chứng Chuyển Hóa** | `{{RISK_INSULIN}}` | Kháng Insulin tế bào ↔ Tỳ hư sinh thấp nhiệt | Tiết chế đường đơn, nhịn ăn gián đoạn 16/8 |
| **2. Thiếu Máu Não & Nguy Cơ Vi Mạch** | `{{RISK_NAO}}` | Căng cơ cổ nén mạch máu ↔ Can khí uất kết, Khí trệ | Tập xả cơ cổ gáy, giải phóng Fascia |
| **3. Thoái Hóa Cột Sống & Đau Mãn Tính** | `{{RISK_COT_SONG}}` | Sai tư thế kéo dài ↔ Thận tinh suy, Cân can suy | Tập Khí công/ZenBelt điều chỉnh trục |
| **4. Giảm Miễn Dịch & Tế Bào NK (Onco-Risk)** | `{{RISK_MIEN_DICH}}` | Stress mãn tính tăng Cortisol ↔ Chính khí hư tổn | Thiền chánh niệm 20p/ngày, ngủ trước 23h |

---

## 🏆 TRANG 6: TOP 5 ƯU TIÊN CẢI THIỆN KHẨN CẤP (ACTIONABLE PRIORITIES)

```text
----------------------------------------------------------------------------------------
ƯU TIÊN 1: {{PRIORITY_1_TITLE}} (Ví dụ: Giải phóng chèn ép Fascia vùng Cổ Gáy)
- Cơ chế   : Co thắt cơ thang và cơ nâng vai làm giảm lưu lượng máu động mạch đốt sống lên não.
- Giải pháp: Thực hiện bài tập kéo giãn Cân cơ cổ 8 phút mỗi sáng + Massage điểm Trigger Point.

ƯU TIÊN 2: {{PRIORITY_2_TITLE}} (Ví dụ: Phục hồi nồng độ Melatonin tự nhiên & Giảm Cortisol đêm)
- Cơ chế   : Ánh sáng xanh và suy nghĩ miên man làm ức chế tuyến tùng tiết Melatonin.
- Giải pháp: Tắt toàn bộ thiết bị điện tử sau 22h, uống trà thảo mộc Lạc tiên - Tâm sen.

ƯU TIÊN 3: {{PRIORITY_3_TITLE}} (Ví dụ: Ổn định đường huyết sau ăn & Nhịp sinh học Tỳ Vị)
- Cơ chế   : Ăn sai thứ tự làm tăng vọt Spikes Glucose gây mệt mỏi và tích tụ mỡ nội tạng.
- Giải pháp: Ăn theo thứ tự Rau xanh → Đạm/Chất béo → Tinh bột chậm.

ƯU TIÊN 4: {{PRIORITY_4_TITLE}} (Ví dụ: Kích hoạt Dây Thần Kinh Phế Vị - Vagus Nerve)
- Cơ chế   : Nhịp thở nông khiến hệ Giao cảm luôn ở trạng thái "Chống trả hoặc Bỏ chạy" (Fight or Flight).
- Giải pháp: Áp dụng phương pháp thở bụng 4-7-8 trước khi đi ngủ 10 phút.

ƯU TIÊN 5: {{PRIORITY_5_TITLE}} (Ví dụ: Bổ sung Thủy cho Thận Tinh & Giải độc Can Đởm)
- Cơ chế   : Thiếu nước tế bào và thói quen thức khuya làm suy giảm khả năng lọc giải độc đêm.
- Giải pháp: Uống đủ 2 lit nước ấm chia nhỏ trong ngày, không uống nhiều sau 20h.
----------------------------------------------------------------------------------------
```

---

## 📅 TRANG 7: KẾ HOẠCH PHỤC HỒI 30 NGÀY (LỊCH SINH HỌC 24 GIỜ)

### 7.1 Thời Khóa Biểu Sinh Học 24 Giờ (Theo Đồng Hồ Sinh Học Đông - Tây Y)
- **06:00 – 06:30 (Giờ Mão - Kinh Đại Trường):** Uống 300ml nước ấm, đi vệ sinh, tập bài Khí công Dịch Cân Kinh 15 phút.
- **07:00 – 07:30 (Giờ Thìn - Kinh Vị):** Ăn sáng giàu Protein & Chất béo tốt (Trứng, bơ, hạt), hạn chế đường.
- **12:00 – 12:30 (Giờ Ngọ - Kinh Tâm):** Ăn trưa nhẹ nhàng, nghỉ trưa nhắm mắt chánh niệm 15-20 phút.
- **17:30 – 18:30 (Giờ Dậu - Kinh Thận):** Tập đi bộ thả lỏng hoặc bài tập xả Fascia thắt lưng.
- **21:30 – 22:00 (Giờ Hợi - Kinh Tam Tiêu):** Ngâm chân nước ấm thảo dược, ngắt kết nối Wifi/Điện thoại.
- **22:30:** Đi ngủ để cơ thể vào trạng thái phục hồi trước 23h (Giờ Tý - Kinh Đởm).

---

## ⚡ TRANG 8: LỘ TRÌNH NÂNG CAO 60 NGÀY (TÁI CẤU TRÚC MÔ & THẦN KINH)

### 8.1 Chiến Lược Tái Cấu Trúc Mô Cân Cơ (Fascia Remodeling)
- Duy trì tập luyện chuyển động đa hướng 3 buổi/tuần để tái tạo tính đàn hồi của sợi Collagen trong Fascia.
- Bổ sung Vitamin C, Collagen Type II và Khoáng chất vi lượng (Magnesium, Zinc) hỗ trợ phục hồi khớp.

### 8.2 Tăng Tính Linh Hoạt Thần Kinh (Neuroplasticity)
- Thực hiện thiền định quét thân (Body Scan Meditation) 15 phút/ngày để giảm nhạy cảm đau trung ương.
- Thực hành rèn luyện sự chú ý chủ động (Active Recall / Mindfulness) trong công việc.

---

## 🛡️ TRANG 9: CHIẾN LƯỢC BỀN VỮNG 90 NGÀY & PHÒNG NGỪA TÁI PHÁT

### 9.1 Thiết Lập Lối Sống Kháng Viêm Tự Nhiên
- Áp dụng chế độ ăn Địa Trung Hải (Mediterranean Diet) mở rộng với các thảo dược Đông y (Nghệ, Gừng, Kỷ tử, Táo đỏ).
- Kiểm soát tải trọng tâm lý (Allostatic Load), duy trì chỉ số nhịp tim biến thiên (HRV) ở mức tối ưu.

### 9.2 Bộ Chỉ Số Sinh Học Mục Tiêu 90 Ngày
| Chỉ Số Theo Dõi | Mức Hiện Tại | Mục Tiêu 90 Ngày | Phương Pháp Đo Lường |
| :--- | :---: | :---: | :--- |
| **Điểm Đánh Giá Tam Bảo** | `{{TONG_DIEM}}/36` | `< 10/36` | Bài test Tam Bảo định kỳ tháng |
| **Thời gian đi vào giấc ngủ** | `> 30 phút` | `< 15 phút` | Nhật ký theo dõi giấc ngủ |
| **Mức độ đau cổ vai gáy** | `6/10` | `< 2/10` | Thang đo đau VAS |

---

## 🩺 TRANG 10: CHỈ DẪN CẬN LÂM SÀNG & LỜI DẶN CỦA BÁC SĨ

### 10.1 Danh Mục Xét Nghiệm Tây Y Đề Xuất (Kiểm Tra Định Kỳ)
1. **Xét nghiệm Chuyển hóa & Đường huyết:** HbA1c, Glucose lúc đói, Insulin lúc đói (đánh giá chỉ số HOMA-IR).
2. **Xét nghiệm Mỡ máu & Mức độ Viêm:** Lipid Panel đầy đủ (Cholesterol, Triglyceride, HDL, LDL), hs-CRP.
3. **Chẩn đoán hình ảnh:** X-quang/MRI Cột sống cổ & Thắt lưng (nếu triệu chứng đau lan xuống tay/chân).

### 10.2 Lời Dặn Trực Tiếp Từ Bác SĨ Kiểm Duyệt
> **Lời dặn:** *"Hồ sơ sức khỏe của {{HO_TEN_KH}} cho thấy cơ thể đang ở giai đoạn cảnh báo sớm của sự mất cân bằng. Bạn không nên quá lo lắng vì đây là thời điểm vàng để phục hồi tự nhiên mà chưa cần can thiệp thuốc điều trị liều cao. Hãy tuân thủ nghiêm ngặt Top 3 ưu tiên trong 30 ngày đầu tiên và liên hệ lại với Bác sĩ qua Zalo nếu có bất kỳ dấu hiệu bất thường nào."*

```text
----------------------------------------------------------------------------------------
                        BÁC SĨ KIỂM DUYỆT & KÝ TÊN
                        
                        (Đã duyệt và đóng dấu điện tử)
                        BS. {{TEN_BAC_SI}}
========================================================================================
```

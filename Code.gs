// ============================================================
// TAMBAO - GOOGLE APPS SCRIPT (CẤU TRÚC CHUẨN HOÁ & DÂN DÃ DỄ HIỂU)
// ============================================================

// --- CẤU HÌNH ---
const TEMPLATE_DOC_ID   = '1WT0GiQYKqAklLOcupeKpsgHOvzUYhcO89ckEsAIlYaI';
const ADMIN_EMAIL       = 'thanglongit@gmail.com';
const SHEET_NAME        = 'TamBao_Submissions';
const REPORT_FOLDER     = 'TamBao_Reports';

// ============================================================
// HÀM ÉP UỶ QUYỀN GHI DRIVE & GỬI EMAIL
// ============================================================
function forceAuthorizeDrive() {
  Logger.log('Đang kích hoạt quyền GHI trên Google Drive & EMAIL...');
  
  const file = DriveApp.getFileById(TEMPLATE_DOC_ID);
  Logger.log('1. Đọc File Template OK: ' + file.getName());
  
  const testFolder = DriveApp.createFolder('__TamBao_Test_Perm__');
  Logger.log('2. Tạo Folder OK: ' + testFolder.getName());
  
  const copyFile = file.makeCopy('__TamBao_Test_Copy__', testFolder);
  Logger.log('3. Copy File OK: ' + copyFile.getName());
  
  testFolder.setTrashed(true);
  Logger.log('4. Dọn dẹp folder rác OK!');

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: '[TamBao System Test] Kích hoạt quyền thành công ✅',
    htmlBody: '<h2 style="color:#c8a84b">Tất cả quyền đã kích hoạt thành công!</h2>',
    name: 'TamBao System 🌿'
  });
  Logger.log('5. Đã gửi email kích hoạt OK!');
  
  Logger.log('🎉 TẤT CẢ QUYỀN DRIVE VÀ EMAIL ĐÃ ĐƯỢC CẤP THÀNH CÔNG!');
}

// ============================================================
// HÀM CHẨN ĐOÁN
// ============================================================
function testDiagnostic() {
  Logger.log('=== BẮT ĐẦU KIỂM TRA CHẨN ĐOÁN ===');
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      Logger.log('❌ LỖI SPREADSHEET: Script chưa được gắn với Google Sheet!');
    } else {
      Logger.log('✅ SPREADSHEET OK: ' + ss.getName());
    }
  } catch (e) {
    Logger.log('❌ LỖI SPREADSHEET: ' + e.toString());
  }

  try {
    const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
    Logger.log('✅ TEMPLATE DOC OK: Tìm thấy file "' + templateFile.getName() + '"');
  } catch (e) {
    Logger.log('❌ LỖI TEMPLATE DOC: ' + e.toString());
  }

  try {
    const folders = DriveApp.getFoldersByName(REPORT_FOLDER);
    let folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(REPORT_FOLDER);
    Logger.log('✅ DRIVE FOLDER OK: Thư mục "' + folder.getName() + '" (ID: ' + folder.getId() + ')');
  } catch (e) {
    Logger.log('❌ LỖI DRIVE FOLDER: ' + e.toString());
  }

  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    Logger.log('✅ MAIL QUOTA OK: Còn ' + remainingQuota + ' email trong ngày');
  } catch (e) {
    Logger.log('❌ LỖI EMAIL: ' + e.toString());
  }

  Logger.log('=== KẾT THÚC KIỂM TRA ===');
}

// ============================================================
// HÀM TEST TRỰC TIẾP
// ============================================================
function testDoPost() {
  Logger.log('--- TEST DO POST ---');
  const fakeData = {
    timestamp : new Date().toLocaleString('vi-VN'),
    hs        : 'TB-8492',
    name      : 'Trần Thị Thu Thảo',
    year      : '1995',
    age       : '31',
    gender    : 'Nữ',
    occ       : 'Nhân viên Văn Phòng',
    phone     : '0912345678',
    tranid    : 'TAMBAO-8492',
    tinh_pct  : 42,
    khi_pct   : 58,
    than_pct  : 35,
    zone      : 'Tỳ Thận Hư Bạc',
    top5      : 'Đau lưng mỏi gối; Mất ngủ; Tiêu hóa kém; Hồi hộp; Tóc rụng'
  };

  const fakeEvent = {
    postData: {
      contents: JSON.stringify(fakeData)
    }
  };

  const res = doPost(fakeEvent);
  Logger.log('KẾT QUẢ doPost: ' + res.getContent());
}

// ============================================================
// doPost — NHẬN XỬ LÝ DỮ LIỆU TỪ WEB
// ============================================================
function doPost(e) {
  let errors = [];

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput('ERROR: No post data received').setMimeType(ContentService.MimeType.TEXT);
    }

    const data = JSON.parse(e.postData.contents);
    Logger.log('Dữ liệu nhận được: ' + JSON.stringify(data));

    // 1. Ghi Sheet
    let sheetUrl = '';
    try {
      sheetUrl = saveToSheet(data);
      Logger.log('✅ Đã ghi Sheet');
    } catch (errSheet) {
      Logger.log('❌ Lỗi ghi Sheet: ' + errSheet.toString());
      errors.push('SheetError: ' + errSheet.toString());
    }

    // 2. Tạo File Doc Báo Cáo
    let docUrl = '';
    try {
      docUrl = createReport(data);
      Logger.log('✅ Đã tạo Doc Báo Cáo: ' + docUrl);
    } catch (errDoc) {
      Logger.log('❌ Lỗi tạo Doc: ' + errDoc.toString());
      errors.push('DocError: ' + errDoc.toString());
    }

    // 3. Gửi Mail Thông Báo
    try {
      sendAdminEmail(data, docUrl);
      Logger.log('✅ Đã gửi Mail');
    } catch (errMail) {
      Logger.log('❌ Lỗi gửi Mail: ' + errMail.toString());
      errors.push('MailError: ' + errMail.toString());
    }

    if (errors.length > 0) {
      return ContentService.createTextOutput('WARNING_WITH_ERRORS:\n' + errors.join('\n')).setMimeType(ContentService.MimeType.TEXT);
    }

    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    Logger.log('❌ CRITICAL ERROR: ' + err.toString());
    return ContentService.createTextOutput('CRITICAL_ERROR: ' + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('TamBao Apps Script is LIVE ✅').setMimeType(ContentService.MimeType.TEXT);
}

// ============================================================
// saveToSheet — GHI DỮ LIỆU BẢNG TÍNH
// ============================================================
function saveToSheet(data) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Không tìm thấy Active Spreadsheet. Vui lòng mở Apps Script từ trong Google Sheet.");
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Mã HS', 'Họ Tên', 'Năm Sinh', 'Tuổi', 'Giới Tính',
      'Nghề Nghiệp', 'Điện Thoại / Zalo', 'Mã GD', 'Tinh (%)', 'Khí (%)', 'Thần (%)',
      'Vùng thể tạng', 'Top 5 triệu chứng', 'Link Báo Cáo'
    ]);
    sheet.getRange(1, 1, 1, 15).setBackground('#1a1a2e').setFontColor('#c8a84b').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    data.timestamp  || new Date().toLocaleString('vi-VN'),
    data.hs         || '',
    data.name       || '',
    data.year       || '',
    data.age        || '',
    data.gender     || '',
    data.occ        || '',
    data.phone      || '',
    data.tranid     || '',
    data.tinh_pct   || 0,
    data.khi_pct    || 0,
    data.than_pct   || 0,
    data.zone       || '',
    data.top5       || '',
    '⏳ Đang tạo...'
  ]);

  return ss.getUrl();
}

// ============================================================
// createReport — THAY THẾ BẢNG NGẮN GỌN & LÝ GIẢI DÂN DÃ PHÍA DƯỚI
// ============================================================
function createReport(data) {
  const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
  
  let folder;
  const folders = DriveApp.getFoldersByName(REPORT_FOLDER);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(REPORT_FOLDER);
  }

  const maHS = (data.hs || 'UNKNOWN').replace(/[^a-zA-Z0-9\-_]/g, '');
  const docName = 'BAOCAO_SUCKHOE_' + maHS + '_' + (data.name || 'KHACH_HANG');
  
  const docCopy = templateFile.makeCopy(docName, folder);
  const docId = docCopy.getId();
  const doc = DocumentApp.openById(docId);
  const body = doc.getBody();

  const tinhVal = parseInt(data.tinh_pct) || 0;
  const khiVal  = parseInt(data.khi_pct)  || 0;
  const thanVal = parseInt(data.than_pct) || 0;
  const ngayTao = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy');

  // Điểm thô sinh học (0-12) & Tổng điểm (0-36)
  const tinhRaw = Math.round(tinhVal / 100 * 12);
  const khiRaw  = Math.round(khiVal / 100 * 12);
  const thanRaw = Math.round(thanVal / 100 * 12);
  const tongDiem = tinhRaw + khiRaw + thanRaw;
  const pctTong  = Math.round((tinhVal + khiVal + thanVal) / 3);

  // Phân tầng nguy cơ
  let mucDo = 'VÀNG (Khí Trệ Tiềm Ẩn)';
  if (tongDiem >= 26 || pctTong < 30) {
    mucDo = 'ĐỎ (Báo Động Biến Cố)';
  } else if (tongDiem >= 17 || pctTong < 55) {
    mucDo = 'CAM (Tiến Triển Mạn Tính)';
  } else if (tongDiem >= 9) {
    mucDo = 'VÀNG (Khí Trệ Tiềm Ẩn)';
  } else {
    mucDo = 'XANH (Chính Khí Vững)';
  }

  let vungNguyCo = data.zone && data.zone.length > 3 ? data.zone : 'Vàng: Khí Trệ Tiềm Ẩn';
  if (tongDiem >= 26) vungNguyCo = 'Đỏ: Báo Động Biến Cố';
  else if (tongDiem >= 17) vungNguyCo = 'Cam: Tiến Triển Mạn Tính';
  else if (tongDiem < 9) vungNguyCo = 'Xanh: Chính Khí Vững';

  // TRẠNG THÁI TRONG BẢNG (NGẮN GỌN ĐỂ KHÔNG VỠ BẢNG)
  const tinhStatus = tinhVal < 45 ? 'Cảnh báo' : (tinhVal < 65 ? 'Chú ý' : 'Tốt');
  const khiStatus  = khiVal < 45 ? 'Cảnh báo' : (khiVal < 65 ? 'Chú ý' : 'Tốt');
  const thanStatus = thanVal < 45 ? 'Cảnh báo' : (thanVal < 65 ? 'Chú ý' : 'Tốt');

  // NỘI DUNG LÝ GIẢI DÂN DÃ DỄ HIỂU CHO KHÁCH HÀNG (PHÍA DƯỚI BẢNG)
  const lyGiaiTinh = `Giống như một ngôi nhà cần vật liệu xây dựng tốt, trục TINH là phần cơ bắp, xương khớp, mạch máu và chất dinh dưỡng trong cơ thể bạn. Điểm Tinh của bạn là ${tinhVal}%, cho thấy cơ thể đang tích tụ một lượng "rác chuyển hóa" (từ đồ ăn nhiều mỡ, đường hoặc thuốc tây), làm các dải cơ ở vùng cổ vai gáy và thắt lưng bị căng cứng, dễ mỏi mệt.`;

  const lyGiaiKhi = `Giống như dòng điện và nước chảy trong nhà, trục KHÍ là nguồn sinh lực, hơi thở và máu nuôi dưỡng toàn cơ thể. Điểm Khí của bạn là ${khiVal}%, cho thấy dòng chảy năng lượng đang bị thắt lại ở vùng cổ vai gáy, làm máu và oxy khó lưu thông lên não. Điều này khiến bạn hay bị uể oải chiều tối, thở nông hoặc mệt khi vận động.`;

  const lyGiaiThan = `Giống như bộ não điều hành trung tâm, trục THẦN đại diện cho tâm trí, tinh thần và giấc ngủ. Điểm Thần của bạn là ${thanVal}%, cho thấy đầu óc bạn đang làm việc quá tải, suy nghĩ chạy miên man cả ngày lẫn đêm khiến bộ não không được 'dọn rác' khi ngủ. Hậu quả là bạn khó vào giấc ngủ, ngủ không sâu hoặc dễ thức giấc lúc 1h-3h sáng.`;

  // BỘ THAY THẾ CHÍNH XÁC
  const exactReplacements = {
    // Trang 1
    'MA_HO_SO'          : data.hs || '',
    'MA_HS'             : data.hs || '',
    'NGAY_LAP_HO_SO'     : ngayTao,
    'NGAY_TAO'          : ngayTao,
    'TEN_BAC_SI'        : 'Trần Thăng Long',
    'BAC_SI'            : 'Trần Thăng Long',
    'HO_TEN_KH'         : data.name || '',
    'HO_TEN'            : data.name || '',
    'NAM_SINH'          : data.year || '',
    'TUOI'              : data.age ? (data.age + ' Tuổi') : '',
    'GIOI_TINH'         : data.gender || '',
    'NGHE_NGHIEP'       : data.occ || '',
    'SO_DIEN_THOAI'     : data.phone || '',
    'SDT_ZALO'          : data.phone || '',
    'SDT'               : data.phone || '',
    'MA_GIAO_DICH'      : data.tranid || '',
    'MA_GD'             : data.tranid || '',

    'TRIEU_CHUNG_CHINH' : data.top5 || 'Đau mỏi cổ vai gáy chẩm đầu, mất ngủ trằn trọc 1h-3h sáng, buồn ngủ gà gật sau ăn, mệt mỏi hụt hơi',
    'TIEN_SU'           : 'Chưa ghi nhận bệnh lý cấp tính nội khoa; Có hiện tượng uất trệ ma trận gian bào, căng co mạc cơ & Cortisol đêm tăng mạn tính',
    'MUC_TIEU_KH'       : 'Giải phóng co kẹp vi mạch cổ vai gáy V1-V4, thông chu trình Glymphatic thải độc xuất não, phục hồi giấc ngủ sâu trong 30 ngày',

    // Trang 2: Bảng chỉ số (chỉ hiện điểm & trạng thái ngắn)
    'TINH_RAW'          : tinhRaw,
    'TINH_PCT'          : tinhVal + '%',
    'TINH_STATUS'       : tinhStatus,
    'TINH_SCORE'        : tinhVal + '%',

    'KHI_RAW'           : khiRaw,
    'KHI_PCT'           : khiVal + '%',
    'KHI_STATUS'        : khiStatus,
    'KHI_SCORE'         : khiVal + '%',

    'THAN_RAW'          : thanRaw,
    'THAN_PCT'          : thanVal + '%',
    'THAN_STATUS'       : thanStatus,
    'THAN_SCORE'        : thanVal + '%',

    // Phần giải thích dân dã phía dưới bảng
    'LY_GIAI_TINH'      : lyGiaiTinh,
    'LY_GIAI_KHI'       : lyGiaiKhi,
    'LY_GIAI_THAN'      : lyGiaiThan,

    'TONG_DIEM'         : tongDiem,
    'PCT_TONG'          : pctTong,
    'VUNG_NGUY_CO'      : vungNguyCo,
    'MUC_DO'            : mucDo,

    // Trang 5: Risk Matrix
    'RISK_INSULIN'      : tinhVal < 50 ? 'Cam: Cảnh báo' : 'Vàng: Chú ý',
    'RISK_NAO'          : (khiVal < 50 || thanVal < 50) ? 'Cam: Cảnh báo' : 'Vàng: Chú ý',
    'RISK_COT_SONG'     : tinhVal < 60 ? 'Cam: Cảnh báo' : 'Vàng: Chú ý',
    'RISK_MIEN_DICH'    : thanVal < 45 ? 'Cam: Cảnh báo' : 'Vàng: Chú ý',

    // Trang 6: Top 5 ưu tiên
    'PRIORITY_1_TITLE'  : '🚩 Giải phóng co kẹp Động mạch đốt sống V1-V4 vùng Cổ Vai Gáy',
    'PRIORITY_2_TITLE'  : '🚩 Tái thông chu trình Glymphatic thải độc não ban đêm & Hạ nhiệt DMN',
    'PRIORITY_3_TITLE'  : 'Phục hồi độ nhạy Insulin & Ngăn ngừa vi viêm AGEs / oxLDL gian bào',
    'PRIORITY_4_TITLE'  : 'Tập thở sâu Đan Điền kích hoạt Thần kinh Phó giao cảm & Trương lực phế vị',
    'PRIORITY_5_TITLE'  : 'Cứu ấm thắt lưng L2-L3 Mệnh Môn & Bổ sung Nước tế bào kiềm hóa',
  };

  // Thay thế tất cả exact keys + xóa văn bản ví dụ "(Ví dụ: ...)"
  for (const [key, val] of Object.entries(exactReplacements)) {
    const patternWithEx = '\\{\\{' + key + '\\}\\}\\s*\\([^)]*\\)';
    const patternPlain  = '\\{\\{' + key + '\\}\\}';
    body.replaceText(patternWithEx, String(val));
    body.replaceText(patternPlain, String(val));
  }

  // Quét bất kỳ thẻ {{...}} nào còn sót lại trong doc để thay bằng chuỗi sạch
  let found = body.findText('\\{\\{[^\\}]+\\}\\}\\s*(\\([^)]*\\))?');
  let loopSafety = 0;

  while (found && loopSafety < 100) {
    loopSafety++;
    const element = found.getElement().asText();
    const fullMatchedText = element.getText().substring(found.getStartOffset(), found.getEndOffsetInclusive() + 1);
    
    const tagMatch = fullMatchedText.match(/\{\{([^}]+)\}\}/);
    if (tagMatch) {
      const rawTag = tagMatch[0];
      const tagName = tagMatch[1].trim();
      const cleanVal = getCleanFallbackValue(tagName, data, tinhVal, khiVal, thanVal, mucDo);
      
      const escapedRaw = rawTag.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
      body.replaceText(escapedRaw + '\\s*\\([^)]*\\)', cleanVal);
      body.replaceText(escapedRaw, cleanVal);
    }
    
    found = body.findText('\\{\\{[^\\}]+\\}\\}\\s*(\\([^)]*\\))?');
  }

  doc.saveAndClose();

  const docUrl = 'https://docs.google.com/document/d/' + docId + '/edit';
  updateSheetDocLink(data.hs, docUrl);

  return docUrl;
}

function getCleanFallbackValue(tagName, data, tinh, khi, than, mucDo) {
  const upper = tagName.toUpperCase();
  if (upper.includes('TINH')) return tinh + '%';
  if (upper.includes('KHI')) return khi + '%';
  if (upper.includes('THAN')) return than + '%';
  if (upper.includes('MUC_DO') || upper.includes('DANH_GIA')) return mucDo;
  return 'Cần theo dõi thêm';
}

function updateSheetDocLink(maHS, docUrl) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    for (let i = lastRow; i >= 2; i--) {
      const cellHS = sheet.getRange(i, 2).getValue();
      if (cellHS === maHS) {
        sheet.getRange(i, 15).setValue(docUrl);
        break;
      }
    }
  } catch (err) {
    Logger.log('Lỗi cập nhật link vào sheet: ' + err.toString());
  }
}

// ============================================================
// sendAdminEmail — GỬI EMAIL THÔNG BÁO CHUYÊN NHIỆP
// ============================================================
function sendAdminEmail(data, docUrl) {
  const subject = '[TamBao System] Báo cáo y tế mới: ' + (data.name || 'Không tên') + ' — ' + (data.hs || '');

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0f0f23;color:#e0e0e0;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#c8a84b,#f5d77a);padding:24px;text-align:center">
        <h1 style="margin:0;color:#1a1a2e;font-size:1.5rem">🌿 TAMBAO - BÁO CÁO CÁ NHÂN HÓA</h1>
        <p style="margin:4px 0 0;color:#1a1a2e;font-size:0.9rem">Hệ thống Đánh Giá & Phác Đồ Phục Hồi Y Học Tích Hợp (Đông - Tây Y)</p>
      </div>

      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#a0a0b0;width:40%">📋 Mã hồ sơ</td>
              <td style="padding:8px;color:#f5d77a;font-weight:bold">${data.hs || ''}</td></tr>
          <tr style="background:#1a1a3e"><td style="padding:8px;color:#a0a0b0">👤 Họ tên</td>
              <td style="padding:8px;color:#e0e0e0">${data.name || ''}</td></tr>
          <tr><td style="padding:8px;color:#a0a0b0">📅 Năm sinh</td>
              <td style="padding:8px;color:#e0e0e0">${data.year || ''} (${data.age || '?'} tuổi)</td></tr>
          <tr style="background:#1a1a3e"><td style="padding:8px;color:#a0a0b0">⚧ Giới tính</td>
              <td style="padding:8px;color:#e0e0e0">${data.gender || ''}</td></tr>
          <tr><td style="padding:8px;color:#a0a0b0">💼 Nghề nghiệp</td>
              <td style="padding:8px;color:#e0e0e0">${data.occ || ''}</td></tr>
          <tr style="background:#1a1a3e"><td style="padding:8px;color:#a0a0b0">📱 SĐT Zalo</td>
              <td style="padding:8px;color:#e0e0e0">${data.phone || ''}</td></tr>
          <tr><td style="padding:8px;color:#a0a0b0">💰 Mã GD</td>
              <td style="padding:8px;color:#c8a84b;font-weight:bold">${data.tranid || ''}</td></tr>
        </table>

        <div style="margin:20px 0;padding:16px;background:#1a1a3e;border-radius:8px;border-left:4px solid #c8a84b">
          <p style="margin:0 0 8px;color:#a0a0b0;font-size:0.85rem">MA TRẬN CHỈ SỐ SINH HỌC TAM BẢO</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <span style="color:#e0e0e0">🔥 Tinh: <b style="color:#f5d77a">${data.tinh_pct || 0}%</b></span>
            <span style="color:#e0e0e0">💨 Khí: <b style="color:#f5d77a">${data.khi_pct || 0}%</b></span>
            <span style="color:#e0e0e0">🌊 Thần: <b style="color:#f5d77a">${data.than_pct || 0}%</b></span>
          </div>
          <p style="margin:8px 0 0;color:#e0e0e0">🗺️ Vùng thể tạng: <b>${data.zone || ''}</b></p>
          <p style="margin:4px 0 0;color:#e0e0e0">📌 Triệu chứng: ${data.top5 || ''}</p>
        </div>

        ${docUrl ? `
        <div style="text-align:center;margin:20px 0">
          <a href="${docUrl}" style="display:inline-block;background:linear-gradient(135deg,#c8a84b,#f5d77a);color:#1a1a2e;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:1rem">
            📄 Xem Báo Cáo Sức Khỏe 10 Trang
          </a>
        </div>` : '<p style="color:#ff6b6b;text-align:center">⚠️ Lỗi tạo báo cáo, cần kiểm tra lại</p>'}

        <p style="color:#606080;font-size:0.8rem;text-align:center;margin-top:16px">
          Tự động sinh bởi TamBao System | BS. Trần Thăng Long kiểm duyệt
        </p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: 'TamBao System 🌿'
  });
}

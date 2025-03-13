import { NextResponse } from "next/server"
import crypto from "crypto"

// Thông tin xác thực MoMo
const MOMO_PARTNER_CODE = process.env.MOMO_PARTNER_CODE || ""
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY || ""
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY || ""
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Xác thực chữ ký từ MoMo
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = body
    // Tạo chuỗi để kiểm tra chữ ký
    const rawSignature =
    `accessKey=${MOMO_ACCESS_KEY}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&message=${message}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&orderType=${orderType}` +
    `&partnerCode=${partnerCode}` +
    `&payType=${payType}` +
    `&requestId=${requestId}` +
    `&responseTime=${responseTime}` +
    `&resultCode=${resultCode}` +
    `&transId=${transId}`
    // Tạo chữ ký để kiểm tra
    const checkSignature = crypto.createHmac("sha256", MOMO_SECRET_KEY).update(rawSignature).digest("hex")
    console.log("IPN signature check:", {
      receivedSignature: signature,
      calculatedSignature: checkSignature,
      isValid: checkSignature === signature,
    })
    // Kiểm tra chữ ký
    if (checkSignature !== signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
    }

    // Kiểm tra kết quả thanh toán
    if (resultCode === 0) {
      // Thanh toán thành công
      // Cập nhật trạng thái đơn hàng trong database
      // ...

      // Ví dụ: Cập nhật trạng thái khóa học đã thanh toán
      // await db.course.update({
      //   where: { id: extractCourseIdFromOrderId(orderId) },
      //   data: { isPaid: true }
      // });

      return NextResponse.json({ message: "Payment successful" })
    } else {
      // Thanh toán thất bại
      // Cập nhật trạng thái đơn hàng trong database
      // ...

      return NextResponse.json({ message: "Payment failed" })
    }
  } catch (error) {
    console.error("Error processing MoMo IPN:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
// Hàm trích xuất courseId từ orderId
function extractCourseIdFromOrderId(orderId: string): string {
  // Giả sử orderId có dạng: ORDER_timestamp_courseId
  const parts = orderId.split("_")
  return parts[parts.length - 1]
}


import { NextResponse } from "next/server"
import crypto from "crypto"
const MOMO_PARTNER_CODE = process.env.MOMO_PARTNER_CODE || ""
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY || ""
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY || ""
const MOMO_ENDPOINT = process.env.MOMO_ENDPOINT || "https://test-payment.momo.vn/v2/gateway/api/create"
const REDIRECT_URL = process.env.NEXT_PUBLIC_APP_URL + "/payment/callback"
const IPN_URL = process.env.NEXT_PUBLIC_APP_URL + "/api/payment/momo/ipn"

export async function POST(request: Request) {
  try {
    console.log("MoMo payment request received")
    const body = await request.json()
    console.log("Request body:", body)
    const { courseId, courseName, amount, paymentMethod = "momo" } = body
    if (!courseId || !courseName || amount === undefined) {
      console.log("Missing required fields:", { courseId, courseName, amount })
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }
    //Chuyển đổi số tiền thành số nguyên
    let amountNumber: number
    if (typeof amount === "string") {
      //Nếu là chuỗi, loại bỏ tất cả các ký tự không phải số
      amountNumber = Number.parseInt(amount.replace(/[^\d]/g, ""), 10)
    } else {
      // Nếu là số, chuyển đổi thành số nguyên
      amountNumber = Math.round(Number(amount))
    }
    console.log("Parsed amount:", amountNumber)
    // Kiểm tra số tiền
    if (isNaN(amountNumber) || amountNumber < 1000 || amountNumber > 50000000) {
      console.log("Invalid amount after parsing:", amountNumber)
      return NextResponse.json(
        {
          success: false,
          message: `Số tiền không hợp lệ. Số tiền phải từ 1,000 VND đến 50,000,000 VND. Số tiền hiện tại: ${isNaN(amountNumber) ? "Không hợp lệ" : amountNumber.toLocaleString("vi-VN")} VND`,
        },
        { status: 400 },
      )
    }

    // Kiểm tra biến môi trường
    if (!MOMO_PARTNER_CODE || !MOMO_ACCESS_KEY || !MOMO_SECRET_KEY) {
      console.error("Missing MoMo credentials in environment variables")
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin xác thực MoMo trong biến môi trường" },
        { status: 500 },
      )
    }

    // Kiểm tra URL
    if (!REDIRECT_URL.startsWith("http") || !IPN_URL.startsWith("http")) {
      console.error("Invalid redirect or IPN URL:", { REDIRECT_URL, IPN_URL })
      return NextResponse.json({ success: false, message: "URL chuyển hướng hoặc IPN không hợp lệ" }, { status: 500 })
    }

    // Tạo requestId và orderId duy nhất
    const requestId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const orderId = `ORDER_${Date.now()}_${courseId}`
    console.log("Using MoMo endpoint:", MOMO_ENDPOINT)
    console.log("Using redirect URL:", REDIRECT_URL)
    console.log("Using IPN URL:", IPN_URL)
    console.log("Final amount to be sent to MoMo:", amountNumber)

    // Xác định loại yêu cầu dựa trên phương thức thanh toán
    let requestType = "captureWallet" // Mặc định cho ví MoMo
    if (paymentMethod === "atm") {
      requestType = "payWithATM"
    } else if (paymentMethod === "credit") {
      requestType = "payWithCC"
    }
    console.log("Request type:", requestType)

    // Chuẩn bị dữ liệu cho yêu cầu thanh toán MoMo
    const orderInfo = `Thanh toan khoa hoc: ${courseName}`

    // Tạo chuỗi rawSignature theo đúng định dạng MoMo yêu cầu
    // Lưu ý: Thứ tự tham số phải chính xác như MoMo mong đợi
    const rawSignature =
      `accessKey=${MOMO_ACCESS_KEY}` +
      `&amount=${amountNumber}` +
      `&extraData=` +
      `&ipnUrl=${IPN_URL}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${MOMO_PARTNER_CODE}` +
      `&redirectUrl=${REDIRECT_URL}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`

    console.log("Raw signature string:", rawSignature)

    // Tạo chữ ký
    const signature = crypto.createHmac("sha256", MOMO_SECRET_KEY).update(rawSignature).digest("hex")

    console.log("Generated signature:", signature)

    // Tạo payload cho yêu cầu thanh toán
    const payload = {
      partnerCode: MOMO_PARTNER_CODE,
      accessKey: MOMO_ACCESS_KEY,
      requestId: requestId,
      amount: amountNumber,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: REDIRECT_URL,
      ipnUrl: IPN_URL,
      extraData: "",
      requestType: requestType,
      signature: signature,
      lang: "vi",
    }

    console.log("MoMo payload:", JSON.stringify(payload))

    // Gửi yêu cầu đến MoMo API
    console.log("Sending request to MoMo API:", MOMO_ENDPOINT)
    const response = await fetch(MOMO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("MoMo API response status:", response.status)
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.error("MoMo API returned non-JSON response:", responseText)
      return NextResponse.json(
        { success: false, message: "MoMo API returned non-JSON response: " + responseText },
        { status: 500 },
      )
    }

    const data = await response.json()
    console.log("MoMo API response data:", JSON.stringify(data))

    if (data.resultCode === 0) {
      return NextResponse.json({
        success: true,
        paymentUrl: data.payUrl,
        orderId: orderId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Lỗi từ MoMo: ${data.message || "Không thể tạo yêu cầu thanh toán"} (Mã lỗi: ${data.resultCode})`,
          errorCode: data.resultCode,
          errorDetail: data,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error creating MoMo payment:", error)
    return NextResponse.json(
      { success: false, message: "Lỗi server: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}


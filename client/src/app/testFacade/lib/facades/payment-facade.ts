// Improved Facade Pattern Implementation
import type { ITransaction } from "@/types/ITransaction "
import type { Course } from "@/types/Courses"
import type { UserType } from "@/types/UserType"
import { mockCourse, mockUser } from "../mock-data"

// ===== SUBSYSTEM INTERFACES =====
// These represent the complex subsystems that the Facade will simplify
//Dinh nghia cac Interface cho cac dich vu con
interface UserService {
  getUser(userId: string): Promise<UserType>
  validateUser(userId: string): Promise<boolean>
  updateUserPurchaseHistory(userId: string, courseId: string): Promise<boolean>
}

interface CourseService {
  getCourse(courseId: string): Promise<Course>
  validateCourse(courseId: string): Promise<boolean>
  checkCourseAvailability(courseId: string): Promise<boolean>
  grantCourseAccess(userId: string, courseId: string): Promise<boolean>
}

interface PaymentService {
  validatePaymentMethod(method: string): Promise<boolean>
  processPayment(
    amount: number,
    method: string,
  ): Promise<{
    success: boolean
    transactionRef: string
  }>
  refundPayment(transactionRef: string): Promise<boolean>
}

interface TransactionService {
  createTransaction(transaction: Partial<ITransaction>): Promise<ITransaction>
  updateTransaction(transactionId: string, updates: Partial<ITransaction>): Promise<ITransaction>
  getTransactionHistory(userId: string): Promise<ITransaction[]>
}

interface NotificationService {
  sendPaymentConfirmation(email: string, transaction: ITransaction): Promise<boolean>
  sendPaymentFailure(email: string, transaction: ITransaction): Promise<boolean>
}

// ===== SUBSYSTEM IMPLEMENTATIONS =====
// Complex implementations of each service

class MockUserService implements UserService {
  async getUser(userId: string): Promise<UserType> {
    console.log(`[UserService] Getting user with ID: ${userId}`)
    return mockUser
  }

  async validateUser(userId: string): Promise<boolean> {
    console.log(`[UserService] Validating user with ID: ${userId}`)
    return true
  }

  async updateUserPurchaseHistory(userId: string, courseId: string): Promise<boolean> {
    console.log(`[UserService] Updating purchase history for user ${userId} with course ${courseId}`)
    return true
  }
}

class MockCourseService implements CourseService {
  async getCourse(courseId: string): Promise<Course> {
    console.log(`[CourseService] Getting course with ID: ${courseId}`)
    return mockCourse
  }

  async validateCourse(courseId: string): Promise<boolean> {
    console.log(`[CourseService] Validating course with ID: ${courseId}`)
    return true
  }

  async checkCourseAvailability(courseId: string): Promise<boolean> {
    console.log(`[CourseService] Checking availability of course with ID: ${courseId}`)
    return true
  }

  async grantCourseAccess(userId: string, courseId: string): Promise<boolean> {
    console.log(`[CourseService] Granting access to course ${courseId} for user ${userId}`)
    return true
  }
}

class MockPaymentService implements PaymentService {
  async validatePaymentMethod(method: string): Promise<boolean> {
    console.log(`[PaymentService] Validating payment method: ${method}`)
    return ["credit-card", "e-wallet", "bank-transfer"].includes(method)
  }

  async processPayment(amount: number, method: string): Promise<{ success: boolean; transactionRef: string }> {
    console.log(`[PaymentService] Processing payment of $${amount} using ${method}`)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success with 80% probability
    const success = Math.random() < 0.8
    const transactionRef = `TR-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    console.log(`[PaymentService] Payment ${success ? "succeeded" : "failed"} with reference: ${transactionRef}`)

    return { success, transactionRef }
  }

  async refundPayment(transactionRef: string): Promise<boolean> {
    console.log(`[PaymentService] Refunding payment with reference: ${transactionRef}`)
    return true
  }
}

class MockTransactionService implements TransactionService {
  async createTransaction(transaction: Partial<ITransaction>): Promise<ITransaction> {
    console.log(`[TransactionService] Creating new transaction for course ${transaction.courseId}`)

    return {
      _id: `tr-${Date.now()}`,
      userId: transaction.userId || "",
      courseId: transaction.courseId || "",
      amount: transaction.amount || 0,
      status: "Pending",
      paymentMethod: transaction.paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async updateTransaction(transactionId: string, updates: Partial<ITransaction>): Promise<ITransaction> {
    console.log(`[TransactionService] Updating transaction ${transactionId} with status: ${updates.status}`)

    return {
      _id: transactionId,
      userId: updates.userId || "",
      courseId: updates.courseId || "",
      amount: updates.amount || 0,
      status: updates.status || "Pending",
      paymentMethod: updates.paymentMethod,
      transactionRef: updates.transactionRef,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async getTransactionHistory(userId: string): Promise<ITransaction[]> {
    console.log(`[TransactionService] Getting transaction history for user ${userId}`)
    return []
  }
}

class MockNotificationService implements NotificationService {
  async sendPaymentConfirmation(email: string, transaction: ITransaction): Promise<boolean> {
    console.log(`[NotificationService] Sending payment confirmation to ${email} for transaction ${transaction._id}`)
    return true
  }

  async sendPaymentFailure(email: string, transaction: ITransaction): Promise<boolean> {
    console.log(
      `[NotificationService] Sending payment failure notification to ${email} for transaction ${transaction._id}`,
    )
    return true
  }
}

// ===== FACADE =====
// Facade cung cấp một giao diện đơn giản cho các hệ thống con phức tạp
export class PaymentFacade {
  private userService: UserService
  private courseService: CourseService
  private paymentService: PaymentService
  private transactionService: TransactionService
  private notificationService: NotificationService

  constructor() {
    // Initialize all the complex subsystems
    this.userService = new MockUserService()
    this.courseService = new MockCourseService()
    this.paymentService = new MockPaymentService()
    this.transactionService = new MockTransactionService()
    this.notificationService = new MockNotificationService()
  }

  /**
   * The main facade method that simplifies the complex payment process
   * This hides all the complexity of coordinating multiple services
   */
  async processPayment(paymentDetails: {
    userId: string
    courseId: string
    amount: number
    paymentMethod: string
  }): Promise<ITransaction> {
    console.log("=== PAYMENT FACADE: Starting payment process ===")

    try {
      // Step 1: Get user and course information
      const [user, course] = await Promise.all([
        this.userService.getUser(paymentDetails.userId),
        this.courseService.getCourse(paymentDetails.courseId),
      ])

      // Step 2: Validate all required entities
      const [isUserValid, isCourseValid, isCourseAvailable, isPaymentMethodValid] = await Promise.all([
        this.userService.validateUser(paymentDetails.userId),
        this.courseService.validateCourse(paymentDetails.courseId),
        this.courseService.checkCourseAvailability(paymentDetails.courseId),
        this.paymentService.validatePaymentMethod(paymentDetails.paymentMethod),
      ])

      if (!isUserValid || !isCourseValid || !isCourseAvailable || !isPaymentMethodValid) {
        throw new Error("Validation failed: Invalid user, course, or payment method")
      }

      // Step 3: Create initial transaction record
      const transaction = await this.transactionService.createTransaction({
        userId: paymentDetails.userId,
        courseId: paymentDetails.courseId,
        amount: paymentDetails.amount,
        status: "Pending",
        paymentMethod: paymentDetails.paymentMethod,
      })

      // Step 4: Process payment
      const paymentResult = await this.paymentService.processPayment(
        paymentDetails.amount,
        paymentDetails.paymentMethod,
      )

      // Step 5: Update transaction with result
      const status = paymentResult.success ? "Success" : "Failed"
      const updatedTransaction = await this.transactionService.updateTransaction(transaction._id, {
        status,
        transactionRef: paymentResult.transactionRef,
      })

      // Step 6: Post-payment actions
      if (paymentResult.success) {
        // If payment successful, grant access and update user history
        await Promise.all([
          this.courseService.grantCourseAccess(paymentDetails.userId, paymentDetails.courseId),
          this.userService.updateUserPurchaseHistory(paymentDetails.userId, paymentDetails.courseId),
          this.notificationService.sendPaymentConfirmation(user.email, updatedTransaction),
        ])
      } else {
        // If payment failed, send failure notification
        await this.notificationService.sendPaymentFailure(user.email, updatedTransaction)
      }

      console.log(`=== PAYMENT FACADE: Payment process completed with status: ${status} ===`)
      return updatedTransaction
    } catch (error) {
      console.error("=== PAYMENT FACADE: Error in payment process ===", error)

      // Create a failed transaction record
      const failedTransaction = await this.transactionService.createTransaction({
        userId: paymentDetails.userId,
        courseId: paymentDetails.courseId,
        amount: paymentDetails.amount,
        status: "Failed",
        paymentMethod: paymentDetails.paymentMethod,
      })

      // Try to notify the user
      try {
        const user = await this.userService.getUser(paymentDetails.userId)
        await this.notificationService.sendPaymentFailure(user.email, failedTransaction)
      } catch (notificationError) {
        console.error("Failed to send notification", notificationError)
      }

      return failedTransaction
    }
  }

  /**
   * Another facade method that simplifies the refund process
   */
  async processRefund(transactionId: string): Promise<boolean> {
    console.log("=== PAYMENT FACADE: Starting refund process ===")
    
    try {
      // Get the transaction
      const transaction = await this.transactionService.updateTransaction(transactionId, {
        status: "Pending",
      })

      // Process the refund
      const refundResult = await this.paymentService.refundPayment(transaction.transactionRef || "")

      // Update the transaction
      await this.transactionService.updateTransaction(transactionId, {
        status: refundResult ? "Cancel" : "Failed",
      })

      // Revoke access if refund successful
      if (refundResult) {
        // Additional logic would go here
      }

      console.log(`=== PAYMENT FACADE: Refund process completed with success: ${refundResult} ===`)
      return refundResult
    } catch (error) {
      console.error("=== PAYMENT FACADE: Error in refund process ===", error)
      return false
    }
  }
}


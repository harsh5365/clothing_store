-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paymentStatus` VARCHAR(32) NULL,
    ADD COLUMN `razorpayOrderId` VARCHAR(64) NULL,
    ADD COLUMN `razorpayPaymentId` VARCHAR(64) NULL,
    ADD COLUMN `razorpaySignature` VARCHAR(256) NULL;

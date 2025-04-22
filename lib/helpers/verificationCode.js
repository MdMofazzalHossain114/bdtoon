import { VerificationCodeModel } from "@/models/verification";

const generateCodeAndExpiry = async () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  return { code, expiryDate };
};

const deleteAllExpiredVerificationCodes = async () => {
  await VerificationCodeModel.deleteMany({
    expires: { $lt: new Date() },
  });
};

export { deleteAllExpiredVerificationCodes, generateCodeAndExpiry };
